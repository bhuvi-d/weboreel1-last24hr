"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Effect {
  id: number;
  x: number;
  y: number;
  type: "heart" | "alert" | "honk" | "bubble" | "warmth" | "peace" | "whisper" | "star";
  vx: number;
  vy: number;
}

export function VisualEffects() {
  const [effects, setEffects] = useState<Effect[]>([]);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      const sectionIndex = Math.floor((scrollY + height / 2) / height);
      
      let type: Effect["type"] = "bubble";
      if (showHint) setShowHint(false);

      if (sectionIndex === 1) type = "alert";
      else if (sectionIndex === 2) type = "honk";
      else if (sectionIndex === 3) type = "warmth";
      else if (sectionIndex === 4) type = "heart";
      else if (sectionIndex === 5) type = "peace";
      else if (sectionIndex === 6) type = "bubble";
      else if (sectionIndex === 7) type = "whisper";
      else if (sectionIndex === 8) type = "star";
      else return; 

      // Create a burst of effects
      const burstCount = type === "alert" ? 3 : 8;
      const newBurst: Effect[] = Array.from({ length: burstCount }).map((_, i) => ({
        id: Date.now() + i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 600,
        vy: (Math.random() - 0.5) * 600,
        type
      }));

      setEffects((prev) => [...prev, ...newBurst]);
      
      setTimeout(() => {
        setEffects((prev) => prev.filter((eff) => !newBurst.find(b => b.id === eff.id)));
      }, 2000);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {effects.map((eff) => (
          <motion.div
            key={eff.id}
            initial={{ opacity: 0, scale: 0, x: eff.x, y: eff.y }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0.5, 2, 0.5],
              x: eff.x + eff.vx,
              y: eff.y + eff.vy,
              rotate: (Math.random() - 0.5) * 360
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          >
            {eff.type === "heart" && (
              <span className="text-4xl">❤️</span>
            )}
            {eff.type === "alert" && (
              <span className="text-red-600 font-display font-black text-6xl tracking-tighter shadow-2xl">RED ALERT</span>
            )}
            {eff.type === "honk" && (
              <span className="text-white font-mono font-bold text-3xl opacity-80 italic">HONK!</span>
            )}
            {eff.type === "bubble" && (
              <div className="w-12 h-12 rounded-full border-2 border-secondary/50 shadow-[0_0_20px_rgba(0,242,255,0.5)]" />
            )}
            {eff.type === "warmth" && (
              <div className="w-20 h-20 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
            )}
            {eff.type === "peace" && (
              <span className="text-4xl">🕊️</span>
            )}
            {eff.type === "whisper" && (
              <span className="text-white/40 font-light text-xl tracking-[0.5em]">hush</span>
            )}
            {eff.type === "star" && (
              <span className="text-2xl text-yellow-200 shadow-[0_0_10px_white]">✦</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 text-primary font-mono text-sm uppercase tracking-[0.5em] animate-pulse z-[300] bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-primary/20"
          >
            Click to interact
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
