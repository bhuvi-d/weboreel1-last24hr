"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, PerspectiveCamera, Sphere, OrbitControls } from "@react-three/drei";
import { useScroll as useFramerScroll } from "framer-motion";
import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useFramerScroll();
  
  useFrame((state) => {
    if (!meshRef.current || !atmosphereRef.current) return;
    
    const offset = scrollYProgress.get();
    
    // Rotation
    meshRef.current.rotation.y = offset * Math.PI * 2 + state.clock.getElapsedTime() * 0.05;
    
    // Atmosphere glow increases as we reach the end
    const glowIntensity = 0.2 + offset * 0.6;
    if (atmosphereRef.current.material) {
      (atmosphereRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity;
    }
    
    // Scale significantly as we scroll
    const s = 1.2 + offset * 1.8; 
    meshRef.current.scale.set(s, s, s);
    atmosphereRef.current.scale.set(s * 1.05, s * 1.05, s * 1.05);
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.5}
          metalness={0.5}
          emissive="#001a2d"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      <Sphere ref={atmosphereRef} args={[1.05, 64, 64]}>
        <meshBasicMaterial 
          color="#00f2ff" 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide} 
        />
      </Sphere>
    </group>
  );
}

function Scene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={1} color="#00f2ff" groundColor="#ff3e3e" />
      <pointLight position={[10, 10, 10]} intensity={3} color="#00f2ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff3e3e" />
      
      <Stars radius={100} depth={50} count={isMobile ? 3000 : 8000} factor={4} saturation={0} fade speed={0.4} />
      
      <Earth />

      <EffectComposer disableNormalPass>
        <Bloom 
          intensity={isMobile ? 0.8 : 1.5} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          mipmapBlur 
        />
        <ChromaticAberration offset={new THREE.Vector2(0.001, 0.001)} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

export default function MainCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
