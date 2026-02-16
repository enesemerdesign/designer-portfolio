"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Onboarding from "@/components/onboarding/Onboarding";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Projects from "@/components/portfolio/Projects";
import TextMarquee from "@/components/portfolio/TextMarquee";
import Skills from "@/components/portfolio/Skills";
import Stats from "@/components/portfolio/Stats";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CursorFollower from "@/components/portfolio/CursorFollower";

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
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="text-center overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-[#1A1A1A]/20 mx-auto mb-6 origin-center"
          />
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-serif text-3xl text-[#1A1A1A] mb-1">
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
              <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[#B0B0B0]">
                Grafik & Web Tasarım
              </span>
            </motion.div>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-[#1A1A1A]/20 mx-auto mt-6 origin-center"
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
          className="min-h-screen bg-white"
        >
          <CursorFollower />
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <Projects />
            <TextMarquee />
            <Skills />
            <Stats />
            <About />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
