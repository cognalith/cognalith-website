"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  isHub: boolean;
  pulsePhase: number;
}

const COLORS = ["#F6AD55", "#DD6B20", "#FEFCBF"];
const HUB_COLORS = ["#FEFCBF", "#F6AD55", "#FBBF24"];

const MOUSE_RADIUS = 200;
const MOUSE_BRIGHTEN_RADIUS = 150;
const CONNECT_DIST = 130;
const HUB_CONNECT_DIST = 200;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles — denser for richer network feel
    const w = window.innerWidth;
    const h = window.innerHeight;
    const particleCount = Math.min(120, Math.floor(w / 12));
    const hubCount = Math.max(3, Math.floor(particleCount / 18));

    particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
      const isHub = i < hubCount;
      const size = isHub
        ? 3.5 + Math.random() * 2.5
        : Math.random() * 1.8 + 0.8;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (isHub ? 0.25 : 0.45),
        vy: (Math.random() - 0.5) * (isHub ? 0.25 : 0.45),
        size,
        baseAlpha: isHub
          ? 0.55 + Math.random() * 0.25
          : 0.15 + Math.random() * 0.35,
        alpha: 0,
        color: isHub
          ? HUB_COLORS[Math.floor(Math.random() * HUB_COLORS.length)]
          : COLORS[Math.floor(Math.random() * COLORS.length)],
        isHub,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mouse = mouseRef.current;
      const time = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      // Update positions and mouse interaction
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Mouse interaction (D)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_BRIGHTEN_RADIUS) {
            // Brighten nodes near cursor
            const influence = 1 - dist / MOUSE_BRIGHTEN_RADIUS;
            p.alpha = Math.min(1, p.baseAlpha + influence * 0.6);

            // Gentle attraction toward cursor
            if (dist > 20 && dist < MOUSE_RADIUS) {
              const pull = (1 - dist / MOUSE_RADIUS) * 0.04;
              p.vx += (dx / dist) * pull;
              p.vy += (dy / dist) * pull;
            }
          } else {
            // Fade back to base alpha
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Hub nodes have a gentle pulse (B)
        if (p.isHub) {
          p.pulsePhase += 0.015;
          p.alpha += Math.sin(p.pulsePhase) * 0.08;
        }

        // Damping for mouse-influenced velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Re-add base drift so they don't stop
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.1;
      });

      // Draw connections first (behind nodes)
      const maxConnectDist = CONNECT_DIST;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const connectDist = p.isHub ? HUB_CONNECT_DIST : maxConnectDist;

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const effectiveDist = Math.max(connectDist, other.isHub ? HUB_CONNECT_DIST : maxConnectDist);

          if (dist < effectiveDist) {
            // Base connection alpha
            let alpha = (1 - dist / effectiveDist) * 0.12;

            // Boost connection if either node is near mouse (D)
            if (mouse.active) {
              const mdx = mouse.x - ((p.x + other.x) / 2);
              const mdy = mouse.y - ((p.y + other.y) / 2);
              const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
              if (mdist < MOUSE_BRIGHTEN_RADIUS) {
                alpha += (1 - mdist / MOUSE_BRIGHTEN_RADIUS) * 0.25;
              }
            }

            // Hub connections are brighter (B)
            if (p.isHub || other.isHub) {
              alpha *= 1.8;
            }

            alpha = Math.min(alpha, 0.5);

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle =
              p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = p.isHub || other.isHub ? 0.7 : 0.4;
            ctx.stroke();
          }
        }
      }

      // Draw nodes (B — with glow for hubs)
      particles.forEach((p) => {
        const drawAlpha = Math.max(0, Math.min(1, p.alpha));

        // Glow for hub nodes (B)
        if (p.isHub) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color + Math.floor(drawAlpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Inner bright core for hubs (B)
        if (p.isHub) {
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFBEB" + Math.floor(drawAlpha * 200).toString(16).padStart(2, "0");
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      timeRef.current++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          active: true,
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh", zIndex: 0 }}
    />
  );
}