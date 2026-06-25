import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

const COLORS = {
  dark: "#0a0a0f",
  cyan: "#00d4ff",
  purple: "#a855f7",
  green: "#00ff88",
};

interface Node {
  x: number;
  y: number;
  size: number;
  color: string;
  connections: number[];
}

// Pre-defined neural network layout
const NODES: Node[] = [
  // Center (CEO)
  { x: 960, y: 540, size: 30, color: COLORS.cyan, connections: [1, 2, 3, 4, 5] },
  // Inner ring (C-Suite)
  { x: 760, y: 400, size: 20, color: COLORS.purple, connections: [6, 7] },
  { x: 1160, y: 400, size: 20, color: COLORS.green, connections: [8, 9] },
  { x: 700, y: 600, size: 20, color: COLORS.purple, connections: [10, 11] },
  { x: 1220, y: 600, size: 20, color: COLORS.green, connections: [12, 13] },
  { x: 960, y: 750, size: 20, color: COLORS.cyan, connections: [14, 15] },
  // Outer ring (Team Leads)
  { x: 500, y: 300, size: 12, color: COLORS.cyan, connections: [] },
  { x: 600, y: 250, size: 12, color: COLORS.purple, connections: [] },
  { x: 1320, y: 250, size: 12, color: COLORS.green, connections: [] },
  { x: 1420, y: 300, size: 12, color: COLORS.cyan, connections: [] },
  { x: 400, y: 550, size: 12, color: COLORS.purple, connections: [] },
  { x: 450, y: 700, size: 12, color: COLORS.green, connections: [] },
  { x: 1470, y: 550, size: 12, color: COLORS.cyan, connections: [] },
  { x: 1520, y: 700, size: 12, color: COLORS.purple, connections: [] },
  { x: 800, y: 880, size: 12, color: COLORS.green, connections: [] },
  { x: 1120, y: 880, size: 12, color: COLORS.cyan, connections: [] },
];

const NeuralNode: React.FC<{
  node: Node;
  index: number;
  frame: number;
  totalFrames: number;
}> = ({ node, index, frame, totalFrames }) => {
  // Breathing animation
  const breathe = Math.sin((frame / 30 + index * 0.5) * Math.PI) * 0.2 + 1;

  // Pulse wave from center
  const waveProgress = (frame % 90) / 90;
  const distFromCenter = Math.sqrt(
    Math.pow(node.x - 960, 2) + Math.pow(node.y - 540, 2)
  );
  const normalizedDist = distFromCenter / 600;
  const isPulsing =
    waveProgress > normalizedDist - 0.1 && waveProgress < normalizedDist + 0.1;
  const pulseIntensity = isPulsing ? 1.5 : 1;

  return (
    <g>
      {/* Glow */}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.size * breathe * pulseIntensity * 2}
        fill={`${node.color}20`}
        filter="blur(10px)"
      />

      {/* Node */}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.size * breathe * pulseIntensity}
        fill={COLORS.dark}
        stroke={node.color}
        strokeWidth={2}
        style={{
          filter: isPulsing ? `drop-shadow(0 0 15px ${node.color})` : undefined,
        }}
      />

      {/* Inner glow */}
      <circle
        cx={node.x}
        cy={node.y}
        r={(node.size * breathe * pulseIntensity) / 2}
        fill={`${node.color}40`}
      />
    </g>
  );
};

const Connection: React.FC<{
  from: Node;
  to: Node;
  frame: number;
  index: number;
}> = ({ from, to, frame, index }) => {
  // Data packet animation
  const packetProgress = ((frame + index * 15) % 60) / 60;
  const packetX = from.x + (to.x - from.x) * packetProgress;
  const packetY = from.y + (to.y - from.y) * packetProgress;

  // Calculate gradient ID
  const gradientId = `gradient-${from.x}-${from.y}-${to.x}-${to.y}`;

  return (
    <g>
      <defs>
        <linearGradient
          id={gradientId}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={from.color} stopOpacity={0.4} />
          <stop offset="100%" stopColor={to.color} stopOpacity={0.4} />
        </linearGradient>
      </defs>

      {/* Connection line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
      />

      {/* Data packet */}
      <circle cx={packetX} cy={packetY} r={4} fill={from.color}>
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
};

export const NeuralPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Overall fade
  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        opacity,
      }}
    >
      {/* Background grid with pulse */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${COLORS.cyan}05 0%, transparent 50%),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 30px 30px, 30px 30px",
        }}
      />

      {/* Neural network SVG */}
      <svg width={1920} height={1080}>
        {/* Connections */}
        {NODES.map((node, i) =>
          node.connections.map((targetIdx) => (
            <Connection
              key={`${i}-${targetIdx}`}
              from={node}
              to={NODES[targetIdx]}
              frame={frame}
              index={i}
            />
          ))
        )}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <NeuralNode
            key={i}
            node={node}
            index={i}
            frame={frame}
            totalFrames={durationInFrames}
          />
        ))}

        {/* Central pulse wave */}
        <circle
          cx={960}
          cy={540}
          r={((frame % 90) / 90) * 600}
          fill="none"
          stroke={COLORS.cyan}
          strokeWidth={2}
          opacity={1 - (frame % 90) / 90}
        />
      </svg>

      {/* Labels */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 14, color: "#71717a", letterSpacing: "0.2em" }}>
          MONOLITH SYSTEM
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: COLORS.cyan,
            marginTop: 8,
          }}
        >
          Neural Agent Network
        </div>
      </div>
    </AbsoluteFill>
  );
};
