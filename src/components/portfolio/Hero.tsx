"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Play, X } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    // Safely autoplay background video — catch the interrupted play() promise
    const video = bgVideoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
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
      <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[var(--bg-alt)]">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={bgVideoRef}
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-[0.04]"
          >
            <source src="/logo-review.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Large decorative index number */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[15%] right-[-5%] lg:right-[5%] pointer-events-none select-none z-[1]"
        >
          <span className="font-serif text-[35vw] lg:text-[25rem] text-[var(--watermark)] italic leading-none block">
            E
          </span>
        </motion.div>

        {/* Animated gradient orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(circle, var(--gradient-orb) 0%, transparent 70%)",
          }}
        />

        {/* Main content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center pt-32 lg:pt-40">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 lg:mb-12"
          >
            <span className="inline-flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[var(--fg-muted)] bg-[var(--bg)] border border-[var(--border)] px-5 py-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Yeni projeler için müsait
            </span>
          </motion.div>

          {/* Headline - dramatic staggered reveal */}
          <div className="mb-6">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={mounted ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[var(--fg-faint)] block mb-6">
                  Grafik & Web Tasarım — Ankara
                </span>
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={mounted ? { y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-[-0.03em] text-[var(--fg)]"
              >
                Markanızın
              </motion.h1>
            </div>
            <div className="overflow-hidden pb-3 pl-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={mounted ? { y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[1.1] tracking-[-0.03em] italic"
                style={{
                  background: "linear-gradient(135deg, var(--fg) 0%, var(--fg-mid) 50%, var(--fg) 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 4s ease-in-out infinite",
                }}
              >
                <Typewriter
                  text={[
                    "görsel hikayesini",
                    "dijital kimliğini",
                    "marka deneyimini",
                    "yaratıcı vizyonunu",
                  ]}
                  speed={80}
                  deleteSpeed={40}
                  waitTime={2500}
                  initialDelay={2000}
                  loop
                  cursorChar="|"
                  cursorClassName="ml-1 font-light"
                />
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={mounted ? { y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3rem,9vw,8rem)] leading-[0.95] tracking-[-0.03em] text-[var(--fg)]"
              >
                tasarlıyorum<span className="text-[var(--fg-faint)]">.</span>
              </motion.h1>
            </div>
          </div>

          {/* Description + Play button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 lg:mt-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
          >
            <div className="max-w-[480px]">
              <p className="font-sans text-base text-[var(--fg-dim)] leading-[1.9]">
                Görsel hafıza ve yaratıcılık ile markalara kimlik kazandırıyorum.
                <span className="text-[var(--fg)] font-medium"> 5+ yıl deneyim</span> ile
                grafik tasarım, web tasarım ve sosyal medya alanında çalışıyorum.
              </p>
            </div>

            <button
              onClick={() => setShowReel(true)}
              className="flex items-center gap-6 group self-start lg:self-auto"
            >
              <span className="relative">
                <span
                  className="absolute inset-0 rounded-full bg-[var(--accent)]"
                  style={{ animation: "pulse-ring 2s ease-out infinite" }}
                />
                <span className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-[var(--accent)] text-[var(--accent-fg)] flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent-hover)] transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                  <Play size={22} fill="currentColor" />
                </span>
              </span>
              <div className="text-left">
                <span className="block font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[var(--fg-faint)]">
                  Showreel
                </span>
                <span className="block font-serif text-lg text-[var(--fg)] italic">
                  2025
                </span>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full pb-10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={mounted ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-px bg-[var(--border-hero)] origin-left"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 1.8 }}
            className="mt-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown size={14} className="text-[var(--fg-muted)]" />
              </motion.div>
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[var(--fg-muted)]">Kaydır</span>
            </div>

            <button
              onClick={() => {
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-300 group"
            >
              Çalışmalarımı keşfet
              <span className="absolute -bottom-1 left-0 w-full h-px bg-[var(--fg)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
              className="w-[90vw] max-w-[1100px] aspect-video rounded-2xl overflow-hidden"
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
