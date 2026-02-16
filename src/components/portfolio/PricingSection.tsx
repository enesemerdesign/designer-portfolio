"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Pricing } from "@/components/ui/pricing";

const plans = [
  {
    name: "BAŞLANGIÇ",
    price: "3000",
    yearlyPrice: "2400",
    period: "ay",
    features: [
      "Logo tasarımı",
      "Kartvizit tasarımı",
      "Ayda 5 sosyal medya görseli",
      "2 revizyon hakkı",
      "5 iş günü teslimat",
    ],
    description: "Bireysel projeler ve küçük işletmeler için ideal",
    buttonText: "Hemen Başla",
    href: "#contact",
    isPopular: false,
  },
  {
    name: "PROFESYONEL",
    price: "7500",
    yearlyPrice: "6000",
    period: "ay",
    features: [
      "Kurumsal kimlik paketi",
      "Web sitesi UI tasarımı",
      "Ayda 15 sosyal medya görseli",
      "Broşür & katalog tasarımı",
      "Sınırsız revizyon",
      "3 iş günü teslimat",
      "Öncelikli destek",
    ],
    description: "Büyüyen markalar ve işletmeler için en iyi seçim",
    buttonText: "Başlayalım",
    href: "#contact",
    isPopular: true,
  },
  {
    name: "KURUMSAL",
    price: "15000",
    yearlyPrice: "12000",
    period: "ay",
    features: [
      "Profesyonel'deki her şey",
      "Marka stratejisi danışmanlığı",
      "Sosyal medya yönetimi",
      "Video kurgu & motion grafik",
      "Aylık performans raporu",
      "Billboard & outdoor tasarım",
      "1 iş günü teslimat",
      "7/24 iletişim",
    ],
    description: "Kapsamlı çözümler arayan büyük markalar için",
    buttonText: "İletişime Geç",
    href: "#contact",
    isPopular: false,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-28 lg:py-40 relative" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-[var(--fg-faint)]"
          >
            Fiyatlandırma
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex-1 h-px bg-[var(--border)] origin-left"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Pricing
            plans={plans}
            title="Tasarım Paketleri"
            description={`İhtiyacınıza uygun paketi seçin\nTüm paketler profesyonel tasarım hizmeti ve özel destek içerir.`}
          />
        </motion.div>
      </div>
    </section>
  );
}
