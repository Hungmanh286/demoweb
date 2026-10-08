import { Audio, Video } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { FC } from "react";

const FPS = 30;
const TOTAL = 45 * FPS;

const SCENES = [
  { id: "scene-01", from: 0, duration: 6 * FPS },
  { id: "scene-02", from: 6 * FPS, duration: 8 * FPS },
  { id: "scene-03", from: 14 * FPS, duration: 8 * FPS },
  { id: "scene-04", from: 22 * FPS, duration: 9 * FPS },
  { id: "scene-05", from: 31 * FPS, duration: 6 * FPS },
  { id: "scene-06", from: 37 * FPS, duration: 8 * FPS },
];

const THREAD_PATHS = [
  "M 20 525 C 230 490 390 570 560 405 S 905 250 1265 160",
  "M 15 545 C 220 555 380 620 590 435 S 975 320 1275 210",
  "M 0 380 C 280 155 440 585 710 370 S 1030 235 1280 395",
  "M 0 515 C 240 455 395 205 650 345 S 970 590 1280 170",
  "M 0 360 C 265 115 475 610 700 370 S 1000 220 1280 360",
  "M 640 95 A 265 265 0 1 1 639.9 95",
];

const TYPE = "'Noto Sans', 'DejaVu Sans', sans-serif";
const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const FullFrameMedia: FC<{ sceneId: string; localFrame: number }> = ({ sceneId, localFrame }) => {
  if (sceneId === "scene-03") {
    const scale = interpolate(localFrame, [0, 8 * FPS], [1, 1.055], clamp);
    return (
      <Img
        src={staticFile("media/scene-03-keyframe.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", scale }}
      />
    );
  }

  if (sceneId === "scene-04") {
    return (
      <>
        <Video src={staticFile("media/scene-04.mp4")} volume={0} durationInFrames={8 * FPS} />
        {localFrame >= 8 * FPS ? <Img src={staticFile("media/scene-04-hold.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      </>
    );
  }

  if (sceneId === "scene-06") {
    return (
      <>
        <Video src={staticFile("media/scene-06.mp4")} volume={0} durationInFrames={5 * FPS} />
        {localFrame >= 5 * FPS ? <Img src={staticFile("media/scene-06-hold.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      </>
    );
  }

  return <Video src={staticFile(`media/${sceneId}.mp4`)} volume={0} />;
};

const Thread: FC<{ sceneIndex: number; localFrame: number; duration: number }> = ({ sceneIndex, localFrame, duration }) => {
  const progressEnd = sceneIndex === 5 ? 5 * FPS : duration - 12;
  const draw = interpolate(localFrame, [0, progressEnd], [900, 0], {
    ...clamp,
    easing: Easing.bezier(0.35, 0, 0.2, 1),
  });
  const opacity = interpolate(localFrame, [0, 18, duration - 8, duration], [0, 0.88, 0.88, 0], clamp);
  const rotation = sceneIndex === 5 ? interpolate(localFrame, [0, 5 * FPS], [0, 24], clamp) : 0;

  return (
    <svg viewBox="0 0 1280 720" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}>
      <path
        d={THREAD_PATHS[sceneIndex]}
        fill="none"
        stroke="#f2c56c"
        strokeWidth={sceneIndex === 5 ? 4 : 3}
        strokeLinecap="round"
        strokeDasharray="900 900"
        strokeDashoffset={draw}
        transform={sceneIndex === 5 ? `rotate(${rotation} 640 360)` : undefined}
        style={{ filter: "drop-shadow(0 0 8px rgba(248, 198, 98, 0.65))" }}
      />
    </svg>
  );
};

const Keywords: FC<{ text: string; localFrame: number }> = ({ text, localFrame }) => {
  const opacity = interpolate(localFrame, [14, 30, 190, 220], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: "absolute", left: 88, bottom: 86, opacity, color: "#f7f2e7", fontFamily: TYPE, fontSize: 24, letterSpacing: 3, fontWeight: 600, textShadow: "0 2px 18px rgba(0,0,0,.45)" }}>
      {text}
    </div>
  );
};

const FestivalEndCard: FC<{ localFrame: number }> = ({ localFrame }) => {
  const enter = interpolate(localFrame, [12, 44], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <div style={{ position: "absolute", left: 80, right: 80, top: 124, bottom: 52, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: enter, textAlign: "center", color: "#fff8e9", fontFamily: TYPE, textShadow: "0 3px 28px rgba(0,0,0,.55)" }}>
      <div style={{ fontSize: 20, letterSpacing: 5, fontWeight: 700, color: "#f5d282", marginBottom: 13 }}>FESTIVAL TRÁI CÂY VIỆT NAM</div>
      <div style={{ fontSize: 60, letterSpacing: 1, lineHeight: 1.06, fontWeight: 800, color: "#fff9ed" }}>MÙA QUẢ HỘI TỤ</div>
      <div style={{ width: 190, height: 2, background: "#edbf5b", margin: "24px 0 18px" }} />
      <div style={{ fontSize: 26, fontWeight: 500, letterSpacing: 0.3 }}>Nếm vị bản địa — Kết nối giá trị Việt.</div>
      <div style={{ position: "absolute", bottom: 17, fontSize: 12, color: "rgba(255,248,233,.82)", letterSpacing: 0.3 }}>Hình ảnh minh họa ý tưởng festival, được tạo với AI.</div>
    </div>
  );
};

const SceneLayer: FC<{ sceneIndex: number }> = ({ sceneIndex }) => {
  const localFrame = useCurrentFrame();
  const scene = SCENES[sceneIndex];
  const fadeIn = sceneIndex === 0 ? 1 : interpolate(localFrame, [0, 10], [0, 1], clamp);
  const fadeOut = sceneIndex === 5
    ? 1
    : interpolate(localFrame, [scene.duration - 10, scene.duration], [1, 0], clamp);
  const edgeFade = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ opacity: edgeFade, backgroundColor: "#0d392b", overflow: "hidden" }}>
      <FullFrameMedia sceneId={scene.id} localFrame={localFrame} />
      <AbsoluteFill style={{ background: sceneIndex === 5 ? "linear-gradient(90deg, rgba(8,40,29,.12), rgba(8,40,29,.08)), linear-gradient(0deg, rgba(8,40,29,.44), transparent 40%)" : "linear-gradient(90deg, rgba(8,40,29,.60), rgba(8,40,29,.04) 78%), linear-gradient(0deg, rgba(8,40,29,.50), transparent 38%)" }} />
      <Thread sceneIndex={sceneIndex} localFrame={localFrame} duration={scene.duration} />
      {sceneIndex === 2 ? <Keywords text="VÙNG ĐẤT  ·  NGƯỜI TRỒNG  ·  HƯƠNG VỊ" localFrame={localFrame} /> : null}
      {sceneIndex === 3 ? <Keywords text="NẾM  ·  HIỂU  ·  GẶP GỠ" localFrame={localFrame} /> : null}
      {sceneIndex === 5 ? <FestivalEndCard localFrame={localFrame} /> : null}
    </AbsoluteFill>
  );
};

const MusicBed: FC = () => {
  const frame = useCurrentFrame();
  const speechWindows = [[0, 90], [174, 345], [414, 621], [654, 829], [924, 1331]];
  const underVoice = speechWindows.some(([start, end]) => frame >= start && frame <= end);
  const fadeOut = interpolate(frame, [42 * FPS, TOTAL], [1, 0], clamp);
  const level = underVoice ? 0.14 : 0.22;
  return <Audio src={staticFile("media/music-original.mp3")} durationInFrames={TOTAL} volume={level * fadeOut} />;
};

const AmbienceTrack: FC = () => {
  const frame = useCurrentFrame();
  const speechWindows = [[0, 90], [174, 345], [414, 621], [654, 829], [924, 1331]];
  const underVoice = speechWindows.some(([start, end]) => frame >= start && frame <= end);
  const fadeOut = interpolate(frame, [44 * FPS, TOTAL], [1, 0], clamp);
  return <Audio src={staticFile("media/ambience-generated.mp3")} durationInFrames={TOTAL} volume={(underVoice ? 0.72 : 0.9) * fadeOut} />;
};

const VoiceTrack: FC = () => (
  <>
    <Sequence from={0} durationInFrames={TOTAL} name="Voice · scene 01"><Audio src={staticFile("media/voice/scene-01.mp3")} /></Sequence>
    <Sequence from={6 * FPS} durationInFrames={TOTAL - 6 * FPS} name="Voice · scene 02"><Audio src={staticFile("media/voice/scene-02.mp3")} /></Sequence>
    <Sequence from={14 * FPS} durationInFrames={TOTAL - 14 * FPS} name="Voice · scene 03"><Audio src={staticFile("media/voice/scene-03.mp3")} /></Sequence>
    <Sequence from={22 * FPS} durationInFrames={TOTAL - 22 * FPS} name="Voice · scene 04"><Audio src={staticFile("media/voice/scene-04.mp3")} /></Sequence>
    <Sequence from={31 * FPS} durationInFrames={TOTAL - 31 * FPS} name="Voice · scene 05"><Audio src={staticFile("media/voice/scene-05.mp3")} /></Sequence>
    <Sequence from={37 * FPS + 18} durationInFrames={TOTAL - (37 * FPS + 18)} name="Voice · scene 06"><Audio src={staticFile("media/voice/scene-06.mp3")} /></Sequence>
  </>
);

export const FestivalIntro: FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0d392b" }}>
    {SCENES.map((scene, index) => (
      <Sequence key={scene.id} from={scene.from} durationInFrames={scene.duration} name={scene.id}>
        <SceneLayer sceneIndex={index} />
      </Sequence>
    ))}
    <MusicBed />
    <AmbienceTrack />
    <VoiceTrack />
  </AbsoluteFill>
);
