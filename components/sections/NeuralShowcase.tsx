"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { campusAgents } from "@/lib/data";

export default function NeuralShowcase() {
  return (
    <section id="campus" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark-tertiary/90 to-dark/95" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block font-mono text-xs tracking-[0.2em] uppercase text-amber-400"
          >
            THE CAMPUS
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mt-4"
          >
            <span className="text-white">Agents That</span>{" "}
            <span className="text-amber-400">Live Here</span>
          </motion.h2>

          {/* Thin amber divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-px bg-amber-400/40 mt-6 mb-6 origin-left"
          />

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-text-secondary text-lg leading-relaxed mb-12"
          >
            The Cognalith Campus isn&apos;t a team of chatbots. These are
            persistent entity agents — each with their own memory, voice, and
            purpose.
          </motion.p>

          {/* Agent list */}
          <div>
            {campusAgents.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                className="border-b border-white/5 py-6"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="text-amber-400 text-sm select-none">
                    —
                  </span>
                  <h3 className="font-serif text-2xl text-white">
                    {agent.name}
                  </h3>
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-wider">
                    {agent.role}
                  </span>
                </div>
                <p className="text-text-secondary text-sm pl-7">
                  {agent.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom stats line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="font-mono text-xs text-text-muted mt-10"
          >
            6 entities · 24/7 persistent · BAMS memory
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
