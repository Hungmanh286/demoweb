import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = path.join(repositoryRoot, "chung-khao", "mua-qua-hoi-tu");
const outputRoot = path.join(repositoryRoot, "dist");

const files = [
  "index.html",
  "styles.css",
  "app.js",
  "content.js",
  "proposal-content.js",
  "assets-manifest.js",
  "IMAGE-GENERATION-PROMPTS.md",
  "IMAGE_CREDITS.md",
  "assets/generated",
  "assets/fruit-market.jpg",
  "assets/orchard.jpg",
  "assets/mangoes.jpg",
  "assets/generated",
  "assets/video/intro.mp4",
  "assets/video/intro-poster.png",
  "assets/video/intro.vi.vtt",
  "assets/video/transcript.vi.txt",
  "assets/video/references/keyframes/scene-03.png",
  "assets/video/references/keyframes/scene-06.png",
  "output/pdf",
  "output/png",
];

const missing = files.filter((relativePath) => !existsSync(path.join(siteRoot, relativePath)));
if (missing.length > 0) {
  throw new Error(`Missing required site files:\n${missing.join("\n")}`);
}

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });

for (const relativePath of files) {
  cpSync(path.join(siteRoot, relativePath), path.join(outputRoot, relativePath), {
    recursive: true,
  });
}

console.log(`Prepared ${files.length} static site entries in dist/`);
