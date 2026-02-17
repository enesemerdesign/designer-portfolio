"use client";

import { useRef } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { GraduationCap, Languages, MapPin, Briefcase, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const Logo3D = dynamic(() => import("@/components/portfolio/Logo3D"), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3]" />,
});

export default function About() {
  const ref = useRef(null);
  const parallaxRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="about" className="py-32 lg:py-48 relative overflow-hidden" ref={ref}>
      {/* Large decorative watermark */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-10 right-0 pointer-events-none select-none"
      >
        <motion.span
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[20vw] lg:text-[16rem] text-[var(--card-number)] italic leading-none block"
        >
          03
        </motion.span>
      </motion.div>

      {/* 3D Logo background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-[20%] w-[80vw] lg:w-[60vw] max-w-[900px] aspect-square pointer-events-none z-0"
      >
        <Logo3D className="w-full h-full" />
      </motion.div>

      <div className="container-section relative" ref={parallaxRef}>

        {/* Label */}
        <div className="flex items-center gap-6 mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            03 — Hakkımda
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 divider origin-left"
          />
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-16 lg:mb-20">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="section-title xl:!text-7xl leading-[1.1]"
            >
              Merhaba, ben
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="section-title xl:!text-7xl leading-[1.1]"
            >
              <span className="italic gradient-text">
                Enes Emer
              </span>
              <span className="text-[var(--fg-faint)]">.</span>
            </motion.h2>
          </div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* Large bio card - spans 7 columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 group"
          >
            <div className="card-base card-base-lg card-border-glow">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles size={16} className="text-[var(--fg-ghost)]" />
                <span className="card-label !mb-0">Hakkımda</span>
              </div>

              <p className="font-sans text-base lg:text-lg text-[var(--fg-secondary)] leading-[2] mb-6">
                2001 doğumlu, Ankara merkezli bir{" "}
                <span className="text-[var(--fg)] font-medium">grafik tasarımcıyım</span>.{" "}
                Necmettin Erbakan Üniversitesi Yönetim Bilişim Sistemleri bölümünden{" "}
                <span className="text-[var(--fg)] font-medium">2025</span> yılında mezun oldum.
              </p>
              <p className="font-sans text-base lg:text-lg text-[var(--fg-secondary)] leading-[2]">
                Kariyer hedefim, <span className="text-[var(--fg)] font-medium">görsel hafıza ve yaratıcılık</span> gibi
                yeteneklerimi kullanarak tasarım alanında başarılı bir şekilde katkı sağlamaktır.
                Her projede <span className="text-[var(--fg)] font-medium">estetik ve işlevselliğin</span> mükemmel
                dengesini bulmaya çalışırım.
              </p>
            </div>
          </motion.div>

          {/* Right column - 5 cols, two stacked cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:gap-5">
            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group flex-1"
            >
              <div className="card-base card-border-glow relative">
                <span className="card-number">01</span>

                <motion.div
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="icon-box mb-5"
                >
                  <GraduationCap size={18} strokeWidth={1.5} />
                </motion.div>
                <span className="card-label">Eğitim</span>
                <span className="block font-serif text-xl text-[var(--fg)] leading-snug mb-1">Necmettin Erbakan Ünv.</span>
                <span className="block font-sans text-sm text-[var(--fg-faint)]">Yönetim Bilişim Sistemleri</span>
              </div>
            </motion.div>

            {/* Experience card - stays dark in both modes */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group flex-1"
            >
              <div className="bg-[#1A1A1A] rounded-3xl p-8 lg:p-10 h-full hover:bg-[#222] hover:shadow-[0_24px_64px_rgba(0,0,0,0.2)] transition-all duration-700 relative overflow-hidden">
                <span className="absolute top-4 right-5 font-sans text-[3rem] font-extralight text-white/[0.06] leading-none">02</span>

                <motion.div
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-white group-hover:text-[#1A1A1A] transition-all duration-500 mb-5"
                >
                  <Briefcase size={18} strokeWidth={1.5} />
                </motion.div>
                <span className="block font-sans text-[0.6rem] tracking-[0.25em] uppercase text-white/30 mb-2">Deneyim</span>
                <span className="block font-serif text-3xl text-white italic leading-snug mb-1">5+ Yıl</span>
                <span className="block font-sans text-sm text-white/40">Grafik & Web Tasarım</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom row - two equal cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 group"
          >
            <div className="card-base card-border-glow relative">
              <span className="card-number">03</span>

              <div className="flex items-start gap-6">
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="icon-box"
                >
                  <Languages size={18} strokeWidth={1.5} />
                </motion.div>
                <div>
                  <span className="card-label">Diller</span>
                  <span className="block font-serif text-xl text-[var(--fg)] leading-snug mb-1">Türkçe & İngilizce</span>
                  <span className="block font-sans text-sm text-[var(--fg-faint)]">Ana Dil / B1 Seviye</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="lg:col-span-6 group"
          >
            <div className="card-base card-border-glow relative">
              <span className="card-number">04</span>

              <div className="flex items-start gap-6">
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="icon-box"
                >
                  <MapPin size={18} strokeWidth={1.5} />
                </motion.div>
                <div>
                  <span className="card-label">Lokasyon</span>
                  <span className="block font-serif text-xl text-[var(--fg)] leading-snug mb-1">Ankara</span>
                  <span className="block font-sans text-sm text-[var(--fg-faint)]">Türkiye</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
