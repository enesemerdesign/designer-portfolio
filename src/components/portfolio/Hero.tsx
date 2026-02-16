"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Play, X } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [showReel, setShowReel] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showReel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showReel]);

  return (
    <>
      <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-[0.08]"
          >
            <source src="/logo-review.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center pt-32 lg:pt-40">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 lg:mb-14"
          >
            <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[#999]">
              Grafik & Web Tasarım — Ankara
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 140 }}
              animate={mounted ? { y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.8rem,8vw,7.5rem)] leading-[1.05] tracking-[-0.02em] text-[#1A1A1A] max-w-[900px]"
            >
              Markanızın görsel{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(90deg, #1A1A1A 0%, #1A1A1A 40%, #555 50%, #1A1A1A 60%, #1A1A1A 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 4s ease-in-out infinite",
                }}
              >hikayesini</span>{" "}
              tasarlıyorum
            </motion.h1>
          </div>

          {/* Description + Play button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 lg:mt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
          >
            <p className="font-sans text-[0.95rem] lg:text-base text-[#777] max-w-[460px] leading-[1.8]">
              Görsel hafıza ve yaratıcılık ile markalara kimlik kazandırıyorum.
              Grafik tasarım, web tasarım ve sosyal medya alanında deneyimli bir yaratıcı.
            </p>

            <button
              onClick={() => setShowReel(true)}
              className="flex items-center gap-5 group self-start lg:self-auto"
            >
              <span className="relative">
                {/* Pulse ring */}
                <span
                  className="absolute inset-0 rounded-full bg-[#1A1A1A]"
                  style={{ animation: "pulse-ring 2s ease-out infinite" }}
                />
                <span className="relative w-[72px] h-[72px] lg:w-[88px] lg:h-[88px] rounded-full bg-[#1A1A1A] text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Play size={20} fill="white" />
                </span>
              </span>
              <span className="font-sans text-[0.75rem] tracking-[0.15em] uppercase text-[#1A1A1A] group-hover:opacity-50 transition-opacity duration-300">
                Showreel 2025
              </span>
            </button>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full pb-10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={mounted ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-px bg-[#E5E5E5] origin-left"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 1.6 }}
            className="mt-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={14} className="text-[#999]" />
              </motion.div>
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999]">Kaydır</span>
            </div>

            <button
              onClick={() => {
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#999] hover:text-[#1A1A1A] transition-colors duration-300"
            >
              Çalışmalarımı keşfet
            </button>
          </motion.div>
        </div>
      </section>

      {/* Reel overlay */}
      <AnimatePresence>
        {showReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="reel-overlay"
            onClick={() => setShowReel(false)}
          >
            <button
              onClick={() => setShowReel(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[90vw] max-w-[1100px] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <video autoPlay controls className="w-full h-full object-cover">
                <source src="/logo-review.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
