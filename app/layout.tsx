import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/animations/ParticleField";

export const metadata: Metadata = {
  metadataBase: new URL("https://cognalith.ca"),
  title: "Cognalith | Building with AI.",
  description:
    "Frank Tinana — solo founder building software with AI agents. The Monolith System, entity agents, and real products. Documented in public.",
  keywords: [
    "AI software development",
    "solo founder",
    "AI agents",
    "Monolith System",
    "entity agents",
    "multi-agent AI",
    "building in public",
  ],
  authors: [{ name: "Frank Tinana" }],
  creator: "Cognalith",
  publisher: "Cognalith",
  alternates: {
    canonical: "https://cognalith.ca",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Cognalith | Building with AI.",
    description:
      "Frank Tinana — solo founder building software with AI agents. Documented in public.",
    url: "https://cognalith.ca",
    siteName: "Cognalith",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cognalith - Building with AI.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognalith | Building with AI.",
    description:
      "Frank Tinana — solo founder building software with AI agents.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Schema for Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cognalith.ca/#organization",
  name: "Cognalith Inc",
  legalName: "Cognalith Inc",
  url: "https://cognalith.ca",
  logo: "https://cognalith.ca/favicon.svg",
  image: "https://cognalith.ca/og-image.png",
  description:
    "Solo founder building software with AI agents. The Monolith System, entity agents, and real products.",
  email: "frank@cognalith.ca",
  foundingDate: "2026-01-05",
  contactPoint: {
    "@type": "ContactPoint",
    email: "frank@cognalith.ca",
    contactType: "General",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://github.com/cognalith",
    "https://www.linkedin.com/in/franktinana",
    "https://x.com/franktinana",
  ],
  founder: {
    "@type": "Person",
    name: "Frank Tinana",
    jobTitle: "Founder & CEO",
  },
  knowsAbout: [
    "AI Software Development",
    "Multi-Agent AI Systems",
    "Autonomous AI Workflows",
    "Software Engineering",
    "Startup Development",
  ],
  slogan: "Building with AI.",
  areaServed: "Worldwide",
  serviceType: "Software Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-dark">
        {/* Neural network background — fixed, behind all content */}
        <ParticleField />
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-cyan focus:text-dark focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
