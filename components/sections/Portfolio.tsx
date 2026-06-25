"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
// import { projects } from "@/lib/data"; // Removed - section no longer in use
const projects: { name: string; description: string; tags: string[]; color: string }[] = [];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 relative">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Applications built by Cognalith, powered by the Monolith System. Each
            project showcases the power of AI-driven development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-dark-card border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-transform transition-shadow duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-cyan/10">
                {/* Project Visual - Gradient Mesh */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />
                  {/* Animated gradient mesh overlay */}
                  <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
                  </div>
                  {/* Project initial as overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors font-display">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-cyan transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-dark-tertiary text-text-muted text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Projects Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-text-muted">
            And many more projects in development...
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
