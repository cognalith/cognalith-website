"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.01 } : undefined}
      className={`bg-dark-card border border-white/5 rounded-xl p-6 transition-all duration-300 ${
        hover ? "hover:border-accent-cyan/30 hover:shadow-lg hover:shadow-accent-cyan/5" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
