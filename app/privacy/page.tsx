import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Cognalith",
  description: "Privacy Policy for Cognalith - AI-powered software development company.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-4xl font-bold mb-8 text-balance">Privacy Policy</h1>
            <p className="text-text-secondary mb-4">Last updated: January 23, 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-text-secondary mb-4">
                Cognalith (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
                our website cognalith.ca.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <p className="text-text-secondary mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
                <li>Contact us through our contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request information about our services</li>
              </ul>
              <p className="text-text-secondary mb-4">
                This information may include your name, email address, company name, and any message you send us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-text-secondary mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you newsletters and updates (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-text-secondary mb-4">
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="text-text-secondary mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-text-secondary mb-4">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-accent-cyan">
                <a href="mailto:hello@cognalith.ca" className="hover:underline">
                  hello@cognalith.ca
                </a>
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
