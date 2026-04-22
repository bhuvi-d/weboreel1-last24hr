"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GlitchOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-30">
      <motion.div
        animate={{ 
          y: ["-100%", "100%"],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-20"
      />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.05)_3px,rgba(255,255,255,0.05)_4px)]" />
    </div>
  );
}
