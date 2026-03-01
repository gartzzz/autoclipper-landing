import Nav from "./components/Nav";
import Hero from "./components/Hero";
import PainSection from "./components/PainSection";
import StatBar from "./components/StatBar";
import Solution from "./components/Solution";
import Process from "./components/Process";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main id="main">
        <Hero />
        <PainSection />
        <StatBar />
        <Solution />
        <Process />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
