"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Onboarding from "@/components/onboarding/Onboarding";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CursorFollower from "@/components/portfolio/CursorFollower";
import { AuroraBackground } from "@/components/ui/aurora-background";

// Lazy-load below-fold sections — they aren't needed until the user scrolls
const PageTimeline = dynamic(() => import("@/components/portfolio/PageTimeline"), { ssr: false });
const Projects = dynamic(() => import("@/components/portfolio/Projects"));
const TextMarquee = dynamic(() => import("@/components/portfolio/TextMarquee"));
const Skills = dynamic(() => import("@/components/portfolio/Skills"));
const Stats = dynamic(() => import("@/components/portfolio/Stats"));
const About = dynamic(() => import("@/components/portfolio/About"));
const PricingSection = dynamic(() => import("@/components/portfolio/PricingSection"));
const TestimonialsSection = dynamic(() => import("@/components/portfolio/TestimonialsSection"));
const Contact = dynamic(() => import("@/components/portfolio/Contact"));
const Footer = dynamic(() => import("@/components/portfolio/Footer"));

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    setShowOnboarding(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-alt)] flex items-center justify-center">
        <div className="text-center overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px mx-auto mb-6 origin-center"
            style={{ background: "var(--loading-line)" }}
          />
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-serif text-3xl text-[var(--fg)] mb-1">
                Enes <span className="italic">Emer</span>
              </div>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[var(--fg-faint)]">
                Grafik & Web Tasarım
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px mx-auto mt-6 origin-center"
            style={{ background: "var(--loading-line)" }}
          />
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {showOnboarding ? (
        <motion.div
          key="onboarding"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Onboarding onComplete={handleOnboardingComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-[var(--bg)]"
        >
          <CursorFollower />
          <ScrollProgress />
          <Navbar />

          <main className="relative">
            <Hero />
            <AuroraBackground className="relative">
              <PageTimeline />
              <Projects />
              <TextMarquee />
              <Skills />
              <Stats />
              <About />
              <PricingSection />
              <TestimonialsSection />
              <Contact />
            </AuroraBackground>
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
