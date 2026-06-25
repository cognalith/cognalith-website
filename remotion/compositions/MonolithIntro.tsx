import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

const COLORS = {
  dark: "#0a0a0f",
  cyan: "#00d4ff",
  purple: "#a855f7",
  green: "#00ff88",
};

// Animated Monolith shape
const Monolith: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(progress, [0, 0.5], [0, 1]);
  const glowIntensity = interpolate(progress, [0.5, 1], [0, 1]);

  return (
    <div
      style={{
        width: 200,
        height: 500,
        background: `linear-gradient(180deg, ${COLORS.dark} 0%, #1a1a24 100%)`,
        border: `2px solid ${COLORS.cyan}`,
        boxShadow: `
          0 0 ${60 * glowIntensity}px ${COLORS.cyan}50,
          inset 0 0 ${40 * glowIntensity}px ${COLORS.cyan}20
        `,
        transform: `scale(${scale})`,
        opacity,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated scan lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            top: `${15 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, ${COLORS.cyan}, transparent)`,
            opacity: interpolate(
              progress,
              [0.5 + i * 0.05, 0.6 + i * 0.05],
              [0, 0.6]
            ),
          }}
        />
      ))}

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.cyan}60 0%, transparent 70%)`,
          opacity: glowIntensity,
        }}
      />

      {/* M letter */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 48,
          fontWeight: "bold",
          color: COLORS.cyan,
          opacity: glowIntensity,
          textShadow: `0 0 20px ${COLORS.cyan}`,
        }}
      >
        M
      </div>
    </div>
  );
};

// Animated text
const AnimatedText: React.FC<{
  text: string;
  delay: number;
  color?: string;
  fontSize?: number;
}> = ({ text, delay, color = "#ffffff", fontSize = 72 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [50, 0]);

  return (
    <div
      style={{
        fontSize,
        fontWeight: "bold",
        color,
        opacity,
        transform: `translateY(${y}px)`,
        letterSpacing: "-0.02em",
      }}
    >
      {text}
    </div>
  );
};

// Neural connection lines
const NeuralLines: React.FC<{ progress: number }> = ({ progress }) => {
  const lines = [
    { x1: 960, y1: 540, x2: 400, y2: 200, delay: 0 },
    { x1: 960, y1: 540, x2: 1520, y2: 200, delay: 0.1 },
    { x1: 960, y1: 540, x2: 300, y2: 800, delay: 0.2 },
    { x1: 960, y1: 540, x2: 1620, y2: 800, delay: 0.3 },
    { x1: 960, y1: 540, x2: 200, y2: 540, delay: 0.4 },
    { x1: 960, y1: 540, x2: 1720, y2: 540, delay: 0.5 },
  ];

  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.cyan} stopOpacity={0.8} />
          <stop offset="100%" stopColor={COLORS.purple} stopOpacity={0.8} />
        </linearGradient>
      </defs>

      {lines.map((line, i) => {
        const lineProgress = interpolate(
          progress,
          [line.delay, line.delay + 0.3],
          [0, 1],
          { extrapolateRight: "clamp" }
        );

        const dashLength = Math.sqrt(
          Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2)
        );

        return (
          <g key={i}>
            {/* Line */}
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#lineGradient)"
              strokeWidth={2}
              strokeDasharray={dashLength}
              strokeDashoffset={dashLength * (1 - lineProgress)}
              opacity={0.6}
            />

            {/* End node */}
            <circle
              cx={line.x2}
              cy={line.y2}
              r={8 * lineProgress}
              fill={i % 2 === 0 ? COLORS.cyan : COLORS.purple}
              opacity={lineProgress}
            >
              <animate
                attributeName="r"
                values={`${8 * lineProgress};${12 * lineProgress};${8 * lineProgress}`}
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
};

export const MonolithIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation phases
  const monolithProgress = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const neuralProgress = interpolate(
    frame,
    [60, 180],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const textProgress = frame > 120 ? (frame - 120) / 60 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.5,
        }}
      />

      {/* Neural network lines */}
      <Sequence from={60}>
        <NeuralLines progress={neuralProgress} />
      </Sequence>

      {/* Center monolith */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Monolith progress={monolithProgress} />
      </AbsoluteFill>

      {/* Text reveal */}
      <Sequence from={150}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 150,
          }}
        >
          <AnimatedText text="COGNALITH" delay={0} color={COLORS.cyan} />
          <AnimatedText
            text="One Founder. Infinite Leverage."
            delay={30}
            color="#ffffff"
            fontSize={36}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${COLORS.cyan}15, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${COLORS.purple}15, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />
    </AbsoluteFill>
  );
};
