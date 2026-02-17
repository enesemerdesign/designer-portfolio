"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedFolder, type Project } from "@/components/ui/3d-folder";

const services = [
  {
    title: "Grafik Tasarım",
    gradient: "linear-gradient(135deg, #e73827, #f85032)",
    projects: [
      { id: "g1", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop", title: "Logo & Marka Kimliği" },
      { id: "g2", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop", title: "Broşür & Katalog" },
      { id: "g3", image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=600&fit=crop", title: "Afiş & Poster" },
    ] as Project[],
  },
  {
    title: "Web Tasarım",
    gradient: "linear-gradient(to right, #f7b733, #fc4a1a)",
    projects: [
      { id: "w1", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=600&fit=crop", title: "Kurumsal Web Sitesi" },
      { id: "w2", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop", title: "E-Ticaret Arayüzü" },
      { id: "w3", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop", title: "Dashboard & Panel" },
    ] as Project[],
  },
  {
    title: "Sosyal Medya",
    gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
    projects: [
      { id: "s1", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop", title: "İçerik Tasarımı" },
      { id: "s2", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=600&fit=crop", title: "Reklam Kampanyası" },
      { id: "s3", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&h=600&fit=crop", title: "Marka Stratejisi" },
    ] as Project[],
  },
  {
    title: "Video & Oyun",
    gradient: "linear-gradient(135deg, #8e2de2, #4a00e0)",
    projects: [
      { id: "v1", image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&h=600&fit=crop", title: "Video Kurgu" },
      { id: "v2", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=600&fit=crop", title: "Motion Grafik" },
      { id: "v3", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=600&fit=crop", title: "Oyun Tasarımı" },
    ] as Project[],
  },
];

const skills = [
  { name: "Adobe Photoshop", level: 95 },
  { name: "CapCut", level: 95 },
  { name: "Adobe Illustrator", level: 90 },
  { name: "Adobe Lightroom", level: 85 },
  { name: "Adobe Premiere Pro", level: 80 },
  { name: "Adobe Dimension", level: 75 },
  { name: "Unity", level: 65 },
];

/* Animated counter that counts from 0 to target */
function AnimatedCounter({ target, isInView, delay }: { target: number; isInView: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1600;
    const startTime = performance.now() + delay * 1000;

    function tick(now: number) {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target, delay]);

  return <>{count}%</>;
}

export default function Skills() {
  const ref = useRef(null);
  const barsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const barsInView = useInView(barsRef, { once: true, margin: "-50px" });

  return (
    <section id="skills" className="bg-[var(--bg-muted)] py-40 lg:py-56 relative overflow-hidden" ref={ref}>
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--dot-pattern) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-section relative">

        {/* Header */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-label block mb-8"
        >
          02 — Hizmetler
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block mb-20 lg:mb-28"
        >
          {/* Hand-drawn circle SVG */}
          <motion.svg
            width="100%"
            height="100%"
            viewBox="0 0 500 120"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute -inset-x-14 -inset-y-8 w-[calc(100%+112px)] h-[calc(100%+64px)] pointer-events-none"
            preserveAspectRatio="none"
          >
            <title>Decoration</title>
            <motion.path
              d="M 460 20 C 500 55, 490 100, 250 105 C 50 108, 10 85, 15 60 C 20 30, 80 12, 250 15 C 400 12, 460 30, 445 45"
              fill="none"
              strokeWidth="4.5"
              stroke="var(--fg)"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: {
                    pathLength: { duration: 2, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
                    opacity: { duration: 0.4, delay: 0.5 },
                  },
                },
              }}
            />
          </motion.svg>

          <h2 className="section-title leading-tight relative z-10">
            Neler <span className="italic">yapıyorum</span>
          </h2>
        </motion.div>

        {/* 2x2 Service Folder Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 mb-40 lg:mb-56 justify-items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <AnimatedFolder
                title={service.title}
                projects={service.projects}
                gradient={service.gradient}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Proficiency */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32" ref={barsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={barsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="section-label block mb-8">
              Yetkinlikler
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[var(--fg)] leading-tight mb-6">
              Kullandığım <span className="italic">araçlar</span>
            </h3>
            <p className="font-sans text-base text-[var(--fg-muted)] leading-relaxed max-w-sm">
              Her projede doğru aracı seçerek en iyi sonucu elde ediyorum.
              Sürekli gelişen teknolojiyi takip ederek kendimi güncelliyorum.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={barsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 30 }}
                animate={barsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-sans text-sm text-[var(--fg)] font-medium">
                    {skill.name}
                  </span>
                  <span className="font-sans text-sm text-[var(--fg)] tabular-nums font-medium">
                    <AnimatedCounter target={skill.level} isInView={barsInView} delay={0.4 + index * 0.1} />
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[var(--skill-bar-bg)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={barsInView ? { width: `${skill.level}%` } : {}}
                    transition={{
                      duration: 1.6,
                      delay: 0.4 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full bg-[var(--accent)] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
