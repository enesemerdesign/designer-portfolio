"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform, useScroll } from "framer-motion";
import { GraduationCap, Languages, MapPin, Briefcase, ArrowUpRight, Calendar } from "lucide-react";
import dynamic from "next/dynamic";

const Logo3D = dynamic(() => import("@/components/portfolio/Logo3D"), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3]" />,
});

const LOGO_FULL = "M607.65,339.48c0,190.36,170.26,339.48,388.84,339.48h5.39s-43.33-75-43.33-75c-3.09-5.35-3.09-11.95,0-17.3l43.33-75h-1.92s-3.47-.15-3.47-.15c-114.32,0-203.21-75.74-203.21-172.03,0-98.65,88.9-172.18,203.21-172.18h86.38s216.15,385.44,216.15,385.44c50.77,91.71,154.89,149.12,269.35,149.12h48.18c213.56,0,388.84-158.36,388.84-350.93C2005.39,158.21,1830.11,0,1616.55,0h-620.06c-218.58,0-388.84,148.97-388.84,339.48ZM1616.55,167.3c111.8,0,203.36,82.62,203.36,183.63,0,100.79-91.56,183.48-203.36,183.48h-48.18c-43.3,0-83.87-22.91-104.27-57.42l-172.77-309.7h325.22ZM1008.9,511.66h-5.39s43.33,75,43.33,75c3.09,5.35,3.09,11.95,0,17.3l-43.33,75h.96s4.43.15,4.43.15c114.32,0,203.21,75.6,203.21,172.03,0,98.65-88.9,172.03-203.21,172.03h-86.38s-216.15-385.44-216.15-385.44c-50.77-91.7-154.89-149.12-269.35-149.12h-48.33C175.28,488.6,0,646.96,0,839.68c0,192.57,175.28,350.93,388.69,350.93h620.21c218.44,0,388.69-149.12,388.69-339.48,0-190.36-170.26-339.48-388.69-339.48ZM388.69,1023.17c-111.8,0-203.21-82.62-203.21-183.48,0-100.94,91.41-183.63,203.21-183.63h48.33c43.3,0,83.87,23.06,104.27,57.42l172.77,309.7h-325.36Z";

const experience = [
  {
    period: "Ağustos 2025 — Şubat 2026",
    role: "Grafik Tasarım & Sosyal Medya",
    company: "UDY Digital",
    location: "Ankara",
    description:
      "Dijital pazarlama ajansında grafik tasarım ve sosyal medya içerik üretimi çalışmaları yürüttüm.",
    initial: "U",
  },
  {
    period: "Ağustos 2025 — Şubat 2026",
    role: "Grafik Tasarım & Sosyal Medya",
    company: "Gurbet Haber",
    location: "Ankara",
    description:
      "Haber portalı için görsel içerik üretimi, sosyal medya tasarımları ve marka kimliği çalışmaları gerçekleştirdim.",
    initial: "G",
  },
  {
    period: "Kasım 2023 — Mayıs 2024",
    role: "Grafik Tasarım & Sosyal Medya",
    company: "Clb Yazılım Danışmanlık",
    location: "Sakarya",
    description:
      "Müşterilerin taleplerine göre broşür, katalog ve afiş tasarımları ile sosyal medya hesapları için tasarım ve yönetimi gerçekleştirdim.",
    initial: "C",
  },
  {
    period: "Mayıs — Eylül 2023",
    role: "Web Sitesi & Grafik Tasarım",
    company: "Fıkrıba Creative Agency",
    location: "Karaman",
    description:
      "Ajansın müşterilerine özel web siteleri için slider, ikon görseller ve ürün görselleri hazırlayarak görsel içerik üretimi yaptım.",
    initial: "F",
  },
  {
    period: "Ekim 2022 — Ocak 2023",
    role: "Bölüm Tasarımı (Level Design)",
    company: "Rubik Games",
    location: "Konya",
    description:
      "Şirket oyunları için UI-UX ve diğer ekip arkadaşlarımın hazırlamış olduğu modelleri ve kodları kullanıp bölüm tasarımları hazırladım.",
    initial: "R",
  },
  {
    period: "2021 — Günümüz",
    role: "Freelance Grafik & Web Tasarımcı",
    company: "Freelance",
    location: "Ankara",
    description:
      "Bağımsız olarak çeşitli markalar ve işletmeler için grafik tasarım, web tasarım ve sosyal medya yönetimi hizmetleri sunuyorum.",
    initial: "F",
  },
];

const facts = [
  { icon: GraduationCap, label: "Eğitim", value: "Necmettin Erbakan Üniversitesi", sub: "Yönetim Bilişim Sistemleri", num: "01" },
  { icon: Briefcase, label: "Deneyim", value: "5+ Yıl", sub: "Grafik & Web Tasarım", num: "02" },
  { icon: Languages, label: "Diller", value: "Türkçe & İngilizce", sub: "Ana Dil / B1", num: "03" },
  { icon: MapPin, label: "Lokasyon", value: "Ankara", sub: "Türkiye", num: "04" },
];

/* Animated counter for years */
function YearCounter({ isInView }: { isInView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const target = 5;
    const duration = 2000;
    const startTime = performance.now() + 300;

    function tick(now: number) {
      if (now < startTime) { requestAnimationFrame(tick); return; }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView]);

  return <>{count}</>;
}

export default function About() {
  const ref = useRef(null);
  const expRef = useRef(null);
  const parallaxRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const expInView = useInView(expRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="about" className="py-40 lg:py-56 relative overflow-hidden" ref={ref}>
      {/* Large decorative watermark — logo + number */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-20 right-0 pointer-events-none select-none"
      >
        <motion.span
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[20vw] lg:text-[16rem] text-[#F5F5F5] italic leading-none block"
        >
          03
        </motion.span>
      </motion.div>

      {/* 3D Logo — subtle background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.06 } : {}}
        transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-[20%] w-[80vw] lg:w-[60vw] max-w-[900px] aspect-square pointer-events-none z-0"
      >
        <Logo3D className="w-full h-full" />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative" ref={parallaxRef}>

        {/* Label with animated line */}
        <div className="flex items-center gap-6 mb-20 lg:mb-28">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-[#B0B0B0]"
          >
            03 — Hakkımda
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 h-px bg-[#EBEBEB] origin-left"
          />
        </div>

        {/* Statement — word by word reveal with shimmer name */}
        <div className="max-w-4xl mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#1A1A1A] leading-snug">
            {"Merhaba, ben ".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: 40 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.3em]"
              style={{
                background: "linear-gradient(90deg, #1A1A1A 0%, #1A1A1A 40%, #555 50%, #1A1A1A 60%, #1A1A1A 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontStyle: "italic",
                animation: "shimmer 4s ease-in-out infinite",
              }}
            >
              Enes Emer
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.55, type: "spring", stiffness: 200 }}
              className="inline-block"
            >.</motion.span>
            <br />
            {"Görsel hafıza ve yaratıcılık ile markalara".split(" ").map((word, i) => (
              <motion.span
                key={`w2-${i}`}
                initial={{ opacity: 0, y: 40, rotateX: 40 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block italic mr-[0.3em]"
            >
              kimlik
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              kazandırıyorum.
            </motion.span>
          </h2>
        </div>

        {/* Bio — two columns with animated divider + highlight keywords */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 mb-16 lg:mb-24 relative">
          {/* Vertical divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#EBEBEB] origin-top"
          />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-base text-[#777] leading-loose">
              2001 doğumlu, Ankara merkezli bir{" "}
              <span className="text-[#1A1A1A] font-medium">grafik tasarımcıyım</span>.{" "}
              Necmettin Erbakan Üniversitesi Yönetim Bilişim Sistemleri bölümünden{" "}
              <span className="text-[#1A1A1A] font-medium">2025</span> yılında mezun oldum.
              Grafik tasarım ve sosyal medya alanında profesyonel çalışmalar yapıyorum.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-base text-[#777] leading-loose">
              Kariyer hedefim, <span className="text-[#1A1A1A] font-medium">görsel hafıza ve yaratıcılık</span> gibi
              yeteneklerimi kullanarak tasarım alanında başarılı bir şekilde katkı sağlamaktır.
              Her projede <span className="text-[#1A1A1A] font-medium">estetik ve işlevselliğin</span> mükemmel
              dengesini bulmaya çalışırım.
            </p>
          </motion.div>
        </div>

        {/* Facts — horizontal cards with animated accent + number */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-20 lg:mb-28">
          {facts.map((fact, index) => {
            const Icon = fact.icon;
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.6 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden"
              >
                {/* Card */}
                <div className="relative bg-[#F8F8F8] p-8 lg:p-10 flex items-start gap-6 lg:gap-8 transition-shadow duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]">
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1A1A1A] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ rotate: -15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-14 h-14 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#999] group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] group-hover:text-white transition-all duration-500 flex-shrink-0"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#B0B0B0] group-hover:text-[#777] transition-colors duration-500">
                        {fact.label}
                      </span>
                      <span className="font-sans text-[2rem] font-extralight text-[#F0F0F0] leading-none group-hover:text-[#E0E0E0] transition-colors duration-500">
                        {fact.num}
                      </span>
                    </div>
                    <span className="block font-serif text-lg text-[#1A1A1A] leading-snug mb-1 group-hover:translate-x-1 transition-transform duration-500">
                      {fact.value}
                    </span>
                    <span className="block font-sans text-sm text-[#999]">
                      {fact.sub}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ EXPERIENCE ═══ */}
        <div ref={expRef}>
          {/* Header with animated year counter */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 lg:mb-24">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={expInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="block font-sans text-xs tracking-[0.25em] uppercase text-[#B0B0B0] mb-8"
              >
                Deneyim
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                animate={expInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] leading-tight"
              >
                İş{" "}
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
                >deneyimlerim</span>
              </motion.h3>
            </div>

            {/* Animated year badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={expInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center gap-4"
            >
              <span className="font-serif text-5xl lg:text-6xl text-[#1A1A1A] italic leading-none">
                <YearCounter isInView={expInView} />
                <span className="text-[#B0B0B0]">+</span>
              </span>
              <div>
                <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#B0B0B0]">Yıl</span>
                <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#B0B0B0]">Deneyim</span>
              </div>
            </motion.div>
          </div>

          {/* Experience cards - modern layout */}
          <div className="space-y-4 lg:space-y-5">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={expInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="relative bg-[#FAFAFA] group-hover:bg-[#F5F5F5] transition-all duration-500 overflow-hidden">
                  {/* Top accent line that slides in */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1A1A1A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                  <div className="p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                    {/* Company initial */}
                    <motion.div
                      whileHover={{ rotate: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-14 h-14 rounded-full bg-white border border-[#EBEBEB] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-500"
                    >
                      <span className="font-serif text-xl italic text-[#999] group-hover:text-white transition-colors duration-500">
                        {exp.initial}
                      </span>
                    </motion.div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-6">
                        <div>
                          <h4 className="font-serif text-xl lg:text-2xl text-[#1A1A1A] italic leading-snug group-hover:translate-x-2 transition-transform duration-500">
                            {exp.role}
                          </h4>
                          <p className="font-sans text-sm text-[#999] mt-1.5 flex items-center gap-2">
                            <span className="font-medium text-[#777]">{exp.company}</span>
                            <span className="w-1 h-1 rounded-full bg-[#D0D0D0]" />
                            {exp.location}
                            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Calendar size={12} className="text-[#C0C0C0]" />
                          <span className="font-sans text-xs text-[#B0B0B0] group-hover:text-[#777] transition-colors duration-500 whitespace-nowrap">
                            {exp.period}
                          </span>
                        </div>
                      </div>

                      <motion.p
                        className="font-sans text-sm text-[#999] leading-relaxed mt-4 lg:mt-3 max-w-2xl group-hover:text-[#666] transition-colors duration-500"
                      >
                        {exp.description}
                      </motion.p>
                    </div>

                    {/* Index number */}
                    <span className="hidden lg:block font-sans text-[2.5rem] font-extralight text-[#F0F0F0] leading-none group-hover:text-[#E0E0E0] transition-colors duration-500 flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={expInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-px bg-[#EBEBEB] origin-left mt-12"
          />
        </div>

      </div>
    </section>
  );
}
