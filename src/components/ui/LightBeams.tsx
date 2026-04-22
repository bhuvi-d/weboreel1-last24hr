"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: "-10%", 
            y: 20 + Math.random() * 60 + "%",
            width: 100 + Math.random() * 200,
            opacity: 0.1 + Math.random() * 0.2
          }}
          animate={{ 
            x: "110%",
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)"
          }}
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i + 15}
          initial={{ 
            x: "110%", 
            y: 20 + Math.random() * 60 + "%",
            width: 100 + Math.random() * 200,
            opacity: 0.1 + Math.random() * 0.2
          }}
          animate={{ 
            x: "-10%",
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            boxShadow: "0 0 20px rgba(255, 62, 62, 0.5)"
          }}
        />
      ))}
    </div>
  );
}
