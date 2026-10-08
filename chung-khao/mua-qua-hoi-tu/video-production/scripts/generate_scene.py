#!/usr/bin/env python3
"""Generate one keyframe and one Veo 3.1 clip using the Tri Team gateway.

The API key is read from stdin and is never written to disk or printed.
"""
import argparse
import base64
import json
import os
import sys
import time
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parents[1]
PROMPTS = json.loads((ROOT / "prompts.json").read_text(encoding="utf-8"))
MEDIA = ROOT / "remotion" / "public" / "media"
BASE = "https://api.thucchien.ai"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("scene_id", nargs="?", default="scene-01")
    parser.add_argument("--model", default="veo-3.1-lite-generate-001")
    parser.add_argument("--skip-image", action="store_true")
    args = parser.parse_args()

    key = sys.stdin.readline().strip()
    if not key:
        raise SystemExit("API key was not received on stdin")

    scene = next((s for s in PROMPTS["scenes"] if s["id"] == args.scene_id), None)
    if scene is None:
        raise SystemExit(f"Unknown scene id: {args.scene_id}")

    MEDIA.mkdir(parents=True, exist_ok=True)
    headers = {"Authorization": f"Bearer {key}"}

    image_path = MEDIA / f"{scene['id']}-keyframe.png"
    video_path = MEDIA / f"{scene['id']}.mp4"

    if not args.skip_image:
        print(f"Generating keyframe for {scene['id']}…", flush=True)
        response = requests.post(
            f"{BASE}/v1/images/generations",
            headers={**headers, "Content-Type": "application/json"},
            json={
                "model": "nano-banana-2",
                "prompt": PROMPTS["style"] + " " + scene["keyframe"],
                "aspect_ratio": "16:9",
            },
            timeout=240,
        )
        if response.status_code != 200:
            raise SystemExit(f"Keyframe generation failed ({response.status_code}): {response.text[:500]}")
        image_data = response.json()["data"][0]["b64_json"]
        image_path.write_bytes(base64.b64decode(image_data))
        print(f"Saved keyframe: {image_path.name}", flush=True)

    print(f"Submitting {scene['seconds']}s Veo clip for {scene['id']}…", flush=True)
    with image_path.open("rb") as image_file:
        response = requests.post(
            f"{BASE}/v1/videos",
            headers=headers,
            data={
                "model": args.model,
                "prompt": PROMPTS["style"] + " " + scene["video"],
                "seconds": str(scene["seconds"]),
                "size": "1280x720",
            },
            files={"input_reference": (image_path.name, image_file, "image/png")},
            timeout=240,
        )
    if response.status_code not in (200, 201, 202):
        raise SystemExit(f"Video submission failed ({response.status_code}): {response.text[:500]}")
    job = response.json()
    video_id = job["id"]
    print(f"Video job: {video_id} ({job.get('status', 'submitted')})", flush=True)

    deadline = time.monotonic() + 20 * 60
    while time.monotonic() < deadline:
        status = requests.get(f"{BASE}/v1/videos/{video_id}", headers=headers, timeout=60)
        if status.status_code != 200:
            raise SystemExit(f"Video status request failed ({status.status_code}): {status.text[:500]}")
        state = status.json()
        print(f"{scene['id']}: {state.get('status')} {state.get('progress', '')}", flush=True)
        if state.get("status") == "completed":
            break
        if state.get("status") == "failed":
            raise SystemExit(f"Video generation failed: {json.dumps(state.get('error', {}), ensure_ascii=False)[:500]}")
        time.sleep(10)
    else:
        raise SystemExit(f"Timed out waiting for {scene['id']} ({video_id})")

    content = requests.get(f"{BASE}/v1/videos/{video_id}/content", headers=headers, timeout=240)
    if content.status_code != 200:
        raise SystemExit(f"Video download failed ({content.status_code}): {content.text[:500]}")
    video_path.write_bytes(content.content)
    print(f"Saved clip: {video_path.name} ({len(content.content)} bytes)", flush=True)
    if "x-litellm-response-cost" in content.headers:
        print(f"Gateway reported cost: {content.headers['x-litellm-response-cost']}", flush=True)


if __name__ == "__main__":
    main()
