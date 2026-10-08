#!/usr/bin/env python3
"""Call the Tri Team competition API without persisting the API key."""
import argparse
import base64
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import sys
import time
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parents[1]
PROMPTS = json.loads((ROOT / "prompts.json").read_text(encoding="utf-8"))
MEDIA = ROOT / "remotion" / "public" / "media"
BASE = "https://api.thucchien.ai"
VOICE_LINES = [
    ("scene-01", "Một trái ngọt bắt đầu từ đâu?", "A warm adult Vietnamese woman’s voice, intimate and curious at the beginning. Natural northern Vietnamese pronunciation, clear and unhurried, not an advertisement. Let the question rise gently and leave a short reflective pause."),
    ("scene-02", "Từ đất, từ nắng, từ bàn tay chăm chút qua từng mùa.", "The same warm adult Vietnamese woman’s voice. Sincere and grounded, calm pace. Give a soft emphasis to ‘bàn tay’; no dramatic commercial delivery."),
    ("scene-03", "Mỗi hương vị mang một vùng đất. Mỗi mùa quả lưu một câu chuyện.", "The same warm adult Vietnamese woman’s voice. Thoughtful and close, with a short pause between the two sentences. Gentle emphasis on ‘vùng đất’."),
    ("scene-04", "Hãy đến để nếm, để hiểu, và gặp những người làm nên trái ngọt.", "The same warm adult Vietnamese woman’s voice. Friendly invitation, relaxed and clear, with a slight lift in energy. Do not sound like a hard-sell advertisement."),
    ("scene-05", "Để mỗi cuộc gặp mở thêm cơ hội, mỗi sản phẩm tìm thấy kết nối mới.", "The same warm adult Vietnamese woman’s voice. Confident but restrained, clear natural Vietnamese, slightly brisker only for this longer sentence. Give a soft emphasis to ‘kết nối’."),
    ("scene-06", "Festival Trái Cây Việt Nam. Mùa Quả Hội Tụ. Nếm vị bản địa — Kết nối giá trị Việt.", "The same warm adult Vietnamese woman’s voice. Confident, warm, and quietly uplifting. Pause distinctly between the festival name, concept name, and final message; finish with a calm, assured cadence."),
]


def read_key():
    key = sys.stdin.buffer.readline().decode("utf-8", "replace").strip()
    if not key:
        raise SystemExit("API key was not received on stdin")
    return key


def safe_error(response, label):
    text = response.text[:600].replace("\n", " ")
    raise SystemExit(f"{label} failed ({response.status_code}): {text}")


def generate_storyboard(key):
    print("Generating the visual storyboard…", flush=True)
    brief = (ROOT / "storyboard_brief.txt").read_text(encoding="utf-8")
    response = requests.post(
        f"{BASE}/v1/chat/completions",
        headers={"Authorization": f"Bearer {key}"},
        json={
            "model": "gpt-6-luna",
            "reasoning_effort": "low",
            "max_completion_tokens": 4000,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": "Bạn là biên kịch phim thương hiệu Việt Nam. Tuân thủ đầy đủ giới hạn của brief; trả JSON hợp lệ và cô đọng."},
                {"role": "user", "content": brief},
            ],
        },
        timeout=300,
    )
    if response.status_code != 200:
        safe_error(response, "Storyboard generation")
    content = response.json()["choices"][0]["message"]["content"]
    storyboard = json.loads(content)
    out = ROOT / "storyboard-ai.json"
    out.write_text(json.dumps(storyboard, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Saved {out.name}", flush=True)


def generate_character_reference(key):
    MEDIA.mkdir(parents=True, exist_ok=True)
    out = MEDIA / "character-reference.png"
    print("Generating the character reference image…", flush=True)
    response = requests.post(
        f"{BASE}/v1/images/generations",
        headers={"Authorization": f"Bearer {key}"},
        json={
            "model": "nano-banana-2",
            "prompt": PROMPTS["character_reference"] + " Premium natural-light campaign photography. No text, labels, logos, or watermark.",
            "aspect_ratio": "16:9",
        },
        timeout=300,
    )
    if response.status_code != 200:
        safe_error(response, "Character image generation")
    out.write_bytes(base64.b64decode(response.json()["data"][0]["b64_json"]))
    print(f"Saved {out.name}", flush=True)


def regenerate_endcard(key):
    MEDIA.mkdir(parents=True, exist_ok=True)
    out = MEDIA / "scene-06-keyframe.png"
    prior = MEDIA / "scene-06-keyframe-v1.png"
    if out.exists() and not prior.exists():
        out.replace(prior)
    scene = next(s for s in PROMPTS["scenes"] if s["id"] == "scene-06")
    print("Regenerating the final fruit-only key visual…", flush=True)
    response = requests.post(
        f"{BASE}/v1/images/generations",
        headers={"Authorization": f"Bearer {key}"},
        json={
            "model": "nano-banana-2",
            "prompt": PROMPTS["style"] + " " + scene["keyframe"],
            "aspect_ratio": "16:9",
        },
        timeout=300,
    )
    if response.status_code != 200:
        safe_error(response, "Final key visual generation")
    out.write_bytes(base64.b64decode(response.json()["data"][0]["b64_json"]))
    print(f"Saved {out.name}", flush=True)


def regenerate_keyframe(key, scene_id):
    scene = next((s for s in PROMPTS["scenes"] if s["id"] == scene_id), None)
    if scene is None:
        raise SystemExit(f"Unknown scene id: {scene_id}")
    MEDIA.mkdir(parents=True, exist_ok=True)
    out = MEDIA / f"{scene_id}-keyframe.png"
    prior = MEDIA / f"{scene_id}-keyframe-v1.png"
    if out.exists() and not prior.exists():
        out.replace(prior)
    print(f"Regenerating keyframe for {scene_id}…", flush=True)
    response = requests.post(
        f"{BASE}/v1/images/generations",
        headers={"Authorization": f"Bearer {key}"},
        json={"model": "nano-banana-2", "prompt": PROMPTS["style"] + " " + scene["keyframe"], "aspect_ratio": "16:9"},
        timeout=300,
    )
    if response.status_code != 200:
        safe_error(response, f"{scene_id} keyframe regeneration")
    out.write_bytes(base64.b64decode(response.json()["data"][0]["b64_json"]))
    print(f"Saved {out.name}", flush=True)


def generate_scene(key, scene_id, model):
    scene = next((s for s in PROMPTS["scenes"] if s["id"] == scene_id), None)
    if scene is None:
        raise SystemExit(f"Unknown scene id: {scene_id}")
    MEDIA.mkdir(parents=True, exist_ok=True)
    image_path = MEDIA / f"{scene_id}-keyframe.png"
    video_path = MEDIA / f"{scene_id}.mp4"

    if video_path.exists():
        print(f"Using existing clip {video_path.name}; skipping another paid generation.", flush=True)
        return

    if not image_path.exists():
        print(f"Generating keyframe for {scene_id}…", flush=True)
        response = requests.post(
            f"{BASE}/v1/images/generations",
            headers={"Authorization": f"Bearer {key}"},
            json={
                "model": "nano-banana-2",
                "prompt": PROMPTS["style"] + " " + scene["keyframe"],
                "aspect_ratio": "16:9",
            },
            timeout=300,
        )
        if response.status_code != 200:
            safe_error(response, f"{scene_id} keyframe generation")
        image_path.write_bytes(base64.b64decode(response.json()["data"][0]["b64_json"]))
        print(f"Saved {image_path.name}", flush=True)
    else:
        print(f"Using existing keyframe {image_path.name}", flush=True)

    print(f"Submitting {scene['seconds']}s Veo clip for {scene_id}…", flush=True)
    with image_path.open("rb") as image_file:
        response = requests.post(
            f"{BASE}/v1/videos",
            headers={"Authorization": f"Bearer {key}"},
            data={
                "model": model,
                "prompt": PROMPTS["style"] + " " + scene["video"],
                "seconds": str(scene["seconds"]),
                "size": "1280x720",
            },
            files={"input_reference": (image_path.name, image_file, "image/png")},
            timeout=300,
        )
    if response.status_code not in (200, 201, 202):
        safe_error(response, f"{scene_id} video submission")
    job = response.json()
    video_id = job["id"]
    print(f"Video job {video_id}: {job.get('status', 'submitted')}", flush=True)

    deadline = time.monotonic() + 20 * 60
    while time.monotonic() < deadline:
        status = requests.get(f"{BASE}/v1/videos/{video_id}", headers={"Authorization": f"Bearer {key}"}, timeout=90)
        if status.status_code != 200:
            safe_error(status, f"{scene_id} status check")
        job = status.json()
        state = job.get("status")
        print(f"{scene_id}: {state}", flush=True)
        if state == "completed":
            break
        if state == "failed":
            raise SystemExit(f"{scene_id} generation failed: {json.dumps(job.get('error', {}), ensure_ascii=False)[:600]}")
        time.sleep(10)
    else:
        raise SystemExit(f"Timed out waiting for {scene_id} ({video_id})")

    content = requests.get(f"{BASE}/v1/videos/{video_id}/content", headers={"Authorization": f"Bearer {key}"}, timeout=300)
    if content.status_code != 200:
        safe_error(content, f"{scene_id} video download")
    video_path.write_bytes(content.content)
    print(f"Saved {video_path.name} ({len(content.content)} bytes)", flush=True)


def generate_voiceover(key):
    out_dir = MEDIA / "voice"
    out_dir.mkdir(parents=True, exist_ok=True)
    for scene_id, text, instructions in VOICE_LINES:
        out = out_dir / f"{scene_id}.mp3"
        if out.exists():
            print(f"Using existing voice line {out.name}.", flush=True)
            continue
        print(f"Generating voice line {scene_id}…", flush=True)
        response = requests.post(
            f"{BASE}/audio/speech",
            headers={"Authorization": f"Bearer {key}"},
            json={
                "model": "gpt-4o-mini-tts",
                "voice": "nova",
                "input": text,
                "instructions": instructions,
            },
            timeout=300,
        )
        if response.status_code != 200:
            safe_error(response, f"{scene_id} voice generation")
        out.write_bytes(response.content)
        print(f"Saved {out.relative_to(ROOT)} ({len(response.content)} bytes)", flush=True)


def generate_music(key):
    MEDIA.mkdir(parents=True, exist_ok=True)
    part1 = MEDIA / "music-part-01.mp3"
    part2 = MEDIA / "music-part-02.mp3"
    if part1.exists() and part2.exists():
        print("Using existing Lyria instrumental parts.", flush=True)
        return
    prompts = [
        (
            "Original instrumental score for the opening 30 seconds of a cinematic Vietnamese fruit-festival concept film. "
            "No vocals and no lyrics. Start intimate, warm and spacious with soft natural ambience, delicate strings, "
            "muted bamboo-like wood tones and gentle piano. Gradually add soft plucked notes and a restrained contemporary pulse; "
            "in the last 8 seconds, become brighter and more hopeful, but stay subtle under narration. Never epic or action-like; no familiar melody."
        ),
        (
            "A seamless instrumental continuation for the final 15 seconds of the same cinematic Vietnamese fruit-festival film. "
            "No vocals and no lyrics. Match warm piano, delicate strings, muted wooden tones and light hand percussion; "
            "continue with restrained hope, rise gently, then resolve into one bright confident but not grand chord near the end "
            "with a short soft reverb tail. Sparse under spoken narration; no familiar melody, no action drums."
        ),
    ]
    for index, (out, prompt) in enumerate(zip((part1, part2), prompts), start=1):
        if out.exists():
            print(f"Using existing {out.name}.", flush=True)
            continue
        print(f"Generating original Lyria instrumental part {index}/2…", flush=True)
        response = requests.post(
            f"{BASE}/audio/speech",
            headers={"Authorization": f"Bearer {key}"},
            json={"model": "lyria-3-clip-preview", "voice": "default", "input": prompt},
            timeout=360,
        )
        if response.status_code != 200:
            safe_error(response, f"Lyria music part {index}")
        out.write_bytes(response.content)
        cost = response.headers.get("x-litellm-response-cost")
        note = f" (gateway cost {cost})" if cost else ""
        print(f"Saved {out.name} ({len(response.content)} bytes){note}", flush=True)


def generate_full_package(key, model):
    if not (ROOT / "storyboard-ai.json").exists():
        generate_storyboard(key)
    if not (MEDIA / "character-reference.png").exists():
        generate_character_reference(key)

    actions = []
    for scene in PROMPTS["scenes"]:
        if not (MEDIA / f"{scene['id']}.mp4").exists():
            actions.append((f"video {scene['id']}", lambda s=scene: generate_scene(key, s["id"], model)))
    if not all((MEDIA / "voice" / f"{scene_id}.mp3").exists() for scene_id, _, _ in VOICE_LINES):
        actions.append(("voice-over", lambda: generate_voiceover(key)))
    if not (MEDIA / "music-original.mp3").exists():
        actions.append(("original music", lambda: generate_music(key)))

    if not actions:
        print("All requested source assets already exist.", flush=True)
        return
    failures = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(fn): label for label, fn in actions}
        for future in as_completed(futures):
            label = futures[future]
            try:
                future.result()
                print(f"Finished {label}.", flush=True)
            except BaseException as exc:
                failures.append((label, str(exc)))
                print(f"Failed {label}: {exc}", flush=True)
    if failures:
        summary = "; ".join(f"{label}: {error}" for label, error in failures)
        raise SystemExit(f"Some media generation steps failed: {summary}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["storyboard", "characters", "scene", "voiceover", "music", "full", "endcard", "rekeyframe"])
    parser.add_argument("scene_id", nargs="?")
    parser.add_argument("--model", default="veo-3.1-lite-generate-001")
    args = parser.parse_args()
    key = read_key()
    if args.action == "storyboard":
        generate_storyboard(key)
    elif args.action == "characters":
        generate_character_reference(key)
    elif args.action == "scene":
        if not args.scene_id:
            raise SystemExit("scene action requires a scene id such as scene-01")
        generate_scene(key, args.scene_id, args.model)
    elif args.action == "voiceover":
        generate_voiceover(key)
    elif args.action == "music":
        generate_music(key)
    elif args.action == "endcard":
        regenerate_endcard(key)
    elif args.action == "rekeyframe":
        if not args.scene_id:
            raise SystemExit("rekeyframe action requires a scene id")
        regenerate_keyframe(key, args.scene_id)
    else:
        generate_full_package(key, args.model)


if __name__ == "__main__":
    main()
