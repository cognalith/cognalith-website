"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  role: string;
  color: string;
  size: number;
  connections: string[];
}

const AGENT_ROLES = [
  { role: "CEO", color: "#00d4ff", tier: 0 },
  { role: "CTO", color: "#a855f7", tier: 1 },
  { role: "CFO", color: "#00ff88", tier: 1 },
  { role: "COO", color: "#ff6b6b", tier: 1 },
  { role: "CMO", color: "#ffd93d", tier: 1 },
  { role: "CHRO", color: "#4ecdc4", tier: 1 },
  { role: "DevOps", color: "#a855f7", tier: 2 },
  { role: "SWE", color: "#00d4ff", tier: 2 },
  { role: "QA", color: "#00ff88", tier: 2 },
  { role: "Data", color: "#ff6b6b", tier: 2 },
  { role: "CoS", color: "#ffd93d", tier: 2 },
  { role: "Security", color: "#4ecdc4", tier: 2 },
];

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize nodes
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const padding = 80;

    const initialNodes: Node[] = AGENT_ROLES.map((agent, i) => {
      if (agent.tier === 0) {
        // CEO starts randomly in center area
        return {
          id: agent.role,
          x: centerX + (Math.random() - 0.5) * (width * 0.3),
          y: centerY + (Math.random() - 0.5) * (height * 0.3),
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          role: agent.role,
          color: agent.color,
          size: 24,
          connections: [],
        };
      } else {
        // Other agents spread evenly across the screen
        const availableWidth = width - (padding * 2);
        const availableHeight = height - (padding * 2);
        
        // Calculate grid-like distribution but with some randomness
        const cols = Math.ceil(Math.sqrt(AGENT_ROLES.length - 1));
        const row = Math.floor((i - 1) / cols);
        const col = (i - 1) % cols;
        
        const gridX = padding + (col / (cols - 1)) * availableWidth;
        const gridY = padding + (row / (Math.ceil((AGENT_ROLES.length - 1) / cols) - 1)) * availableHeight;
        
        // Add randomness to break perfect grid
        const randomOffset = 60;
        
        return {
          id: agent.role,
          x: gridX + (Math.random() - 0.5) * randomOffset,
          y: gridY + (Math.random() - 0.5) * randomOffset,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          role: agent.role,
          color: agent.color,
          size: agent.tier === 1 ? 16 : 12,
          connections: [],
        };
      }
    });

    // Create connections based on hierarchy
    initialNodes[0].connections = ["CTO", "CFO", "COO", "CMO", "CHRO"]; // CEO connects to C-suite
    initialNodes.slice(1, 6).forEach((node) => {
      node.connections = initialNodes.slice(6).map((n) => n.id).slice(0, 2);
    });

    setNodes(initialNodes);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const ceoNode = initialNodes.find(n => n.id === "CEO");
      const otherNodes = initialNodes.filter(n => n.id !== "CEO");

      // CEO moves randomly across the screen (slower)
      if (ceoNode) {
        // Random walk for CEO - much slower
        ceoNode.vx += (Math.random() - 0.5) * 0.05;
        ceoNode.vy += (Math.random() - 0.5) * 0.05;
        
        // Limit CEO velocity - reduced max speed
        const maxSpeed = 0.4;
        const speed = Math.sqrt(ceoNode.vx * ceoNode.vx + ceoNode.vy * ceoNode.vy);
        if (speed > maxSpeed) {
          ceoNode.vx = (ceoNode.vx / speed) * maxSpeed;
          ceoNode.vy = (ceoNode.vy / speed) * maxSpeed;
        }
        
        ceoNode.x += ceoNode.vx;
        ceoNode.y += ceoNode.vy;
        
        // Bounce CEO off edges
        const padding = 60;
        if (ceoNode.x < padding || ceoNode.x > canvas.offsetWidth - padding) {
          ceoNode.vx *= -0.8;
          ceoNode.x = Math.max(padding, Math.min(canvas.offsetWidth - padding, ceoNode.x));
        }
        if (ceoNode.y < padding || ceoNode.y > canvas.offsetHeight - padding) {
          ceoNode.vy *= -0.8;
          ceoNode.y = Math.max(padding, Math.min(canvas.offsetHeight - padding, ceoNode.y));
        }
      }

      // Other nodes move in structured patterns around their connections (slower and more spread out)
      otherNodes.forEach((node) => {
        // Find connected nodes
        const connectedNodes = node.connections
          .map(id => initialNodes.find(n => n.id === id))
          .filter(Boolean) as Node[];

        if (connectedNodes.length > 0) {
          // Calculate center of connected nodes
          const centerX = connectedNodes.reduce((sum, n) => sum + n.x, 0) / connectedNodes.length;
          const centerY = connectedNodes.reduce((sum, n) => sum + n.y, 0) / connectedNodes.length;
          
          // Orbit around the center of connections - slower
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Desired distance from center - increased for more spacing
          const desiredDist = 180;
          if (dist > 0) {
            const force = (dist - desiredDist) * 0.008; // Reduced force for slower movement
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
          
          // Perpendicular force for orbital motion - slower
          const perpX = -dy;
          const perpY = dx;
          const perpDist = Math.sqrt(perpX * perpX + perpY * perpY);
          if (perpDist > 0) {
            const orbitalSpeed = 0.08; // Much slower orbital speed
            node.vx += (perpX / perpDist) * orbitalSpeed;
            node.vy += (perpY / perpDist) * orbitalSpeed;
          }
        } else {
          // If no connections, gentle floating motion - slower
          node.vx += Math.sin(time * 0.0005 + node.x * 0.01) * 0.02;
          node.vy += Math.cos(time * 0.0005 + node.y * 0.01) * 0.02;
        }

        // Strong repulsion from other nodes to keep them spread apart
        initialNodes.forEach((other) => {
          if (other.id === node.id) return;
          
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Increased minimum distance for better spacing
          const minDist = node.size + other.size + 100;
          
          if (dist < minDist && dist > 0) {
            // Stronger repulsion force
            const force = (minDist - dist) / minDist * 1.2;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        });

        // Apply velocity with stronger damping for slower movement
        node.vx *= 0.92;
        node.vy *= 0.92;
        
        node.x += node.vx;
        node.y += node.vy;

        // Keep in bounds with soft boundaries
        const padding = 60;
        if (node.x < padding) {
          node.x = padding;
          node.vx *= -0.5;
        }
        if (node.x > canvas.offsetWidth - padding) {
          node.x = canvas.offsetWidth - padding;
          node.vx *= -0.5;
        }
        if (node.y < padding) {
          node.y = padding;
          node.vy *= -0.5;
        }
        if (node.y > canvas.offsetHeight - padding) {
          node.y = canvas.offsetHeight - padding;
          node.vy *= -0.5;
        }
      });

      // Draw connections
      initialNodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = initialNodes.find((n) => n.id === targetId);
          if (!target) return;

          const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
          gradient.addColorStop(0, node.color + "40");
          gradient.addColorStop(1, target.color + "40");

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Animated pulse along connection
          const pulseProgress = (time * 0.002) % 1;
          const pulseX = node.x + (target.x - node.x) * pulseProgress;
          const pulseY = node.y + (target.y - node.y) * pulseProgress;

          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        });
      });

      // Draw nodes
      initialNodes.forEach((node) => {
        // Glow effect
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * 2
        );
        glowGradient.addColorStop(0, node.color + "60");
        glowGradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = "#0a0a0f";
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.font = `${node.size > 16 ? 11 : 9}px Inter, sans-serif`;
        ctx.fillStyle = node.color;
        ctx.textAlign = "center";
        ctx.fillText(node.role, node.x, node.y + node.size + 14);
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
      <div className="absolute bottom-4 left-4 text-xs text-text-muted">
        <span className="text-accent-cyan">●</span> Move cursor to interact
      </div>
    </div>
  );
}
