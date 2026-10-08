# Video intro · Mùa Quả Hội Tụ

Production project for the 45-second, 16:9 festival intro. The story, character reference, keyframes, six source clips, and voice lines were generated through the AI Thực Chiến gateway. The final edit adds Vietnamese type, the gold thread graphics, timing, captions, and audio mix in Remotion. Veo's prompt-directed ambience is extracted as a separate effects track. The instrumental score is composed locally by `scripts/generate_score.py`; the gateway's Lyria endpoint was unavailable for this key.

## API models

- Storyboard: `gpt-6-luna`
- Character and scene keyframes: `nano-banana-2`
- Motion clips: `veo-3.1-lite-generate-001`, 1280×720
- Separate narration: `gpt-4o-mini-tts`
- Instrumental score: locally synthesized; its WAV source and generating script are retained

The Veo source clips total 44 generated seconds. Scene 4 holds its last frame for one second, producing a 45-second cut with the final key visual held from 00:42 to 00:45. The gateway documentation lists the Veo Lite rate at $0.05 per generated second; the source-video charge is therefore approximately $2.20. Image, narration, and music charges are separate. API key is read from terminal input by `scripts/generate.py` and is not stored in this project.

## Source files

- `storyboard-ai.json`: API-generated Vietnamese visual storyboard.
- `prompts.json`: character reference, scene keyframes, and Veo motion prompts.
- `voiceover.txt`: locked narration script.
- `remotion/public/media/`: generated character reference, keyframes, video clips, six voice lines, and music source.
- `../assets/video/`: final MP4 and separate voice, music, generated ambience, subtitles, transcript, storyboard, keyframes, and character reference.
- `scripts/package_audio.py`: rebuilds the separate audio tracks and packages the story/reference assets from the generated sources.
- `remotion/src/FestivalIntro.tsx`: editable 45-second composition.

## Render

Run `python3 scripts/package_audio.py`, then from `remotion/` render `FestivalIntro` to `../../assets/video/intro.mp4` with `npx remotion render FestivalIntro ../../assets/video/intro.mp4 --codec=h264 --timeout=120000`.

Scene 3 uses its clean AI-generated fruit still with a restrained push-in because the source motion clip introduced an unintended person. Scene 4 holds a clean frame for one second; scene 6 settles on its graphic key visual for the final three seconds. Generated Veo ambience, narration, and score remain separate files beside the final MP4.
