"""Image regressions. Requires Python Playwright and a local HTTP server.

Run: python scripts/test-microsite-images.py --url http://127.0.0.1:8000/
Set CHROME_PATH when using a system Chromium instead of Playwright's browser.
"""

import argparse
import json
import os
from pathlib import Path
import subprocess
import unittest

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "chung-khao" / "mua-qua-hoi-tu"
BASE_URL = "http://127.0.0.1:8000/"


class ImageRegressionTests(unittest.TestCase):
    def test_build_contains_every_viewer_image(self):
        subprocess.run(["node", str(ROOT / "scripts/build-vercel.mjs")], check=True)
        result = subprocess.run(
            ["node", "--input-type=module", "-e",
             f"import {{assetsBySlide}} from '{(SITE / 'assets-manifest.js').as_uri()}';"
             "console.log(JSON.stringify(Object.values(assetsBySlide)"
             ".flatMap(a => [a.src, a.original, a.poster, a.captions].filter(Boolean))));"],
            check=True, capture_output=True, text=True,
        )
        for source in json.loads(result.stdout):
            with self.subTest(source=source):
                self.assertTrue((ROOT / "dist" / source).is_file(), f"Missing deployed media: {source}")

    def test_story_image_scales_without_cropping(self):
        with sync_playwright() as p:
            options = {"headless": True}
            if os.environ.get("CHROME_PATH"):
                options["executable_path"] = os.environ["CHROME_PATH"]
            browser = p.chromium.launch(**options)
            try:
                page = browser.new_page()
                page.goto(BASE_URL, wait_until="networkidle")
                image = page.locator(".story-visual img")
                image.scroll_into_view_if_needed()
                image.evaluate("img => img.decode()")
                for width in (360, 390, 640, 768, 1024, 1440):
                    with self.subTest(width=width):
                        page.set_viewport_size({"width": width, "height": 900})
                        size = image.evaluate("""img => ({
                            width: img.getBoundingClientRect().width,
                            height: img.getBoundingClientRect().height,
                            naturalRatio: img.naturalWidth / img.naturalHeight,
                            overflow: document.documentElement.scrollWidth > innerWidth
                        })""")
                        self.assertFalse(size["overflow"], "Page overflows horizontally")
                        self.assertAlmostEqual(
                            size["width"] / size["height"], size["naturalRatio"], delta=0.01,
                            msg=f"Story image must keep its full landscape composition: {size}",
                        )
            finally:
                browser.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default=BASE_URL)
    args, remaining = parser.parse_known_args()
    BASE_URL = args.url
    unittest.main(argv=[__file__, *remaining])