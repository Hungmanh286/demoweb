#!/usr/bin/env python3
"""Generate nine standalone, text-free concept images for the fruit festival."""

import argparse
import base64
import json
import io
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests
from PIL import Image


AI_API_BASE = "https://api.thucchien.ai/v1"
MODEL = "nano-banana-2"
REPO_ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = REPO_ROOT / ".env"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "chung-khao/mua-qua-hoi-tu/assets/generated"

BRIEF_FILE = REPO_ROOT / "chung-khao/mua-qua-hoi-tu/image-production/prompts.json"
BRIEF = json.loads(BRIEF_FILE.read_text(encoding="utf-8"))
STYLE = BRIEF["style"]
SLIDES = [dict(item, number=number) for number, item in enumerate(BRIEF["images"], start=2)]


def load_env_file(path: Path) -> None:
    """Load simple KEY=VALUE entries without overriding exported environment values."""
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped.startswith("export "):
            stripped = stripped[7:].lstrip()
        key, separator, value = stripped.partition("=")
        key = key.strip()
        if not separator or not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", key):
            continue
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        else:
            value = re.split(r"\s+#", value, maxsplit=1)[0].rstrip()
        os.environ.setdefault(key, value)


def generate_image(api_key: str, prompt: str, output_path: Path) -> dict:
    response = requests.post(
        f"{AI_API_BASE}/images/generations",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        json={"model": MODEL, "prompt": prompt, "aspect_ratio": "16:9"},
        timeout=(15, 240),
    )
    response.raise_for_status()
    result = response.json()
    images = result.get("data")
    if not isinstance(images, list) or not images or not images[0].get("b64_json"):
        raise ValueError("API response did not contain a base64 image in data[0].b64_json")

    image_data = base64.b64decode(images[0]["b64_json"], validate=True)
    if not image_data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError("API response image is not a PNG")

    with Image.open(io.BytesIO(image_data)) as image:
        image.load()
        width, height = image.size
        if width < 1000 or abs(width / height - 16 / 9) > 0.05:
            raise ValueError(f"Expected a landscape image, received {width}x{height}")
        web_image = image.convert("RGB")
        web_image.thumbnail((1920, 1080))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = output_path.with_suffix(".png.tmp")
    temp_path.write_bytes(image_data)
    temp_path.replace(output_path)
    web_path = output_path.with_suffix(".webp")
    web_temp = web_path.with_suffix(".webp.tmp")
    web_image.save(web_temp, format="WEBP", quality=86, method=6)
    web_temp.replace(web_path)
    return {"width": web_image.width, "height": web_image.height,
            "source_width": width, "source_height": height, "web_file": web_path.name}


def save_manifest(path: Path, generated: list[dict]) -> None:
    manifest = {
        "concept": "Festival Trái Cây Việt Nam — Mùa Quả Hội Tụ",
        "model": MODEL,
        "aspect_ratio": "16:9",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "assets": generated,
    }
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def parse_slide_numbers(value: str) -> list[int]:
    try:
        numbers = [int(part.strip()) for part in value.split(",")]
    except ValueError as error:
        raise argparse.ArgumentTypeError("Use comma-separated slide numbers from 2 to 10") from error
    if not numbers or any(number not in range(2, 11) for number in numbers):
        raise argparse.ArgumentTypeError("Slide numbers must be from 2 to 10")
    if len(set(numbers)) != len(numbers):
        raise argparse.ArgumentTypeError("Slide numbers must not repeat")
    return numbers


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate nine text-free images, each a complete standalone scene.")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Directory for PNGs (default: {DEFAULT_OUTPUT_DIR.relative_to(REPO_ROOT)})",
    )
    parser.add_argument(
        "--slides",
        type=parse_slide_numbers,
        help="Legacy viewer positions 2–10; prefer --images 1–9",
    )
    parser.add_argument(
        "--images", help="Image numbers 1–9, for example 1,4,9; use instead of --slides",
    )
    args = parser.parse_args()
    if args.images:
        if args.slides:
            parser.error("Choose --images or the legacy --slides option, not both")
        try:
            args.slides = parse_slide_numbers(",".join(str(int(n.strip()) + 1) for n in args.images.split(",")))
        except (ValueError, argparse.ArgumentTypeError):
            parser.error("Use unique comma-separated image numbers from 1 to 9")

    load_env_file(ENV_FILE)
    api_key = os.environ.get("THUCCHIEN_API_KEY", "").strip()
    if not api_key:
        print(f"THUCCHIEN_API_KEY is missing or empty in {ENV_FILE}", file=sys.stderr)
        return 2

    output_dir = args.output_dir if args.output_dir.is_absolute() else REPO_ROOT / args.output_dir
    manifest_path = output_dir / "manifest.json"
    existing_assets = {}
    if manifest_path.is_file():
        try:
            for asset in json.loads(manifest_path.read_text(encoding="utf-8")).get("assets", []):
                existing_assets[asset["slide"]] = asset
        except (json.JSONDecodeError, KeyError, TypeError):
            print(f"Could not read existing manifest: {manifest_path}", file=sys.stderr)
            return 2

    slides_to_generate = set(args.slides) if args.slides else {slide["number"] for slide in SLIDES}

    for slide in SLIDES:
        if slide["number"] not in slides_to_generate:
            continue
        output_path = output_dir / f"{slide['id']}.png"
        prompt = f"{STYLE}\n\n{slide['prompt']}"
        try:
            print(f"Generating image {slide['number'] - 1}/9: {slide['title']}", flush=True)
            dimensions = generate_image(api_key, prompt, output_path)
        except (requests.RequestException, ValueError, KeyError, json.JSONDecodeError) as error:
            message = str(error).replace(api_key, "[REDACTED]")
            if isinstance(error, requests.HTTPError) and error.response is not None:
                body = error.response.text[:1000].replace(api_key, "[REDACTED]")
                message = f"HTTP {error.response.status_code}: {body}"
            print(f"Failed to generate image {slide['number'] - 1}: {message}", file=sys.stderr)
            return 1

        existing_assets[slide["number"]] = {
            "slide": slide["number"],
            "id": slide["id"],
            "alt": slide["alt"],
            "generated_at_utc": datetime.now(timezone.utc).isoformat(),
            "title": slide["title"],
            "file": output_path.name,
            "prompt": prompt,
            **dimensions,
            "review_status": "pending",
        }
        save_manifest(manifest_path, sorted(existing_assets.values(), key=lambda asset: asset["slide"]))
        print(f"Saved {output_path}", flush=True)

    print(f"Generated {len(slides_to_generate)} standalone images in {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
