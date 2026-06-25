"use client";

import { motion } from "framer-motion";

export default function FloatingMonolith() {
  return (
    <div className="relative w-64 h-96 perspective-1000">
      {/* Main Monolith */}
      <motion.div
        animate={{
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [-2, 2, -2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front face */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-dark-card to-dark border border-accent-cyan/30"
          style={{
            transform: "translateZ(20px)",
            boxShadow: "0 0 60px rgba(0, 212, 255, 0.3), inset 0 0 40px rgba(0, 212, 255, 0.1)",
          }}
        >
          {/* Glowing lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
                style={{ top: `${15 + i * 15}%` }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Center glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.span
              className="text-2xl font-bold tracking-wider text-accent-cyan"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              M
            </motion.span>
          </div>
        </div>

        {/* Right face */}
        <div
          className="absolute top-0 right-0 w-10 h-full bg-dark-secondary border-r border-y border-accent-purple/20"
          style={{
            transform: "rotateY(90deg) translateZ(10px)",
            transformOrigin: "left",
          }}
        />

        {/* Left face */}
        <div
          className="absolute top-0 left-0 w-10 h-full bg-dark-tertiary border-l border-y border-accent-cyan/20"
          style={{
            transform: "rotateY(-90deg) translateZ(10px)",
            transformOrigin: "right",
          }}
        />

        {/* Top face */}
        <div
          className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-accent-cyan/10 to-dark-card border border-accent-cyan/30"
          style={{
            transform: "rotateX(90deg) translateZ(10px)",
            transformOrigin: "bottom",
          }}
        />
      </motion.div>

      {/* Shadow/Reflection */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-16 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.2) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Floating particles around monolith */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent-cyan"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
