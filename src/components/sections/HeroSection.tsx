"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { formatted } = useCountdown();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const moveX = useTransform(springX, [-0.5, 0.5], ["-20px", "20px"]);
  const moveY = useTransform(springY, [-0.5, 0.5], ["-20px", "20px"]);

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: moveX, y: moveY }}
        className="z-10 relative flex flex-col items-center justify-center w-full max-w-5xl mt-[-2rem]"
      >
        <motion.div 
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-xs md:text-sm uppercase tracking-[0.6em] text-primary mb-6 md:mb-8 font-black flex items-center justify-center gap-4 w-full"
        >
          <span className="w-8 md:w-12 h-[1px] bg-primary/30" />
          Final Transmission
          <span className="w-8 md:w-12 h-[1px] bg-primary/30" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-[10rem] lg:text-[12rem] font-display font-black tracking-tighter mb-6 md:mb-12 text-glow leading-none select-none w-full"
        >
          {formatted}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl font-light text-white/40 max-w-3xl mx-auto leading-relaxed italic px-4 w-full"
        >
          "The stars have begun to dim. We have 24 hours to say everything we never said."
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.8, type: "spring", damping: 12 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 md:gap-8 z-[100] w-full"
      >
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <motion.span 
            animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-primary font-display font-black text-lg sm:text-xl md:text-4xl lg:text-5xl uppercase tracking-widest text-glow-red text-center w-full px-4"
          >
            Click along the way to interact
          </motion.span>
          <div className="w-16 md:w-24 h-[1px] bg-primary/20" />
        </div>

        <div className="flex flex-col items-center gap-3 md:gap-4 opacity-40 hover:opacity-100 transition-opacity">
          <span className="text-white font-mono text-[10px] md:text-xs uppercase tracking-[1em] md:tracking-[1.5em] ml-[1em] md:ml-[1.5em] text-center w-full">
            Keep scrolling
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black pointer-events-none opacity-80" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)] pointer-events-none" />
    </section>
  );
}
