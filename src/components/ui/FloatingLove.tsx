"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingLove() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const pool = [
      "I always loved you.",
      "I forgive you.",
      "Come home.",
      "Wait for me.",
      "I'm sorry.",
      "See you in the stars.",
      "I'll never forget.",
      "Stay safe."
    ];
    setMessages(pool);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            x: [null, (Math.random() - 0.5) * 50 + "%"],
            y: [null, (Math.random() - 0.5) * 50 + "%"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute text-sm font-light italic whitespace-nowrap text-white"
        >
          {msg}
        </motion.div>
      ))}
    </div>
  );
}
