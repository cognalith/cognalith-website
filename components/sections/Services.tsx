"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { products, gauntletRoadmap } from "@/lib/data";

export default function Services() {
  return (
    <section id="building" className="py-32 relative">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-amber-400">
              WHAT WE&apos;RE BUILDING
            </span>

            <h2 className="font-serif text-4xl md:text-6xl mt-4 mb-6">
              What We&apos;re
              <span className="text-amber-400"> Building</span>
            </h2>

            {/* Thin amber divider */}
            <div className="w-16 h-px bg-amber-400 mb-6" />

            <p className="font-sans text-text-secondary text-lg mb-16">
              Real products. Not concepts — things with code, users, and
              deadlines.
            </p>
          </motion.div>

          {/* Products — editorial list */}
          <div>
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="py-8 border-b border-white/5"
              >
                <h3 className="font-serif text-3xl text-white mb-2">
                  {product.name}
                </h3>
                <span className="font-mono text-xs text-amber-400">
                  {product.status}
                </span>
                <p className="font-sans text-text-secondary text-lg mt-3 mb-4">
                  {product.description}
                </p>
                <p className="font-mono text-xs text-text-muted">
                  {product.tags.join(" · ")}
                </p>
              </motion.div>
            ))}
          </div>

          {/* The Gauntlet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 border-t border-b border-amber-400/30 py-8"
          >
            <h3 className="font-serif text-2xl text-white mb-2">
              The Gauntlet
            </h3>
            <p className="font-sans text-text-secondary mb-4">
              The product roadmap.
            </p>
            <p className="font-mono text-sm text-amber-400">
              {gauntletRoadmap.map((item) => item.name).join(" → ")}
            </p>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <p className="font-sans text-text-secondary">
              Interested in collaborating?{" "}
              <a
                href="#contact"
                className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-4"
              >
                Get in touch
              </a>
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
