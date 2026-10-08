#!/usr/bin/env python3
"""Compose an original, instrumental 45-second bed without external samples."""
from pathlib import Path
import math
import subprocess
import wave

import numpy as np


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "remotion" / "public" / "media"
SR = 44100
DURATION = 45.0
N = int(SR * DURATION)
mix = np.zeros((2, N), dtype=np.float32)


def hz(midi):
    return 440.0 * (2.0 ** ((midi - 69) / 12.0))


def add_note(start, length, midi, amp, pan=0.0, kind="pluck"):
    i0 = max(0, int(start * SR))
    i1 = min(N, int((start + length) * SR))
    if i1 <= i0:
        return
    t = np.arange(i1 - i0, dtype=np.float32) / SR
    f = hz(midi)
    if kind == "pad":
        attack = np.clip(t / 1.65, 0, 1)
        release = np.clip((length - t) / 2.4, 0, 1)
        env = attack * release
        vib = 1 + 0.0022 * np.sin(2 * math.pi * 0.24 * t)
        phase = 2 * math.pi * f * np.cumsum(vib) / SR
        wave = np.sin(phase) + 0.26 * np.sin(2 * phase + 0.1) + 0.08 * np.sin(3 * phase + 0.35)
    elif kind == "bell":
        env = np.exp(-t * 2.8) * np.clip(t / 0.018, 0, 1)
        wave = np.sin(2 * math.pi * f * t) + 0.21 * np.sin(2 * math.pi * f * 2.01 * t)
    else:
        env = (1 - np.exp(-t / 0.008)) * np.exp(-t * 3.0)
        wave = np.sin(2 * math.pi * f * t) + 0.19 * np.sin(2 * math.pi * f * 2.0 * t)
    signal = (amp * env * wave).astype(np.float32)
    left = math.sqrt((1 - pan) / 2)
    right = math.sqrt((1 + pan) / 2)
    mix[0, i0:i1] += signal * left
    mix[1, i0:i1] += signal * right


def add_soft_tap(start, amp=0.028):
    length = 0.15
    i0 = int(start * SR)
    i1 = min(N, int((start + length) * SR))
    if i1 <= i0:
        return
    t = np.arange(i1 - i0, dtype=np.float32) / SR
    noise = np.random.default_rng(int(start * 1000) + 17).normal(0, 1, len(t)).astype(np.float32)
    noise = np.convolve(noise, np.ones(8, dtype=np.float32) / 8, mode="same")
    env = np.exp(-t * 30)
    mix[0, i0:i1] += (noise * env * amp * 0.66)
    mix[1, i0:i1] += (noise * env * amp * 0.58)


# Long, overlapping chords: Dadd9 → Gmaj7 → Bm7 → Gmaj7 → Aadd9 → Dadd9.
chords = [
    (0, 7.8, [50, 57, 62, 64, 69]),
    (6.3, 8.5, [43, 50, 55, 59, 66]),
    (13.2, 9.2, [47, 54, 57, 62, 66]),
    (21.2, 9.3, [43, 50, 55, 59, 66]),
    (29.0, 9.0, [45, 52, 57, 59, 64]),
    (36.5, 8.5, [38, 45, 50, 54, 57, 64, 69]),
]
for chord_index, (start, length, notes) in enumerate(chords):
    for note_index, note in enumerate(notes):
        amp = 0.043 if note < 60 else 0.032
        add_note(start, length, note, amp, pan=((note_index % 3) - 1) * 0.16, kind="pad")

# A sparse, warm plucked motif opens after the first quiet passage.
motif = [62, 66, 69, 76, 69, 66, 64, 69, 74, 69, 66, 62, 64, 69, 73, 76, 73, 69, 66, 69, 74, 78]
for idx, note in enumerate(motif):
    start = 11.5 + idx * 0.92
    add_note(start, 0.76, note, 0.035 if start < 22 else 0.043, pan=(-0.38 if idx % 2 == 0 else 0.38), kind="pluck")

# Gentle hand-percussion pulse only during the festival section.
for idx in range(22):
    start = 22.25 + idx * 0.69
    if start < 37:
        if idx % 2 == 0:
            add_soft_tap(start, 0.022 if idx % 4 else 0.030)
        if idx % 4 == 2:
            add_note(start, 0.28, 43, 0.018, pan=0.0, kind="pluck")

# Small high notes answer the narration and lift the closing title.
for idx, (start, note) in enumerate([(2.8, 81), (9.8, 78), (15.1, 76), (19.0, 81), (23.4, 78), (27.1, 83), (32.0, 81), (35.1, 85), (38.0, 86), (40.1, 81)]):
    add_note(start, 1.25, note, 0.018, pan=(-0.3 if idx % 2 == 0 else 0.3), kind="bell")

# Soft stereo room tail and gentle start/end fades.
dry = mix.copy()
for delay, gain in [(0.13, 0.16), (0.27, 0.10), (0.43, 0.065)]:
    n = int(delay * SR)
    mix[0, n:] += dry[1, :-n] * gain
    mix[1, n:] += dry[0, :-n] * gain
fade_in = np.clip(np.arange(N, dtype=np.float32) / (SR * 1.4), 0, 1)
fade_out = np.clip((DURATION - np.arange(N, dtype=np.float32) / SR) / 2.8, 0, 1)
mix *= np.minimum(fade_in, fade_out)[None, :]
mix = np.tanh(mix * 1.6)
peak = float(np.max(np.abs(mix)))
if peak:
    mix *= 0.74 / peak

OUT.mkdir(parents=True, exist_ok=True)
pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
wav_path = OUT / "music-original.wav"
with wave.open(str(wav_path), "wb") as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes(pcm.tobytes())

mp3_path = OUT / "music-original.mp3"
subprocess.run([
    "ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(wav_path),
    "-codec:a", "libmp3lame", "-b:a", "192k", str(mp3_path),
], check=True)
print(f"Wrote original score: {wav_path.name} ({DURATION:.0f}s) and {mp3_path.name}")
