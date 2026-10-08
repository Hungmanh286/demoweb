#!/usr/bin/env python3
"""Assemble the separate voice and Veo ambience deliverables."""

from pathlib import Path
import shutil
import subprocess


PROJECT = Path(__file__).resolve().parents[2]
MEDIA = PROJECT / "video-production/remotion/public/media"
OUTPUT = PROJECT / "assets/video"
FPS = 30
TOTAL_SECONDS = 45


def run_ffmpeg(args: list[str]) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def build_voiceover() -> None:
    starts_ms = [0, 6_000, 14_000, 22_000, 31_000, 37_600]
    inputs = [MEDIA / "voice" / f"scene-{index:02d}.mp3" for index in range(1, 7)]
    graph = []
    labels = []
    for index, start_ms in enumerate(starts_ms):
        label = f"voice{index}"
        delay = f"{start_ms}|{start_ms}"
        graph.append(
            f"[{index}:a]aresample=48000,"
            "aformat=sample_fmts=fltp:channel_layouts=stereo,"
            f"adelay={delay}[{label}]"
        )
        labels.append(f"[{label}]")
    graph.append(
        f"{''.join(labels)}amix=inputs=6:duration=longest:normalize=0:dropout_transition=0,"
        f"apad=pad_dur={TOTAL_SECONDS},atrim=duration={TOTAL_SECONDS}[out]"
    )
    command = []
    for path in inputs:
        command.extend(["-i", str(path)])
    command.extend(
        [
            "-filter_complex", ";".join(graph), "-map", "[out]",
            "-codec:a", "libmp3lame", "-b:a", "192k", "-ar", "48000",
            str(OUTPUT / "voiceover.mp3"),
        ]
    )
    run_ffmpeg(command)


def build_ambience() -> None:
    starts_ms = [0, 6_000, 14_000, 22_000, 31_000, 37_000]
    source_seconds = [6, 8, 8, 8, 6, 8]
    timeline_seconds = [6, 8, 8, 9, 6, 8]
    inputs = [MEDIA / f"scene-{index:02d}.mp4" for index in range(1, 7)]
    graph = []
    labels = []
    for index, (start_ms, source_duration, timeline_duration) in enumerate(
        zip(starts_ms, source_seconds, timeline_seconds)
    ):
        label = f"ambience{index}"
        fade_out_start = max(0, source_duration - 0.4)
        pad_seconds = timeline_duration - source_duration
        filters = [
            "aresample=48000",
            "aformat=sample_fmts=fltp:channel_layouts=stereo",
            f"atrim=duration={source_duration}",
            "afade=t=in:st=0:d=0.2",
            f"afade=t=out:st={fade_out_start}:d=0.4",
            "volume=0.45",
        ]
        if pad_seconds > 0:
            filters.append(f"apad=pad_dur={pad_seconds}")
        delay = f"{start_ms}|{start_ms}"
        graph.append(f"[{index}:a]{','.join(filters)},adelay={delay}[{label}]")
        labels.append(f"[{label}]")
    graph.append(
        f"{''.join(labels)}amix=inputs=6:duration=longest:normalize=0:dropout_transition=0,"
        f"apad=pad_dur={TOTAL_SECONDS},atrim=duration={TOTAL_SECONDS}[out]"
    )
    command = []
    for path in inputs:
        command.extend(["-i", str(path)])
    command.extend(
        [
            "-filter_complex", ";".join(graph), "-map", "[out]",
            "-codec:a", "libmp3lame", "-b:a", "192k", "-ar", "48000",
            str(OUTPUT / "sound-effects.mp3"),
        ]
    )
    run_ffmpeg(command)
    shutil.copy2(OUTPUT / "sound-effects.mp3", MEDIA / "ambience-generated.mp3")


def copy_original_music() -> None:
    shutil.copy2(MEDIA / "music-original.mp3", OUTPUT / "music-original.mp3")


def package_story_assets() -> None:
    reference_dir = OUTPUT / "references"
    keyframe_dir = reference_dir / "keyframes"
    keyframe_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(PROJECT / "video-production/storyboard-ai.json", OUTPUT / "storyboard-ai.json")
    shutil.copy2(PROJECT / "video-production/voiceover.txt", OUTPUT / "transcript.vi.txt")
    shutil.copy2(MEDIA / "character-reference.png", reference_dir / "character-reference.png")
    for index in range(1, 7):
        shutil.copy2(
            MEDIA / f"scene-{index:02d}-keyframe.png",
            keyframe_dir / f"scene-{index:02d}.png",
        )

    cues = [
        ("00:00:00,000", "00:00:02,800", "Một trái ngọt bắt đầu từ đâu?"),
        ("00:00:06,000", "00:00:11,300", "Từ đất, từ nắng, từ bàn tay chăm chút qua từng mùa."),
        ("00:00:14,000", "00:00:20,500", "Mỗi hương vị mang một vùng đất. Mỗi mùa quả lưu một câu chuyện."),
        ("00:00:22,000", "00:00:27,450", "Hãy đến để nếm, để hiểu, và gặp những người làm nên trái ngọt."),
        ("00:00:31,000", "00:00:37,550", "Để mỗi cuộc gặp mở thêm cơ hội, mỗi sản phẩm tìm thấy kết nối mới."),
        ("00:00:37,600", "00:00:39,650", "Festival Trái Cây Việt Nam."),
        ("00:00:39,650", "00:00:40,850", "Mùa Quả Hội Tụ."),
        ("00:00:40,850", "00:00:44,150", "Nếm vị bản địa — Kết nối giá trị Việt."),
    ]
    srt = "\n\n".join(
        f"{index}\n{start} --> {end}\n{text}"
        for index, (start, end, text) in enumerate(cues, start=1)
    )
    (OUTPUT / "intro.vi.srt").write_text(srt + "\n", encoding="utf-8")


def main() -> None:
    if shutil.which("ffmpeg") is None:
        raise SystemExit("ffmpeg is required to assemble audio deliverables")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    build_voiceover()
    build_ambience()
    copy_original_music()
    package_story_assets()


if __name__ == "__main__":
    main()
