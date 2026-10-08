# Video intro · Hành trình của một trái ngọt

Final delivery for the 45-second, 16:9 intro. The festival and event scenes are AI-generated concept illustrations, not event documentation.

## Main files

- `intro.mp4`: final H.264 video, 1280×720, with Vietnamese narration, original instrumental score, and generated ambience.
- `intro-poster.png`: final key visual with the Vietnamese title and AI disclosure.
- `intro.vi.vtt`, `intro.vi.srt`, `transcript.vi.txt`: captions and full narration transcript.
- `voiceover.mp3`, `music-original.mp3`, `sound-effects.mp3`: separate audio stems. The effect stem is extracted from the prompt-directed ambient audio in the Veo clips; the score is locally composed from the retained `generate_score.py` source.
- `storyboard-ai.json`: API-generated Vietnamese storyboard.
- `references/character-reference.png`: the mango, grower, and festival visitor reference sheet generated for visual consistency.
- `references/keyframes/`: six generated scene keyframes.

## Source and rights notes

The story, character sheet, scene keyframes, video clips, and narration were created with the AI Thực Chiến API. The score was composed locally because the Lyria endpoint returned an access error. The required disclosure is included on the final card: “Hình ảnh minh họa ý tưởng festival, được tạo với AI.”
