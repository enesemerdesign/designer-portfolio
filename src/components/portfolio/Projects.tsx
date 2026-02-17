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
      className="project-card group cursor-pointer"
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
      <div className="img-hover mb-6 relative bg-[var(--surface)]" style={{ aspectRatio: "4/5" }}>
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

      <div className="project-card-meta">
        <div>
          <p className="project-card-category">
            {project.category}
          </p>
          <h3 className="project-card-title group-hover:opacity-50">
            {project.title}
          </h3>
          <p className="project-card-client">{project.client}</p>
        </div>
        <span className="project-card-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function CardGroup() {
  return (
    <div className="flex gap-6 sm:gap-8 flex-shrink-0 pr-6 sm:pr-8">
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
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <span className="section-label block mb-6">
            01 — Çalışmalar
          </span>
          <h2 className="section-title">
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
          <div className="marquee-fade-right" />
          <div className="marquee-fade-left" />

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
