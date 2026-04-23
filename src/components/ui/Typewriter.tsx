"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
}

export function Typewriter({ text, delay = 0 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let currentText = "";
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentText.length < text.length) {
          currentText = text.slice(0, currentText.length + 1);
          setDisplayText(currentText);
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay, isInView]);

  return (
    <motion.span ref={ref} className="font-display italic text-white/90">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
      />
    </motion.span>
  );
}
