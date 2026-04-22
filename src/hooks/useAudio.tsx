"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (url: string) => void;
  playSFX: (url: string) => void;
  setAmbientScene: (scene: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AMBIENT_TRACKS: Record<string, string> = {
  default: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Space drone
  panic: "https://assets.mixkit.co/sfx/preview/mixkit-glitch-digital-interference-2503.mp3", // Glitchy drone
  love: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Soft piano
  silence: "https://assets.mixkit.co/sfx/preview/mixkit-wind-gust-1205.mp3", // Wind
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    ambientRef.current = new Audio(AMBIENT_TRACKS.default);
    ambientRef.current.loop = true;
    ambientRef.current.volume = 0.3;

    return () => {
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!hasInteracted) setHasInteracted(true);
    const newMute = !isMuted;
    setIsMuted(newMute);
    if (ambientRef.current) {
      if (newMute) {
        ambientRef.current.pause();
      } else {
        ambientRef.current.play().catch(e => console.error("Autoplay blocked", e));
      }
    }
  };

  const playSFX = (url: string) => {
    if (isMuted) return;
    const sfx = new Audio(url);
    sfx.volume = 0.4;
    sfx.play().catch(() => {});
  };

  const playSound = playSFX;

  const setAmbientScene = (scene: string) => {
    if (!ambientRef.current || isMuted) return;
    const trackUrl = AMBIENT_TRACKS[scene] || AMBIENT_TRACKS.default;
    
    // Simple crossfade
    const oldAudio = ambientRef.current;
    const newAudio = new Audio(trackUrl);
    newAudio.loop = true;
    newAudio.volume = 0;
    
    if (!isMuted) {
      newAudio.play().catch(() => {});
      // Fade out old, fade in new
      let vol = 0;
      const interval = setInterval(() => {
        vol += 0.05;
        newAudio.volume = Math.min(vol * 0.3, 0.3);
        oldAudio.volume = Math.max(0.3 - vol * 0.3, 0);
        if (vol >= 1) {
          clearInterval(interval);
          oldAudio.pause();
          ambientRef.current = newAudio;
        }
      }, 50);
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSound, playSFX, setAmbientScene }}>
      {children}
      {!hasInteracted && isMuted && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-3xl cursor-pointer"
          onClick={toggleMute}
        >
          <motion_div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-7xl font-display font-black text-glow uppercase tracking-tighter">
              Activate Atmosphere
            </h2>
            <p className="text-primary font-mono text-sm tracking-[0.5em] animate-pulse">
              Tap to enter the final day
            </p>
          </motion_div>
        </div>
      )}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Internal motion div for the provider
import { motion as motion_div } from "framer-motion";
