"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";

const contentBlocks = [
  {
    title: "12 Days to Production",
    body: "Founded January 5th, 2026. By January 17th: AI dashboard deployed, mobile app in App Store review, full architecture documented. One person.",
  },
  {
    title: "The Entity Agents",
    body: "Not just chatbots. Persistent AI entities with memory, personality, and specialized roles. Alice designs agents. LOIS writes journalism. Aria manages my life.",
  },
  {
    title: "Real Research",
    body: "SATG (Surface-Aware Tool Governance) — a research preprint on runtime authorization for multi-agent systems. Not a blog post. An actual contribution.",
  },
  {
    title: "Shipping Real Products",
    body: "TeeMates — a social golf app — is live in beta at teemates.ca. Lyra, a multi-agent drug discovery system, was built on Microsoft Foundry. Not concepts. Things with users.",
  },
];

function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="story" className="py-32 relative">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Section Label */}
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-amber mb-6">
              THE STORY
            </p>
          </FadeIn>

          {/* Headline */}
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              The<span className="text-amber"> Story</span>
            </h2>
          </FadeIn>

          {/* Amber Divider */}
          <FadeIn>
            <div className="w-12 h-px bg-amber mb-12" />
          </FadeIn>

          {/* Intro Paragraph */}
          <FadeIn>
            <p className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed mb-20">
              Cognalith started as an experiment: what happens when a solo founder
              runs a full software company with AI agents? Not hypothetically —
              actually does it, tracks the results, and builds in public.
            </p>
          </FadeIn>

          {/* Content Blocks */}
          {contentBlocks.map((block, index) => (
            <FadeIn key={block.title} className="mb-16">
              <div className="w-12 h-px bg-amber mb-8" />
              <h3 className="font-serif text-2xl text-text-primary mb-4">
                {block.title}
              </h3>
              <p className="font-sans text-text-secondary leading-relaxed">
                {block.body}
              </p>
            </FadeIn>
          ))}

          {/* Pull Quote */}
          <FadeIn className="my-20">
            <blockquote className="border-l-2 border-amber pl-6">
              <p className="font-serif text-xl md:text-2xl italic text-text-primary leading-relaxed">
                No pitch decks. No fundraising rounds. No team of 50. Just one
                person with the right architecture, building real things and
                proving it works.
              </p>
            </blockquote>
          </FadeIn>

          {/* Mission */}
          <FadeIn>
            <div className="w-12 h-px bg-amber mb-8" />
            <p className="font-sans text-lg text-text-secondary leading-relaxed">
              The thesis is simple: one founder, armed with the right AI
              architecture, can build what used to require entire teams. Cognalith
              is the proof.
            </p>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
