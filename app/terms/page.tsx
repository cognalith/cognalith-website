import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Cognalith",
  description: "Terms of Service for Cognalith - AI-powered software development company.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-4xl font-bold mb-8 text-balance">Terms of Service</h1>
            <p className="text-text-secondary mb-4">Last updated: January 23, 2026</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
              <p className="text-text-secondary mb-4">
                By accessing or using cognalith.ca, you agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
                accessing this site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <p className="text-text-secondary mb-4">
                Permission is granted to temporarily access the materials on Cognalith&apos;s website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-text-secondary mb-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Services</h2>
              <p className="text-text-secondary mb-4">
                Cognalith provides AI-powered software development services. All services are provided &quot;as is&quot;
                and &quot;as available&quot; without warranties of any kind, either express or implied.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-text-secondary mb-4">
                In no event shall Cognalith or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Cognalith&apos;s website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Revisions</h2>
              <p className="text-text-secondary mb-4">
                Cognalith may revise these terms of service at any time without notice. By using this website you are
                agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-text-secondary mb-4">
                If you have any questions about these Terms of Service, please contact us at:
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
