"use client";

import { useState, useEffect } from "react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-dark/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-7 h-7" role="img" aria-label="Cognalith Logo">
              <defs>
                <linearGradient id="nav-stone" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2D3748" />
                  <stop offset="50%" stopColor="#1A202C" />
                  <stop offset="100%" stopColor="#2D3748" />
                </linearGradient>
                <linearGradient id="nav-ember" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#F6AD55" />
                  <stop offset="100%" stopColor="#DD6B20" />
                </linearGradient>
                <linearGradient id="nav-ember2" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#FEFCBF" />
                  <stop offset="100%" stopColor="#F6AD55" />
                </linearGradient>
              </defs>
              <polygon points="100,15 170,50 170,130 100,175 30,130 30,50" fill="url(#nav-stone)" stroke="#4A5568" strokeWidth="1.5" />
              <g stroke="#4A5568" strokeWidth="0.7" fill="none" opacity="0.5">
                <line x1="100" y1="15" x2="100" y2="95" /><line x1="170" y1="50" x2="100" y2="95" /><line x1="30" y1="50" x2="100" y2="95" /><line x1="170" y1="130" x2="100" y2="95" /><line x1="30" y1="130" x2="100" y2="95" />
              </g>
              <polygon points="100,15 170,50 100,95" fill="#374151" opacity="0.6" />
              <polygon points="100,15 30,50 100,95" fill="#4A5568" opacity="0.4" />
              <g transform="translate(100,95)">
                <circle cx="0" cy="0" r="18" fill="url(#nav-ember)" opacity="0.9" />
                <circle cx="0" cy="0" r="12" fill="url(#nav-ember2)" opacity="0.8" />
                <circle cx="0" cy="0" r="6" fill="#FFFBEB" opacity="0.95" />
                <g opacity="0.8">
                  <path d="M-4,-17 C-10,-28 -18,-32 -22,-42 C-24,-47 -28,-49 -32,-50" stroke="#F6AD55" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M4,-17 C12,-26 20,-30 28,-38 C32,-42 36,-43 40,-44" stroke="#F6AD55" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M-17,-2 C-28,2 -34,8 -42,16 C-46,20 -50,24 -52,30" stroke="#F6AD55" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M17,-2 C28,4 35,10 42,18 C46,22 50,26 52,32" stroke="#F6AD55" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M-10,14 C-16,26 -20,36 -18,48 C-17,54 -18,58 -22,62" stroke="#F6AD55" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <path d="M10,14 C16,28 22,38 20,50 C19,56 20,60 24,64" stroke="#F6AD55" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                </g>
                <g fill="#F6AD55">
                  <circle cx="-32" cy="-50" r="3.5" /><circle cx="40" cy="-44" r="3.5" /><circle cx="-52" cy="30" r="3" /><circle cx="52" cy="32" r="3" /><circle cx="-22" cy="62" r="3.5" /><circle cx="24" cy="64" r="3.5" />
                </g>
              </g>
            </svg>
            <span className="font-serif text-lg text-text-primary">Cognalith</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-sans text-sm text-text-secondary transition-colors duration-200 hover:text-amber ${
                  link.label === "Contact"
                    ? "border-b border-amber/40 pb-0.5"
                    : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-1.5 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 pb-5 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-sans text-sm text-text-secondary hover:text-amber transition-colors duration-200 py-2 ${
                  link.label === "Contact"
                    ? "border-b border-amber/40 self-start pb-0.5 mt-1"
                    : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
