"use client";

import Container from "@/components/ui/Container";
import { navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <Container>
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-text-muted">
            &copy; 2026 Cognalith Inc
          </span>
          <nav className="font-sans text-xs text-text-muted">
            {navLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && <span className="mx-2">&middot;</span>}
                <a
                  href={link.href}
                  className="hover:text-amber transition-colors"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
