"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { FloatingLove } from "@/components/ui/FloatingLove";
import { LightBeams } from "@/components/ui/LightBeams";
import { GlitchOverlay } from "@/components/ui/GlitchOverlay";
import { VisualEffects } from "@/components/ui/VisualEffects";
import { Typewriter } from "@/components/ui/Typewriter";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useAudio } from "@/hooks/useAudio";

// Dynamically import Canvas to avoid SSR issues with Three.js
const MainCanvas = dynamic(() => import("@/components/canvas/MainCanvas"), {
  ssr: false,
});

export default function Home() {
  const { playSFX } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const flashOpacity = useTransform(scrollYProgress, [0.98, 0.99, 1], [0, 1, 0]);

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (v > 0.985 && v < 0.99) {
        // Emotional climax sound
        playSFX("https://assets.mixkit.co/sfx/preview/mixkit-ethereal-fairy-dust-shimmer-2001.mp3");
      }
    });
  }, [playSFX, scrollYProgress]);

  const [mounted, setMounted] = useState(false);
  const [journal, setJournal] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = () => {
    if (!journal.trim()) return;
    localStorage.setItem("last_words", journal);
    setIsSubmitted(true);
  };

  if (!mounted) return null;

  return (
    <main className="relative" ref={containerRef}>
      <VisualEffects />
      {/* Final Flash Overlay */}
      <motion.div 
        className="fixed inset-0 bg-white z-[150] pointer-events-none"
        style={{ opacity: flashOpacity }}
      />
      {/* Cinematic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <AudioToggle />
      <MainCanvas />

      {/* Sections */}
      <div className="relative z-10">
        <HeroSection />

        <TimelineSection 
          time="T-24 HOURS"
          title="The Silence Breaks"
          description="News alerts explode worldwide. Scientists confirm the unstoppable. Panic begins to ripple through the streets, but the stars remain indifferent."
          className="bg-black/20"
          glitch
          visual={<GlitchOverlay />}
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-glitch-digital-interference-2503.mp3"
        />

        <TimelineSection 
          time="T-20 HOURS"
          title="The Great Gridlock"
          description="Traffic jams stretch for hundreds of miles. People are trying to get... somewhere. Anywhere that feels like home. The world is moving, yet standing still."
          visual={<LightBeams />}
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-car-horn-distant-771.mp3"
        />

        <TimelineSection 
          time="T-16 HOURS"
          title="Warm Windows"
          description="The movement stops. People run home. Families reunite. Warm windows light up across the globe as we gather one last time."
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-magic-marimba-shimmer-sfx-2815.mp3"
        />

        <TimelineSection 
          time="T-12 HOURS"
          title="Digital Echoes"
          description="Love confessions flood the internet. 'I always loved you.' 'I forgive you.' 'Come home.' The digital world becomes a sanctuary of truth."
          visual={<FloatingLove />}
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-back-2575.mp3"
        />

        <TimelineSection 
          time="T-8 HOURS"
          title="Dissolving Borders"
          description="Wars stop. Arguments fade. Borders mean nothing when the sky is falling. We are finally, briefly, one humanity."
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-meditation-bowl-single-hit-2092.mp3"
        />

        <TimelineSection 
          time="T-6 HOURS"
          title="The Ocean Glows"
          description="A strange bioluminescence begins to pulse in the depths. The Earth itself is putting on a final show, a glowing blue goodbye."
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-water-splash-1121.mp3"
        />

        <TimelineSection 
          time="T-4 HOURS"
          title="Absolute Silence"
          description="The cities go silent. No traffic. No ads. No noise. Only the wind whispering through empty canyons of glass and steel."
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-wind-gust-1205.mp3"
        />

        <TimelineSection 
          time="T-2 HOURS"
          title="Under the Stars"
          description="Millions of silhouettes stand together, heads tilted back. We are all watching the same sky, waiting for the final light."
          clickSFX="https://assets.mixkit.co/sfx/preview/mixkit-ethereal-fairy-dust-shimmer-2001.mp3"
        />

        {/* Final Hour Section */}
        <section className="h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="max-w-xl w-full space-y-12 z-10"
          >
            <div className="space-y-4">
              <h2 className="text-primary font-mono text-xl tracking-tighter glow-text-red">T-1 HOUR</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-glow">The Final Reflection</h3>
            </div>

            {!isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                  <textarea 
                    value={journal}
                    onChange={(e) => setJournal(e.target.value)}
                    placeholder="What would you do with one hour left? Your words will be the last to fade..."
                    className="relative w-full h-48 bg-black/40 border border-white/10 rounded-xl p-6 text-white focus:outline-none focus:border-primary/50 transition-all resize-none glass backdrop-blur-xl text-lg font-light leading-relaxed"
                  />
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="group relative px-12 py-4 bg-transparent text-white font-bold rounded-full overflow-hidden border border-white/20 transition-all hover:border-primary/50"
                >
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-primary/20 transition-colors" />
                  <span className="relative z-10 tracking-widest uppercase text-sm">Seal your words</span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-12"
              >
                <div className="relative py-12 px-8">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-50" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary opacity-50" />
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 2 }}
                    className="text-2xl md:text-3xl font-display italic text-white/90 leading-relaxed max-w-2xl"
                  >
                    "{journal}"
                  </motion.p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-primary uppercase tracking-[0.4em] text-sm font-bold">Transmission Sent</h3>
                  <p className="text-white/30 text-xs uppercase tracking-widest">Recorded at the Edge of Time</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Background particles for this section */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full animate-pulse delay-1000" />
          </div>
        </section>

        {/* The Sunrise - Final Scene */}
        <section className="h-screen flex flex-col items-center justify-center px-4 text-center relative bg-gradient-to-t from-orange-500/20 to-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="space-y-8 z-10"
          >
            <h2 className="text-4xl md:text-7xl font-display font-black text-glow">
              <Typewriter text="Maybe the end made us human again." delay={1} />
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 5, duration: 2 }}
              className="text-white/20 uppercase tracking-[0.8em] text-xs"
            >
              End of Transmission
            </motion.p>
          </motion.div>
        </section>

        {/* Credits/Restart */}
        <section className="h-screen flex flex-col items-center justify-center px-4 text-center bg-black">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-6xl font-light">Call someone you love today.</h2>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-primary uppercase tracking-widest text-sm hover:text-white transition-colors border-b border-primary pb-1"
            >
              Replay the Journey
            </button>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
