"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import { timeline } from "@/lib/data";

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="py-24 relative">
      <Container>
        <div ref={ref} className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-amber mb-4">
              TIMELINE
            </p>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">
              Building in<span className="text-amber"> Public</span>
            </h2>
            <div className="w-12 h-px bg-amber mb-6" />
            <p className="text-text-secondary text-base max-w-xl">
              No stealth mode. Every milestone documented, every decision shared.
            </p>
          </motion.div>

          {/* Timeline entries */}
          <div>
            {timeline.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                className="py-6 border-b border-white/5 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-8"
              >
                <p className="font-mono text-sm text-amber">
                  {entry.date}
                </p>
                <div>
                  <h3 className="font-serif text-xl text-text-primary mb-1">
                    {entry.title}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
