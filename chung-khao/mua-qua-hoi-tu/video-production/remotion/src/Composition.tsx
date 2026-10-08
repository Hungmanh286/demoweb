import { Composition } from "remotion";
import { FestivalIntro } from "./FestivalIntro";

export const MyComposition = () => (
  <Composition
    id="FestivalIntro"
    component={FestivalIntro}
    durationInFrames={45 * 30}
    fps={30}
    width={1280}
    height={720}
  />
);
