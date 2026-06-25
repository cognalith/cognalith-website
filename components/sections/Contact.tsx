"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-amber">
            CONTACT
          </span>

          <h2 className="font-serif text-4xl md:text-6xl mt-4 mb-6">
            Let&apos;s <span className="text-amber">Connect</span>
          </h2>

          <div className="w-12 h-px bg-amber mx-auto mb-8" />

          <p className="font-sans text-text-secondary mb-8">
            I read every message. Whether you&apos;re interested in the tech,
            want to collaborate, or just want to talk AI.
          </p>

          <a
            href="mailto:frank@cognalith.ca"
            className="font-serif text-2xl text-amber hover:text-amber-light transition-colors"
          >
            frank@cognalith.ca
          </a>

          <form onSubmit={handleSubmit} className="mt-12 space-y-8 text-left">
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs text-text-muted uppercase mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-amber focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs text-text-muted uppercase mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-amber focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs text-text-muted uppercase mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-amber focus:outline-none transition-colors resize-none"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="px-8 py-3 bg-amber text-dark-bg font-sans font-medium hover:bg-amber-light transition-colors disabled:opacity-50"
            >
              {isSubmitting
                ? "Sending..."
                : isSubmitted
                  ? "Message Sent!"
                  : "Send Message"}
            </button>

            {isSubmitted && (
              <p className="text-text-secondary text-sm">
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
