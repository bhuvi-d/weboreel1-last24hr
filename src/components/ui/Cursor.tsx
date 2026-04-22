"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[100] mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100]"
        animate={{ x: mousePos.x - 4, y: mousePos.y - 4 }}
        transition={{ type: "spring", stiffness: 1000, damping: 20, mass: 0.1 }}
      />
    </>
  );
}
