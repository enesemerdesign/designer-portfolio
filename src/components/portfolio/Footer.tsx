"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const LOGO_FULL = "M607.65,339.48c0,190.36,170.26,339.48,388.84,339.48h5.39s-43.33-75-43.33-75c-3.09-5.35-3.09-11.95,0-17.3l43.33-75h-1.92s-3.47-.15-3.47-.15c-114.32,0-203.21-75.74-203.21-172.03,0-98.65,88.9-172.18,203.21-172.18h86.38s216.15,385.44,216.15,385.44c50.77,91.71,154.89,149.12,269.35,149.12h48.18c213.56,0,388.84-158.36,388.84-350.93C2005.39,158.21,1830.11,0,1616.55,0h-620.06c-218.58,0-388.84,148.97-388.84,339.48ZM1616.55,167.3c111.8,0,203.36,82.62,203.36,183.63,0,100.79-91.56,183.48-203.36,183.48h-48.18c-43.3,0-83.87-22.91-104.27-57.42l-172.77-309.7h325.22ZM1008.9,511.66h-5.39s43.33,75,43.33,75c3.09,5.35,3.09,11.95,0,17.3l-43.33,75h.96s4.43.15,4.43.15c114.32,0,203.21,75.6,203.21,172.03,0,98.65-88.9,172.03-203.21,172.03h-86.38s-216.15-385.44-216.15-385.44c-50.77-91.7-154.89-149.12-269.35-149.12h-48.33C175.28,488.6,0,646.96,0,839.68c0,192.57,175.28,350.93,388.69,350.93h620.21c218.44,0,388.69-149.12,388.69-339.48,0-190.36-170.26-339.48-388.69-339.48ZM388.69,1023.17c-111.8,0-203.21-82.62-203.21-183.48,0-100.94,91.41-183.63,203.21-183.63h48.33c43.3,0,83.87,23.06,104.27,57.42l172.77,309.7h-325.36Z";

const footerLinks = [
  { label: "Çalışmalar", href: "#projects" },
  { label: "Hizmetler", href: "#skills" },
  { label: "Hakkımda", href: "#about" },
  { label: "İletişim", href: "#contact" },
];

const socialLinks = [
  { label: "Behance", href: "https://behance.net" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white relative overflow-hidden" ref={ref}>
      {/* Large decorative background logo */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={isInView ? { opacity: 1, rotate: -12 } : {}}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute -right-[10%] top-[5%] pointer-events-none select-none"
      >
        <svg viewBox="0 0 2005.39 1190.61" className="w-[50vw] lg:w-[40vw] max-w-[700px] opacity-[0.03]">
          <path d={LOGO_FULL} fill="white" />
        </svg>
      </motion.div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 lg:pt-40 pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-white/30 block mb-10">
            Bir sonraki adım
          </span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] max-w-[800px] mb-14">
            <span className="text-white">Birlikte harika bir </span>
            <span
              className="italic"
              style={{
                background: "linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            >
              şey
            </span>{" "}
            <span className="text-white">yaratmaya ne dersiniz?</span>
          </h2>
          <a
            href="mailto:enes.emer70@hotmail.com"
            className="relative inline-flex items-center gap-4 px-10 py-5 font-sans text-[0.8rem] font-medium tracking-[0.1em] uppercase transition-all duration-500 group overflow-hidden"
            style={{
              background: "white",
              color: "#0A0A0A",
            }}
          >
            {/* Hover sweep */}
            <span
              className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: "#E0E0E0" }}
            />
            <span className="relative z-10 flex items-center gap-3">
              İletişime Geç
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px bg-white/10 origin-left"
        />
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.button
              onClick={() => scrollTo("#hero")}
              className="mb-5 inline-block"
              whileHover={{ scale: 1.05, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg viewBox="0 0 2005.39 1190.61" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-500">
                <path d={LOGO_FULL} fill="white" />
              </svg>
            </motion.button>
            <p className="font-sans text-sm text-white/25 leading-[1.8] max-w-[260px]">
              Görsel hafıza ve yaratıcılık ile markalara kimlik kazandıran grafik & web tasarımcı.
            </p>
          </motion.div>

          {/* Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-white/20 block mb-6">
              Sayfalar
            </span>
            <nav className="flex flex-col gap-4">
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-sans text-sm text-white/40 hover:text-white/80 transition-colors duration-300 text-left inline-flex items-center gap-2 group"
                >
                  {link.label}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-white/20 block mb-6">
              Sosyal
            </span>
            <nav className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-white/40 hover:text-white/80 transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  {link.label}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-white/20 block mb-6">
              İletişim
            </span>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:enes.emer70@hotmail.com"
                className="font-sans text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
              >
                enes.emer70@hotmail.com
              </a>
              <a
                href="tel:+905534086001"
                className="font-sans text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
              >
                +90 553 408 6001
              </a>
              <span className="font-sans text-sm text-white/25">
                Ankara, Türkiye
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="w-full h-px bg-white/10" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[0.75rem] text-white/15">
            &copy; {currentYear} Enes Emer. Tüm hakları saklıdır.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 font-sans text-[0.75rem] text-white/25 hover:text-white/60 transition-colors duration-300 group"
            whileHover={{ y: -2 }}
          >
            Başa dön
            <span className="w-8 h-8 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-all duration-300">
              <ArrowUp size={12} />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
