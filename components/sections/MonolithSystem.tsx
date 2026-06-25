"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import { forgeTechnologies, neuralStackLayers } from "@/lib/data";

export default function MonolithSystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="forge" className="py-24 relative">
      <Container>
        <div className="max-w-3xl mx-auto" ref={ref}>
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-amber-400">
              THE FORGE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mt-4"
          >
            <span className="text-white">The Technology</span>{" "}
            <span className="text-amber-400">Under the Hood</span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="origin-left w-16 h-px bg-amber-400 mt-6"
          />

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-text-secondary text-lg mt-6 leading-relaxed"
          >
            Three systems that make everything else possible. Built from scratch,
            documented in public, used every day.
          </motion.p>

          {/* Technologies — vertical list */}
          <div className="mt-16">
            {forgeTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`py-8 ${
                  index < forgeTechnologies.length - 1
                    ? "border-b border-white/5"
                    : ""
                }`}
              >
                <h3 className="font-serif text-2xl text-white">
                  {tech.name}
                </h3>
                <p className="font-mono text-xs text-amber-400 mt-1">
                  {tech.tagline}
                </p>
                <p className="font-sans text-text-secondary mt-3 leading-relaxed">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Neural Stack Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16"
          >
            <h3 className="font-serif text-xl text-white mb-8">
              Neural Stack Architecture
            </h3>

            <div className="space-y-5">
              {neuralStackLayers.map((layer, index) => (
                <motion.div
                  key={layer.level}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <span className="font-mono text-xs bg-amber-400/15 text-amber-400 px-2 py-0.5 rounded mt-0.5 shrink-0">
                    {layer.level}
                  </span>
                  <div>
                    <p className="font-sans font-medium text-text-primary">
                      {layer.name}
                    </p>
                    <p className="font-sans text-sm text-text-secondary mt-0.5">
                      {layer.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="font-sans text-sm text-text-muted italic mt-8"
            >
              Each agent operates through all 4 layers, with L4 providing
              human-in-the-loop validation
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
