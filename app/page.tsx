import { Suspense } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import PainSection from "./components/PainSection";
import StatBar from "./components/StatBar";
import Solution from "./components/Solution";
import Process from "./components/Process";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import RefProvider from "./components/RefProvider";
import RefBanner from "./components/RefBanner";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Suspense>
        <RefProvider>
          <RefBanner />
        </RefProvider>
      </Suspense>
      <Nav />
      <main id="main">
        <Hero />
        <PainSection />
        <StatBar />
        <Solution />
        <Process />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
