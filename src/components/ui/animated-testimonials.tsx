"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback, useMemo } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  // Pre-compute rotations so they don't change on every render
  const rotations = useMemo(
    () => testimonials.map(() => Math.floor(Math.random() * 21) - 10),
    [testimonials]
  );

  return (
    <div className={className ?? "mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12"}>
      {/* Image */}
      <div className="relative h-64 sm:h-72 w-full mb-14">
        <AnimatePresence>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.src}
              initial={{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotate: rotations[index],
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : rotations[index],
                zIndex: isActive(index)
                  ? 40
                  : testimonials.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: rotations[index],
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="absolute inset-0 origin-bottom"
            >
              <Image
                src={testimonial.src}
                alt={testimonial.name}
                width={500}
                height={500}
                draggable={false}
                className="h-full w-full rounded-3xl object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Text + Controls */}
      <div className="relative z-10">
      <motion.div
        key={active}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <h3 className="text-lg font-bold text-[var(--fg)]">
          {testimonials[active].name}
        </h3>
        <p className="text-xs text-[var(--fg-muted)]">
          {testimonials[active].designation}
        </p>
        <motion.p className="mt-3 text-sm text-[var(--fg-dim)] leading-relaxed">
          {testimonials[active].quote.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{
                filter: "blur(10px)",
                opacity: 0,
                y: 5,
              }}
              animate={{
                filter: "blur(0px)",
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                delay: 0.02 * index,
              }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handlePrev}
          className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-alt)]"
        >
          <IconArrowLeft className="h-4 w-4 text-[var(--fg)] group-hover/button:rotate-12 transition-transform duration-300" />
        </button>
        <button
          onClick={handleNext}
          className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-alt)]"
        >
          <IconArrowRight className="h-4 w-4 text-[var(--fg)] group-hover/button:-rotate-12 transition-transform duration-300" />
        </button>
      </div>
      </div>
    </div>
  );
};
