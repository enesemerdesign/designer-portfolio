"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "projects", label: "Çalışmalar", number: "01" },
  { id: "skills", label: "Hizmetler", number: "02" },
  { id: "pricing", label: "Fiyatlar", number: "03" },
  { id: "about", label: "Hakkımda", number: "04" },
  { id: "contact", label: "İletişim", number: "05" },
];

export default function PageTimeline() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;

    // Show after scrolling past hero (~70vh)
    setVisible(scrollY > viewportH * 0.7);

    // Determine active section
    let currentActive = -1;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportH * 0.5) {
          currentActive = i;
          break;
        }
      }
    }
    setActiveIndex(currentActive);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 hidden md:block"
          aria-label="Sayfa navigasyonu"
        >
          <div className="flex flex-col items-center">
            {sections.map((section, index) => (
              <div key={section.id} className="flex flex-col items-center">
                {/* Line segment above dot (except first) */}
                {index > 0 && (
                  <div className="w-[1.5px] h-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--border)]" />
                    <motion.div
                      className="absolute top-0 left-0 w-full bg-[var(--fg)]"
                      animate={{ height: activeIndex >= index ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                )}

                {/* Dot with label */}
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    const el = document.getElementById(section.id);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {/* Active ring pulse */}
                  {activeIndex === index && (
                    <motion.div
                      className="absolute inset-[-4px] rounded-full border"
                      style={{ borderColor: "var(--timeline-ring)" }}
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}

                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 relative z-10 transition-colors duration-400 ${
                      activeIndex >= index
                        ? "bg-[var(--fg)] border-[var(--fg)]"
                        : "bg-[var(--bg)] border-[var(--fg-extra-ghost)]"
                    }`}
                    animate={{
                      scale: activeIndex === index ? 1.25 : 1,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.5 }}
                  />

                  {/* Tooltip label — stays dark intentionally */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, x: -6, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -6, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                      >
                        <div className="bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg flex items-center gap-2.5 shadow-lg">
                          <span className="font-sans text-[0.5rem] tracking-[0.15em] uppercase text-white/40">
                            {section.number}
                          </span>
                          <span className="w-px h-3 bg-white/10" />
                          <span className="font-sans text-[0.65rem] font-medium tracking-wide">
                            {section.label}
                          </span>
                        </div>
                        {/* Arrow */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-[-5px]">
                          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-[#1A1A1A]" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
