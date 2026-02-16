"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Monitor, Share2, Gamepad2 } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Grafik Tasarım",
    description:
      "Broşür, katalog, afiş ve görsel tasarım projelerinde markalara etkileyici ve akılda kalıcı çözümler sunuyorum.",
    tools: ["Photoshop", "Illustrator", "Dimension", "Lightroom"],
  },
  {
    icon: Monitor,
    title: "Web Tasarım",
    description:
      "Modern, kullanıcı dostu ve responsive web siteleri tasarlayarak dijital varlıkları güçlendiriyorum.",
    tools: ["UI/UX", "Web Sitesi", "Responsive", "Prototipleme"],
  },
  {
    icon: Share2,
    title: "Sosyal Medya",
    description:
      "Sosyal medya hesaplarının görsel kimliğini oluşturuyor, içerik üretiyor ve profesyonel şekilde yönetiyorum.",
    tools: ["İçerik Üretimi", "Marka Yönetimi", "Kampanya", "Post & Story"],
  },
  {
    icon: Gamepad2,
    title: "Video & Oyun",
    description:
      "Video kurgu ve oyun tasarımı alanlarında yaratıcı ve etkileyici projeler geliştiriyorum.",
    tools: ["Premiere Pro", "Unity", "Level Design", "Motion"],
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
      // Ease out cubic
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
    <section id="skills" className="bg-[#F8F8F8] py-40 lg:py-56" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block font-sans text-xs tracking-[0.25em] uppercase text-[#B0B0B0] mb-8"
        >
          02 — Hizmetler
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight mb-20 lg:mb-28"
        >
          Neler <span className="italic">yapıyorum</span>
        </motion.h2>

        {/* 2x2 Service Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-40 lg:mb-56">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white p-10 sm:p-12 lg:p-14 group overflow-hidden transition-all duration-700 hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)]"
              >
                {/* Hover accent line at top */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1A1A1A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                <div className="flex items-start justify-between mb-10 lg:mb-12">
                  <motion.div
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-14 h-14 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#999] group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] group-hover:text-white transition-all duration-500"
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.div>
                  <span className="font-sans text-[2.5rem] font-extralight text-[#F0F0F0] leading-none group-hover:text-[#E0E0E0] transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] italic mb-5 lg:mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>

                <p className="font-sans text-[0.95rem] text-[#888] leading-relaxed mb-10 lg:mb-12">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool, ti) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.12 + ti * 0.06 }}
                      className="font-sans text-xs text-[#999] border border-[#EBEBEB] px-4 py-2 rounded-full group-hover:border-[#CDCDCD] group-hover:text-[#666] transition-all duration-500"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Proficiency */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32" ref={barsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={barsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="block font-sans text-xs tracking-[0.25em] uppercase text-[#B0B0B0] mb-8">
              Yetkinlikler
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] leading-tight mb-6">
              Kullandığım <span className="italic">araçlar</span>
            </h3>
            <p className="font-sans text-base text-[#999] leading-relaxed max-w-sm">
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
                  <span className="font-sans text-sm text-[#1A1A1A] font-medium">
                    {skill.name}
                  </span>
                  <span className="font-sans text-sm text-[#1A1A1A] tabular-nums font-medium">
                    <AnimatedCounter target={skill.level} isInView={barsInView} delay={0.4 + index * 0.1} />
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={barsInView ? { width: `${skill.level}%` } : {}}
                    transition={{
                      duration: 1.6,
                      delay: 0.4 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-full bg-[#1A1A1A] rounded-full"
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
