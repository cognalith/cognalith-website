"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />

      <Container className="relative z-10 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-dark-card border border-accent-cyan/30 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-text-secondary">
              Powered by{" "}
              <span className="text-accent-cyan font-medium">Monolith System</span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            One Founder.
            <br />
            <span className="gradient-text">Infinite Leverage.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            A solo founder running a full software company with 15 AI agents.
            From CEO to DevOps, the Monolith System handles it all—so one person
            can build what used to take entire teams.
          </motion.p>

          {/* The Mantra */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-10"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-text-muted mb-2">The Mantra</p>
            <p className="text-lg sm:text-xl font-medium italic text-white/90">
              &ldquo;Build what you wish existed.{" "}
              <span className="text-accent-cyan">Leave the rest to the machine.</span>&rdquo;
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#contact">
              <Button size="lg">
                Contact Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#portfolio">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-16 border-t border-white/5"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-accent-cyan">99%</div>
              <div className="text-sm text-text-muted mt-1">Time Saved vs Traditional</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-accent-purple">15</div>
              <div className="text-sm text-text-muted mt-1">AI Agents</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-accent-green">12</div>
              <div className="text-sm text-text-muted mt-1">Days to Production</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">1</div>
              <div className="text-sm text-text-muted mt-1">Founder</div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
