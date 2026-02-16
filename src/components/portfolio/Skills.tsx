"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Monitor, Share2, Gamepad2 } from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const services = [
  {
    icon: Palette,
    number: "01",
    title: "Grafik Tasarım",
    testimonials: [
      {
        name: "Logo & Marka Kimliği",
        designation: "Photoshop • Illustrator",
        quote: "Markanızın özünü yansıtan, akılda kalıcı logolar ve tutarlı marka kimlikleri tasarlıyorum.",
        src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop",
      },
      {
        name: "Broşür & Katalog",
        designation: "Illustrator • InDesign",
        quote: "Ürün ve hizmetlerinizi en etkili şekilde tanıtan profesyonel basılı materyaller hazırlıyorum.",
        src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=600&fit=crop",
      },
      {
        name: "Afiş & Poster",
        designation: "Photoshop • Dimension",
        quote: "Dikkat çekici ve mesajı net ileten etkileyici afiş ve poster tasarımları oluşturuyorum.",
        src: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&h=600&fit=crop",
      },
    ],
  },
  {
    icon: Monitor,
    number: "02",
    title: "Web Tasarım",
    testimonials: [
      {
        name: "Kurumsal Web Sitesi",
        designation: "UI/UX • Responsive",
        quote: "Modern ve kullanıcı dostu kurumsal web siteleri tasarlayarak dijital varlığınızı güçlendiriyorum.",
        src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=600&fit=crop",
      },
      {
        name: "E-Ticaret Arayüzü",
        designation: "Web Sitesi • Prototipleme",
        quote: "Satış odaklı, kolay kullanılabilir e-ticaret arayüzleri ile dönüşüm oranlarınızı artırıyorum.",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop",
      },
      {
        name: "Dashboard & Panel",
        designation: "UI/UX • Veri Görselleştirme",
        quote: "Karmaşık verileri anlaşılır ve yönetilebilir panolara dönüştürüyorum.",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
      },
    ],
  },
  {
    icon: Share2,
    number: "03",
    title: "Sosyal Medya",
    testimonials: [
      {
        name: "İçerik Tasarımı",
        designation: "Post & Story • Reels",
        quote: "Markanıza özel, dikkat çekici sosyal medya içerikleri tasarlıyor ve üretiyorum.",
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop",
      },
      {
        name: "Reklam Kampanyası",
        designation: "Kampanya • Hedefleme",
        quote: "Hedef kitlenize ulaşan, etkili ve dönüşüm odaklı reklam kampanyaları oluşturuyorum.",
        src: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=600&fit=crop",
      },
      {
        name: "Marka Stratejisi",
        designation: "Marka Yönetimi • Analiz",
        quote: "Sosyal medyada tutarlı ve güçlü bir marka kimliği oluşturmanıza yardımcı oluyorum.",
        src: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=600&h=600&fit=crop",
      },
    ],
  },
  {
    icon: Gamepad2,
    number: "04",
    title: "Video & Oyun",
    testimonials: [
      {
        name: "Video Kurgu",
        designation: "Premiere Pro • After Effects",
        quote: "Ham görüntülerinizi profesyonel ve etkileyici videolara dönüştürüyorum.",
        src: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&h=600&fit=crop",
      },
      {
        name: "Motion Grafik",
        designation: "After Effects • Motion",
        quote: "Dinamik ve göz alıcı hareket grafikleri ile içeriklerinizi canlandırıyorum.",
        src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=600&fit=crop",
      },
      {
        name: "Oyun Tasarımı",
        designation: "Unity • Level Design",
        quote: "Yaratıcı oyun mekanikleri ve seviye tasarımları ile benzersiz deneyimler oluşturuyorum.",
        src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=600&fit=crop",
      },
    ],
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

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 relative">

        {/* Header */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="block font-sans text-xs tracking-[0.25em] uppercase text-[var(--fg-faint)] mb-8"
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

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--fg)] leading-tight relative z-10">
            Neler <span className="italic">yapıyorum</span>
          </h2>
        </motion.div>

        {/* 2x2 Service Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-40 lg:mb-56">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[var(--bg-card)] rounded-2xl p-6 sm:p-8 border border-[var(--border-light)] transition-shadow duration-500 hover:shadow-[0_20px_60px_var(--hover-shadow)]"
              >
                {/* Service header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-alt)] border border-[var(--border)] flex items-center justify-center text-[var(--fg-muted)]">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl lg:text-2xl text-[var(--fg)] italic">
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-sans text-3xl font-extralight text-[var(--card-number)] leading-none">
                    {service.number}
                  </span>
                </div>

                <AnimatedTestimonials
                  testimonials={service.testimonials}
                  className="font-sans antialiased"
                />
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
            <span className="block font-sans text-xs tracking-[0.25em] uppercase text-[var(--fg-faint)] mb-8">
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
