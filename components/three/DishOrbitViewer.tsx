"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { DishModel } from "@/components/three/DishModel";
import { LightingRig } from "@/components/three/LightingRig";
import { SteamParticles } from "@/components/three/SteamParticles";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

interface DishOrbitViewerProps {
  modelUrl?: string;
  name: string;
}

export function DishOrbitViewer({ modelUrl, name }: DishOrbitViewerProps) {
  const pointer = useRef({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-border bg-bg-soft p-8 text-center">
        <div>
          <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-full border border-accent/40 bg-radial from-primary/30 to-bg-elevated shadow-gold">
            <span className="font-display text-4xl text-accent">3D</span>
          </div>
          <p className="font-display text-lg text-cream">{name}</p>
          <p className="text-xs text-muted mt-1">Static view (reduced motion active)</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#251510] via-bg-elevated to-bg"
      aria-label={`Interactive 3D viewer for ${name}`}
    >
      <Canvas
        camera={{ position: [0, 2.2, 3.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <LightingRig />
        <DishModel modelUrl={modelUrl} pointer={pointer} />
        <SteamParticles count={140} />
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.65}
          scale={5}
          blur={2.5}
          far={3}
          color="#0B0807"
        />
        {/* Orbit Controls with bounded angles and zoom */}
        <OrbitControls
          enableZoom={true}
          minDistance={2.4}
          maxDistance={5.5}
          maxPolarAngle={Math.PI / 2 - 0.05} // Do not go underneath the plate
          minPolarAngle={Math.PI / 6}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Floating User Controls Hint */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-muted">
        <span className="rounded-full bg-bg/80 px-3 py-1 backdrop-blur-md border border-border">
          🖱️ Drag to orbit · Scroll to zoom
        </span>
        <span className="hidden sm:inline-block rounded-full bg-bg/80 px-3 py-1 backdrop-blur-md border border-border">
          ✨ Auto-rotating
        </span>
      </div>
    </div>
  );
}
