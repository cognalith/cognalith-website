"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Cognalith transformed our development process. What used to take our team weeks now happens in days. The AI agents feel like having an entire engineering team on demand.",
    author: "Sarah Chen",
    role: "CTO, TechFlow Solutions",
    avatar: "SC",
    rating: 5,
    color: "#00d4ff",
  },
  {
    id: 2,
    quote:
      "As a solo founder, the Monolith System gave me superpowers. I launched a full SaaS product in 12 days that would have taken months with a traditional team.",
    author: "Marcus Rivera",
    role: "Founder, InvoiceAI",
    avatar: "MR",
    rating: 5,
    color: "#a855f7",
  },
  {
    id: 3,
    quote:
      "The security and compliance features are enterprise-grade. We passed our SOC 2 audit on the first try thanks to the CISO agent's thorough approach.",
    author: "Jennifer Park",
    role: "VP Engineering, SecureData Inc",
    avatar: "JP",
    rating: 5,
    color: "#00ff88",
  },
  {
    id: 4,
    quote:
      "I was skeptical about AI replacing human judgment, but the human-in-the-loop approach means I stay in control while leveraging incredible automation.",
    author: "David Thompson",
    role: "CEO, Nexus Ventures",
    avatar: "DT",
    rating: 5,
    color: "#ffd93d",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance (respect reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-secondary" />

      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 text-accent-cyan/5 pointer-events-none">
        <Quote className="w-64 h-64" />
      </div>
      <div className="absolute bottom-20 right-10 text-accent-purple/5 pointer-events-none rotate-180">
        <Quote className="w-64 h-64" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-green text-sm font-medium tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6 text-balance">
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="bg-dark-card/50 backdrop-blur border border-white/5 rounded-3xl p-8 sm:p-12">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-accent-yellow text-accent-yellow"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl sm:text-2xl text-white leading-relaxed mb-8">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        backgroundColor: `${testimonials[current].color}20`,
                        color: testimonials[current].color,
                      }}
                    >
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonials[current].author}
                      </div>
                      <div className="text-sm text-text-muted">
                        {testimonials[current].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/30 transition-colors transition-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark ${
                    i === current
                      ? "w-8 bg-accent-cyan"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-dark-card border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/30 transition-colors transition-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
