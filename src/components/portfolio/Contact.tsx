"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Phone, MapPin, Check, Instagram, Linkedin, ArrowUpRight, Mail } from "lucide-react";

/* ── Reveal text line by line ─────────────────────── */
function RevealText({ text, className, delay = 0, show }: { text: string; className?: string; delay?: number; show: boolean }) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%" }}
        animate={show ? { y: 0 } : {}}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ── Form Input ────────────────────────────────────── */
function Field({
  label, name, type = "text", value, onChange, required, isTextarea, delay, show,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; isTextarea?: boolean; delay: number; show: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const base = "w-full bg-transparent border-b border-[#E0E0E0] pt-6 pb-3 text-base text-[#1A1A1A] outline-none transition-all duration-500 font-sans placeholder-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={show ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <label
        className="absolute left-0 font-sans pointer-events-none transition-all duration-300"
        style={{
          top: active ? -2 : 24,
          fontSize: active ? "0.6rem" : "0.9rem",
          letterSpacing: active ? "0.2em" : "0",
          textTransform: active ? "uppercase" as const : "none" as const,
          color: active ? "#1A1A1A" : "#B0B0B0",
        }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea name={name} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} rows={4} required={required} className={`${base} resize-none`} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} className={base} />
      )}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A1A1A] origin-left"
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}

/* ── Main ──────────────────────────────────────────── */
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-white relative overflow-hidden" ref={ref}>
      {/* Top animated line */}
      <motion.div
        className="w-full h-px bg-[#EBEBEB]"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center" }}
      />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-28 lg:pt-40 pb-20 lg:pb-32">

        {/* ── Hero headline area ── */}
        <div className="mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.div
              className="w-12 h-px bg-[#1A1A1A]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
            <span className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-[#999]">İletişim</span>
          </motion.div>

          {/* Big staggered headline */}
          <h2 className="font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.95] text-[#1A1A1A] tracking-[-0.03em]">
            <div className="overflow-hidden">
              <RevealText text="Hayalinizdeki" className="" delay={0.1} show={isInView} />
            </div>
            <div className="overflow-hidden">
              <RevealText text="projeyi birlikte" className="italic" delay={0.2} show={isInView} />
            </div>
            <div className="overflow-hidden flex items-end gap-6">
              <RevealText text="tasarlayalım" className="" delay={0.3} show={isInView} />
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:inline-flex w-14 h-14 rounded-full bg-[#1A1A1A] items-center justify-center mb-3 flex-shrink-0"
              >
                <ArrowUpRight size={20} className="text-white" />
              </motion.span>
            </div>
          </h2>
        </div>

        {/* ── Two-column: Info (left) + Form (right) ── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left: Contact info */}
          <div className="lg:w-[38%] flex-shrink-0">
            {/* Email */}
            <motion.a
              href="mailto:enes.emer70@hotmail.com"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group block mb-10"
            >
              <span className="block font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#B0B0B0] mb-3">E-posta</span>
              <span className="relative inline-block font-serif text-lg lg:text-xl text-[#1A1A1A]">
                enes.emer70@hotmail.com
                <span className="absolute bottom-0 left-0 w-full h-px bg-[#1A1A1A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </span>
              <ArrowUpRight size={14} className="inline-block ml-2 text-[#C0C0C0] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            {/* Phone & Location */}
            <div className="space-y-0 mb-10">
              {[
                { icon: Phone, label: "Telefon", value: "+90 553 408 6001", href: "tel:+905534086001", delay: 0.5 },
                { icon: MapPin, label: "Lokasyon", value: "Ankara, Türkiye", href: null, delay: 0.6 },
              ].map((item) => {
                const Icon = item.icon;
                const Tag = item.href ? motion.a : motion.div;
                return (
                  <Tag
                    key={item.label}
                    {...(item.href ? { href: item.href } : {})}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center gap-4 py-4 border-b border-[#F0F0F0] hover:border-[#D0D0D0] transition-colors duration-500"
                  >
                    <span className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center group-hover:bg-[#1A1A1A] transition-colors duration-500 flex-shrink-0">
                      <Icon size={15} className="text-[#999] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <span className="block font-sans text-[0.55rem] tracking-[0.2em] uppercase text-[#C0C0C0] mb-0.5">{item.label}</span>
                      <span className="block font-sans text-sm text-[#1A1A1A]">{item.value}</span>
                    </div>
                    {item.href && (
                      <ArrowUpRight size={13} className="ml-auto text-[#D0D0D0] group-hover:text-[#1A1A1A] transition-all duration-300 flex-shrink-0" />
                    )}
                  </Tag>
                );
              })}
            </div>

            {/* Availability + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-sans text-[0.7rem] tracking-wide text-[#777]">
                Yeni projeler için müsaitim
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center gap-2.5"
            >
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Mail, label: "Email", href: "mailto:enes.emer70@hotmail.com" },
              ].map((s) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-10 h-10 rounded-full border border-[#EBEBEB] flex items-center justify-center text-[#C0C0C0] hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-white transition-all duration-500"
                  >
                    <SIcon size={14} strokeWidth={1.5} />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Form */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10"
            >
              <h3 className="font-serif text-2xl lg:text-3xl text-[#1A1A1A] leading-snug mb-2">
                Mesaj gönderin
              </h3>
              <p className="font-sans text-sm text-[#B0B0B0]">
                Projenizi anlatın, 24 saat içinde dönüş yapalım.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid grid-cols-2 gap-7">
                <Field label="Adınız" name="name" value={formData.name} onChange={handleChange} required delay={0.5} show={isInView} />
                <Field label="E-posta" name="email" type="email" value={formData.email} onChange={handleChange} required delay={0.55} show={isInView} />
              </div>
              <Field label="Konu" name="subject" value={formData.subject} onChange={handleChange} required delay={0.6} show={isInView} />
              <Field label="Mesajınız" name="message" value={formData.message} onChange={handleChange} required isTextarea delay={0.65} show={isInView} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.75 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center gap-4 px-12 py-4.5 font-sans text-sm font-medium tracking-[0.2em] uppercase overflow-hidden bg-[#1A1A1A] text-white transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
                >
                  <span className="absolute inset-0 bg-[#333] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10 flex items-center gap-4">
                    {isSubmitting ? (
                      <>
                        <motion.span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Gönderiliyor
                      </>
                    ) : (
                      <>
                        Gönder
                        <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 bg-[#1A1A1A] text-white pl-5 pr-6 py-4 shadow-2xl flex items-center gap-3 z-50 font-sans text-sm"
          >
            <span className="w-6 h-6 rounded-full bg-emerald-400/10 flex items-center justify-center">
              <Check size={14} className="text-emerald-400" />
            </span>
            <span>Mesajınız başarıyla gönderildi!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
