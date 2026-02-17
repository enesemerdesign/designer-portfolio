"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Calendar, ThumbsUp, Briefcase, Palette, Monitor, Share2, Gamepad2 } from "lucide-react";
import { TestimonialStack, Testimonial } from "@/components/ui/glass-testimonial-swiper";

const testimonials: Testimonial[] = [
  {
    id: 1,
    initials: "AY",
    name: "Ayşe Yılmaz",
    role: "Bloom Cafe & Bistro — Kurucu",
    quote:
      "Kafemizin logosundan menü tasarımına kadar her şeyi Enes halletti. Müşterilerimiz sürekli tasarımları soruyor, marka kimliğimiz tamamen değişti. Kesinlikle en iyi yatırımımızdı.",
    tags: [
      { text: "Logo & Marka", type: "featured" },
      { text: "Menü Tasarım", type: "default" },
    ],
    stats: [
      { icon: Palette, text: "Kurumsal Kimlik" },
      { icon: Calendar, text: "1.5 yıldır müşteri" },
    ],
    avatarGradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
  },
  {
    id: 2,
    initials: "MK",
    name: "Mehmet Kaya",
    role: "TeknoLoop — Kurucu Ortak",
    quote:
      "Startup'ımız için modern ve kullanıcı dostu bir web sitesi istiyorduk. Enes beklentilerimizin çok ötesinde bir iş çıkardı. Yatırımcı sunumumuzda bile web sitesi övgü aldı.",
    tags: [
      { text: "Web Tasarım", type: "featured" },
      { text: "UI/UX", type: "default" },
    ],
    stats: [
      { icon: Monitor, text: "Responsive Site" },
      { icon: ThumbsUp, text: "İlk seferde onay" },
    ],
    avatarGradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
  },
  {
    id: 3,
    initials: "ZD",
    name: "Zeynep Demir",
    role: "Velvet Moda — Marka Yöneticisi",
    quote:
      "Sosyal medya hesaplarımızın yönetimini Enes'e bıraktıktan sonra takipçi sayımız 3 ayda ikiye katlandı. İçeriklerin kalitesi ve tutarlılığı rakiplerimizden sıyrılmamızı sağladı.",
    tags: [
      { text: "Sosyal Medya", type: "featured" },
      { text: "İçerik Üretimi", type: "default" },
    ],
    stats: [
      { icon: Share2, text: "2x takipçi artışı" },
      { icon: Star, text: "5 yıldız" },
    ],
    avatarGradient: "linear-gradient(135deg, #10b981, #059669)",
  },
  {
    id: 4,
    initials: "CÖ",
    name: "Can Öztürk",
    role: "Pixel Storm Games — Sanat Yönetmeni",
    quote:
      "Oyun tanıtım videolarımız ve motion grafik çalışmalarımız için Enes ile çalışmak muhteşemdi. Yaratıcı vizyonu ve teknik becerisi projelere bambaşka bir boyut kattı.",
    tags: [
      { text: "Video Kurgu", type: "default" },
      { text: "Motion Grafik", type: "featured" },
    ],
    stats: [
      { icon: Gamepad2, text: "Oyun Sektörü" },
      { icon: Briefcase, text: "3 proje tamamlandı" },
    ],
    avatarGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    id: 5,
    initials: "EA",
    name: "Elif Arslan",
    role: "Lezzet Durağı — İşletme Sahibi",
    quote:
      "Restoranımızın tüm görsel kimliğini Enes tasarladı. Tabela, kartvizit, sosyal medya görselleri... Her şey birbiriyle uyumlu ve profesyonel. Artık markamızla gurur duyuyoruz.",
    tags: [
      { text: "Kurumsal Kimlik", type: "featured" },
      { text: "Baskı Tasarım", type: "default" },
    ],
    stats: [
      { icon: Palette, text: "Tam paket" },
      { icon: ThumbsUp, text: "Tavsiye ederim" },
    ],
    avatarGradient: "linear-gradient(135deg, #8b5cf6, #a855f7)",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-28 lg:py-40 relative" ref={ref}>
      <div className="container-section">
        {/* Section label */}
        <div className="flex items-center gap-6 mb-16 lg:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            Müşteri Yorumları
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 divider origin-left"
          />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="section-title mb-4">
            Müşterilerim ne <span className="italic">diyor?</span>
          </h2>
          <p className="font-sans text-[var(--fg-muted)] text-base max-w-md mx-auto">
            Birlikte çalıştığım markalar ve girişimcilerin deneyimleri.
          </p>
        </motion.div>

        {/* Testimonial Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <TestimonialStack testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  );
}
