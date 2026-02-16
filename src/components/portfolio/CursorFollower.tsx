"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          x,
          y,
          position: "fixed",
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid rgba(26, 26, 26, 0.15)",
          pointerEvents: "none",
          zIndex: 9999,
          scale: hovering ? 1.8 : 1,
          opacity: hovering ? 0.6 : 0.4,
          transition: "scale 0.3s, opacity 0.3s",
        }}
      />
      {/* Inner dot */}
      <motion.div
        style={{
          x,
          y,
          position: "fixed",
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#1A1A1A",
          pointerEvents: "none",
          zIndex: 9999,
          scale: hovering ? 0 : 1,
          transition: "scale 0.3s",
        }}
      />
    </>
  );
}
