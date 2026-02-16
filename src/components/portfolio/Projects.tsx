"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Broşür & Katalog",
    category: "Grafik Tasarım",
    client: "Clb Yazılım",
    image: "/portfolio/brosur.png",
    video: "https://assets.mixkit.co/videos/50600/50600-720.mp4",
  },
  {
    id: 2,
    title: "Sosyal Medya",
    category: "Sosyal Medya",
    client: "Clb Yazılım",
    image: "/portfolio/sosyal-medya.png",
    video: "https://assets.mixkit.co/videos/29993/29993-720.mp4",
  },
  {
    id: 3,
    title: "Web Sitesi UI",
    category: "Web Tasarım",
    client: "Fıkrıba Agency",
    image: "/portfolio/web-site.png",
    video: "https://assets.mixkit.co/videos/3257/3257-720.mp4",
  },
  {
    id: 4,
    title: "Marka Kimliği",
    category: "Kurumsal Kimlik",
    client: "Fıkrıba Agency",
    image: "/portfolio/marka-kimligi.png",
    video: "https://assets.mixkit.co/videos/921/921-720.mp4",
  },
  {
    id: 5,
    title: "Billboard Tasarım",
    category: "Baskı & Outdoor",
    client: "Freelance",
    image: "/portfolio/billboard.jpg",
    video: "https://assets.mixkit.co/videos/23978/23978-720.mp4",
  },
  {
    id: 6,
    title: "Afiş & Görsel",
    category: "Grafik Tasarım",
    client: "Clb Yazılım",
    image: "/portfolio/afis-kolaj.png",
    video: "https://assets.mixkit.co/videos/3245/3245-720.mp4",
  },
  {
    id: 7,
    title: "Ürün Görselleri",
    category: "Ürün Tasarımı",
    client: "Freelance",
    image: "/portfolio/urun-tasarim.jpg",
    video: "https://assets.mixkit.co/videos/50598/50598-720.mp4",
  },
  {
    id: 8,
    title: "Kartvizit & Kurumsal",
    category: "Kurumsal Kimlik",
    client: "Fıkrıba Agency",
    image: "/portfolio/kartvizit.jpg",
    video: "https://assets.mixkit.co/videos/21219/21219-720.mp4",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="group cursor-pointer"
      style={{ width: 420, flexShrink: 0 }}
      onMouseEnter={() => {
        setIsHovered(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <div className="img-hover mb-6 relative bg-[#F5F5F5]" style={{ aspectRatio: "4/5" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover absolute inset-0"
          style={{
            transition: "opacity 0.7s",
            opacity: isHovered ? 0 : 1,
          }}
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover absolute inset-0"
          style={{
            transition: "opacity 0.7s",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <p className="font-sans text-[#B0B0B0]" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
            {project.category}
          </p>
          <h3 className="font-serif text-[#1A1A1A] group-hover:opacity-50" style={{ fontSize: "1.35rem", transition: "opacity 0.3s" }}>
            {project.title}
          </h3>
          <p className="font-sans text-[#B0B0B0]" style={{ fontSize: "0.875rem", marginTop: 6 }}>{project.client}</p>
        </div>
        <span className="font-sans text-[#D0D0D0]" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", flexShrink: 0, marginTop: 4 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function CardGroup() {
  return (
    <div style={{ display: "flex", gap: 32, flexShrink: 0, paddingRight: 32 }}>
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [paused, setPaused] = useState(false);

  return (
    <section id="projects" className="py-28 lg:py-40" ref={ref}>
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <span className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-[#B0B0B0] block mb-6">
            01 — Çalışmalar
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">
            Seçilmiş <span className="italic">projeler</span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite marquee — inline styles to bypass Tailwind */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div
          style={{ overflow: "hidden", position: "relative" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Fade edges */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, white, transparent)", zIndex: 10, pointerEvents: "none" }} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, white, transparent)", zIndex: 10, pointerEvents: "none" }} />

          {/* Scrolling track: two identical groups */}
          <div
            style={{
              display: "flex",
              width: "max-content",
              willChange: "transform",
              animation: "marquee-scroll 80s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            <CardGroup />
            <CardGroup />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
