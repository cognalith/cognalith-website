import HeroEnhanced from "@/components/sections/HeroEnhanced";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import MonolithSystem from "@/components/sections/MonolithSystem";
import HowItWorks from "@/components/sections/HowItWorks";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <HeroEnhanced />
      <About />
      <Services />
      <MonolithSystem />
      <HowItWorks />
      <Contact />
      <Footer />
    </>
  );
}
