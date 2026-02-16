"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    number: "01",
    title: "Merhaba",
    description: "Ben Enes Emer. Ankara merkezli grafik tasarımcı ve sosyal medya uzmanıyım. Fikirleri görselleştiriyorum.",
  },
  {
    number: "02",
    title: "Uzmanlık",
    description: "Grafik Tasarım, Web Tasarım, Sosyal Medya Yönetimi — Adobe Photoshop, Illustrator, Premiere Pro ve Unity ile çalışan yaratıcı bir profesyonel.",
  },
  {
    number: "03",
    title: "Keşfet",
    description: "Her proje bir hikâye anlatıyor. Benimkileri görmek ister misiniz?",
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#F0F0F0] z-10">
        <motion.div
          className="h-full bg-[#1A1A1A]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute top-8 right-8 z-20 font-sans text-xs tracking-[0.15em] uppercase text-[#999] hover:text-[#1A1A1A] transition-colors duration-300"
      >
        Geç
      </button>

      {/* Step counter */}
      <div className="absolute top-8 left-8 z-20">
        <span className="font-sans text-xs tracking-[0.15em] text-[#ccc]">
          {steps[currentStep].number} / {String(steps.length).padStart(2, "0")}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-[700px]"
          >
            {/* Title */}
            <motion.h1
              className="font-serif text-6xl sm:text-7xl lg:text-8xl text-[#1A1A1A] mb-8"
            >
              {steps[currentStep].title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="font-sans text-lg sm:text-xl text-[#666] mb-14 leading-relaxed"
            >
              {steps[currentStep].description}
            </motion.p>

            {/* Button */}
            <button
              onClick={nextStep}
              disabled={isAnimating}
              className="btn-primary disabled:opacity-50"
            >
              {currentStep === steps.length - 1 ? "Başla" : "Devam"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Step indicators */}
        <div className="absolute bottom-12 flex items-center gap-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentStep(index)}
              className="group flex items-center gap-2"
            >
              <span
                className={`block h-[2px] transition-all duration-500 ${
                  index === currentStep
                    ? "w-10 bg-[#1A1A1A]"
                    : index < currentStep
                    ? "w-4 bg-[#999]"
                    : "w-4 bg-[#E5E5E5]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
