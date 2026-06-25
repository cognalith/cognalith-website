"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function HeroEnhanced() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full">
        <Container>
          <div className="flex flex-col items-center text-center py-32">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-6xl md:text-8xl text-white tracking-tight"
            >
              Cognalith
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif italic text-amber-400 text-3xl md:text-5xl mt-4"
            >
              Building with AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-12 h-px bg-amber-400 mx-auto my-8"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-sans text-lg text-text-secondary max-w-lg mx-auto text-center leading-relaxed"
            >
              Solo founder. Software builder. Running a full company with AI
              agents — and sharing every step.
            </motion.p>

            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex items-center gap-3 font-mono text-sm"
            >
              <a
                href="#building"
                className="text-white/70 hover:text-white transition-colors"
              >
                See what I&apos;m building &darr;
              </a>
              <span className="text-white/30">/</span>
              <a
                href="#contact"
                className="text-white/70 hover:text-white transition-colors"
              >
                Get in touch
              </a>
            </motion.nav>
          </div>
        </Container>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-8 bg-white/20" />
      </motion.div>
    </section>
  );
}
