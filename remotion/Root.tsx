import { Composition } from "remotion";
import { MonolithIntro } from "./compositions/MonolithIntro";
import { AgentShowcase } from "./compositions/AgentShowcase";
import { NeuralPulse } from "./compositions/NeuralPulse";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MonolithIntro"
        component={MonolithIntro}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="AgentShowcase"
        component={AgentShowcase}
        durationInFrames={600}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="NeuralPulse"
        component={NeuralPulse}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
