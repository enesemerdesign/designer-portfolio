"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Tamamlanan Proje" },
  { value: 30, suffix: "+", label: "Mutlu Müşteri" },
  { value: 5, suffix: "+", label: "Yıl Deneyim" },
  { value: 6, suffix: "", label: "Araç & Yazılım" },
];

function AnimatedNumber({ target, suffix, isInView, delay }: { target: number; suffix: string; isInView: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
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

  return (
    <>
      {count}{suffix}
    </>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{
        background: "linear-gradient(-45deg, #0a0a0a, #1a1a2e, #16213e, #0f0f0f)",
        backgroundSize: "400% 400%",
        animation: "gradient-shift 12s ease infinite",
      }}
    >
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-white/10 origin-left mb-20 lg:mb-24"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="text-center relative group"
            >
              <div className="border border-white/[0.08] rounded-2xl p-8 lg:p-10 backdrop-blur-sm bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-500">
                <span
                  className="block font-serif text-5xl sm:text-6xl lg:text-7xl italic mb-4"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} isInView={isInView} delay={0.2 + index * 0.12} />
                </span>
                <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-white/30 group-hover:text-white/50 transition-colors duration-500">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-white/10 origin-right mt-20 lg:mt-24"
        />
      </div>
    </section>
  );
}
