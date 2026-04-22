"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useAudio } from "@/hooks/useAudio";

interface TimelineSectionProps {
  time: string;
  title: string;
  description: string;
  visual?: React.ReactNode;
  className?: string;
  glitch?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  clickSFX?: string;
}

export function TimelineSection({ time, title, description, visual, className, glitch, onClick, clickSFX }: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { playSFX } = useAudio();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const moveX = useTransform(springX, [-0.5, 0.5], ["-15px", "15px"]);
  const moveY = useTransform(springY, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleSectionClick = (e: React.MouseEvent) => {
    if (clickSFX) playSFX(clickSFX);
    if (onClick) onClick(e);
  };

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={handleSectionClick}
      className={cn(
        "relative h-screen flex flex-col items-center justify-center px-4 md:px-20 overflow-hidden z-50 pointer-events-auto cursor-pointer",
        className
      )}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ scale, opacity, x: moveX, y: moveY }}
        className="z-10 max-w-5xl w-full text-center flex flex-col items-center space-y-8"
      >
        <motion.span 
          initial={{ opacity: 0, letterSpacing: "1.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.8em" }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-primary font-mono text-xs md:text-sm mb-4 block font-black uppercase glow-text-red"
        >
          {time}
        </motion.span>
        
        <h2 className={cn(
          "text-5xl md:text-9xl font-display font-black tracking-tighter text-glow leading-[0.9]",
          glitch && "glitch"
        )} data-text={glitch ? title : undefined}>
          {title.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(20px)", y: 40 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ 
                delay: i * 0.1, 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="inline-block mr-[0.2em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-lg md:text-2xl text-white/50 font-light leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </motion.div>

      {visual && (
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          {visual}
        </div>
      )}
    </section>
  );
}
