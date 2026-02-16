"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_FULL = "M607.65,339.48c0,190.36,170.26,339.48,388.84,339.48h5.39s-43.33-75-43.33-75c-3.09-5.35-3.09-11.95,0-17.3l43.33-75h-1.92s-3.47-.15-3.47-.15c-114.32,0-203.21-75.74-203.21-172.03,0-98.65,88.9-172.18,203.21-172.18h86.38s216.15,385.44,216.15,385.44c50.77,91.71,154.89,149.12,269.35,149.12h48.18c213.56,0,388.84-158.36,388.84-350.93C2005.39,158.21,1830.11,0,1616.55,0h-620.06c-218.58,0-388.84,148.97-388.84,339.48ZM1616.55,167.3c111.8,0,203.36,82.62,203.36,183.63,0,100.79-91.56,183.48-203.36,183.48h-48.18c-43.3,0-83.87-22.91-104.27-57.42l-172.77-309.7h325.22ZM1008.9,511.66h-5.39s43.33,75,43.33,75c3.09,5.35,3.09,11.95,0,17.3l-43.33,75h.96s4.43.15,4.43.15c114.32,0,203.21,75.6,203.21,172.03,0,98.65-88.9,172.03-203.21,172.03h-86.38s-216.15-385.44-216.15-385.44c-50.77-91.7-154.89-149.12-269.35-149.12h-48.33C175.28,488.6,0,646.96,0,839.68c0,192.57,175.28,350.93,388.69,350.93h620.21c218.44,0,388.69-149.12,388.69-339.48,0-190.36-170.26-339.48-388.69-339.48ZM388.69,1023.17c-111.8,0-203.21-82.62-203.21-183.48,0-100.94,91.41-183.63,203.21-183.63h48.33c43.3,0,83.87,23.06,104.27,57.42l172.77,309.7h-325.36Z";

const navItems = [
  { label: "Çalışmalar", href: "#projects" },
  { label: "Hizmetler", href: "#skills" },
  { label: "Hakkımda", href: "#about" },
  { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <motion.button
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.svg
                viewBox="0 0 2005.39 1190.61"
                className="h-7 lg:h-8 w-auto"
                whileHover={{ rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <path d={LOGO_FULL} fill="#1A1A1A" />
              </motion.svg>
              <span className="hidden sm:block w-px h-5 bg-[#D0D0D0]" />
              <span className="hidden sm:block font-sans text-[0.7rem] tracking-[0.18em] uppercase text-[#1A1A1A] group-hover:opacity-60 transition-opacity duration-300">
                Enes <span className="font-medium">Emer</span>
              </span>
            </motion.button>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="font-sans text-[0.85rem] text-[#777] hover:text-[#1A1A1A] transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-full bg-[#1A1A1A] origin-center"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-[1.5px] w-full bg-[#1A1A1A]"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-full bg-[#1A1A1A] origin-center"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => scrollTo(item.href)}
                  className="font-serif text-4xl text-[#1A1A1A] hover:opacity-50 transition-opacity"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href="mailto:enes.emer70@hotmail.com"
              className="absolute bottom-12 font-sans text-sm text-[#999] hover:text-[#1A1A1A] transition-colors"
            >
              enes.emer70@hotmail.com
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
