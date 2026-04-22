"use client";

import { useAudio } from "@/hooks/useAudio";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioToggle() {
  const { isMuted, toggleMute } = useAudio();

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-8 right-8 z-50 p-4 rounded-full glass hover:bg-white/10 transition-colors"
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-white/50" />
      ) : (
        <Volume2 className="w-5 h-5 text-primary animate-pulse" />
      )}
    </motion.button>
  );
}
