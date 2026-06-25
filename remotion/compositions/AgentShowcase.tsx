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
  red: "#ff6b6b",
  yellow: "#ffd93d",
};

const AGENTS = [
  { name: "CEO", color: COLORS.cyan, role: "Strategic Leadership" },
  { name: "CTO", color: COLORS.purple, role: "Technology Strategy" },
  { name: "CFO", color: COLORS.green, role: "Financial Planning" },
  { name: "COO", color: COLORS.red, role: "Operations Management" },
  { name: "CMO", color: COLORS.yellow, role: "Marketing & Growth" },
  { name: "DevOps", color: COLORS.cyan, role: "Infrastructure" },
  { name: "SWE", color: COLORS.purple, role: "Development" },
  { name: "QA", color: COLORS.green, role: "Quality Assurance" },
  { name: "Data", color: COLORS.red, role: "Analytics & ML" },
];

const AgentCard: React.FC<{
  agent: (typeof AGENTS)[0];
  index: number;
  frame: number;
  fps: number;
}> = ({ agent, index, frame, fps }) => {
  const delay = index * 20;
  const cardProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const x = interpolate(cardProgress, [0, 1], [100, 0]);
  const opacity = interpolate(cardProgress, [0, 1], [0, 1]);
  const scale = interpolate(cardProgress, [0, 1], [0.8, 1]);

  // Calculate grid position
  const col = index % 3;
  const row = Math.floor(index / 3);
  const cardWidth = 350;
  const cardHeight = 180;
  const gap = 40;
  const startX = (1920 - (cardWidth * 3 + gap * 2)) / 2;
  const startY = 250;

  const posX = startX + col * (cardWidth + gap);
  const posY = startY + row * (cardHeight + gap);

  // Pulse animation
  const pulsePhase = ((frame + index * 10) % 60) / 60;
  const pulseGlow = Math.sin(pulsePhase * Math.PI * 2) * 0.3 + 0.7;

  return (
    <div
      style={{
        position: "absolute",
        left: posX,
        top: posY,
        width: cardWidth,
        height: cardHeight,
        background: "linear-gradient(135deg, #1a1a24, #13131a)",
        borderRadius: 16,
        border: `1px solid ${agent.color}40`,
        opacity,
        transform: `translateX(${x}px) scale(${scale})`,
        boxShadow: `0 0 ${30 * pulseGlow}px ${agent.color}30`,
        display: "flex",
        flexDirection: "column",
        padding: 24,
      }}
    >
      {/* Icon placeholder */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${agent.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: agent.color,
            boxShadow: `0 0 15px ${agent.color}`,
          }}
        />
      </div>

      {/* Name */}
      <div
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#ffffff",
          marginBottom: 4,
        }}
      >
        {agent.name} Agent
      </div>

      {/* Role */}
      <div
        style={{
          fontSize: 14,
          color: agent.color,
          opacity: 0.9,
        }}
      >
        {agent.role}
      </div>

      {/* Status indicator */}
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: agent.color,
            boxShadow: `0 0 10px ${agent.color}`,
            animation: "pulse 1s infinite",
          }}
        />
        <span style={{ fontSize: 12, color: "#71717a" }}>Active</span>
      </div>
    </div>
  );
};

export const AgentShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

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
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title */}
      <Sequence from={0}>
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <div style={{ fontSize: 18, color: COLORS.cyan, marginBottom: 12 }}>
            MEET YOUR TEAM
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            15 AI Agents.{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              One Vision.
            </span>
          </div>
        </div>
      </Sequence>

      {/* Agent cards */}
      <Sequence from={30}>
        {AGENTS.map((agent, i) => (
          <AgentCard key={agent.name} agent={agent} index={i} frame={frame - 30} fps={fps} />
        ))}
      </Sequence>

      {/* Bottom tagline */}
      <Sequence from={300}>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: "#a1a1aa",
              opacity: interpolate(frame - 300, [0, 60], [0, 1]),
            }}
          >
            Available 24/7. Powered by{" "}
            <span style={{ color: COLORS.cyan }}>Monolith System</span>
          </div>
        </div>
      </Sequence>

      {/* Ambient gradients */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${COLORS.purple}10, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${COLORS.cyan}10, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />
    </AbsoluteFill>
  );
};
