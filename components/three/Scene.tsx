"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { LightingRig } from "./LightingRig";
import { DishModel } from "./DishModel";
import { FloatingIngredients } from "./FloatingIngredients";
import { SteamParticles } from "./SteamParticles";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-touch-device";

interface SceneProps {
  modelUrl?: string;
  className?: string;
}

export function Scene({ modelUrl, className }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [isInViewport, setIsInViewport] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);

  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();

  // Test WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl") ||
        canvas.getContext("webgl2");
      if (!gl) {
        requestAnimationFrame(() => setHasWebGL(false));
      }
    } catch {
      requestAnimationFrame(() => setHasWebGL(false));
    }
  }, []);

  // Track page visibility to pause rendering when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Track viewport visibility to pause off-screen rendering
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track pointer movements normalized between [-1, 1]
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  // If reduced motion is preferred or WebGL is not available, render clean appetizing poster fallback
  if (prefersReduced || !hasWebGL) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
        aria-label="3D Signature Dish Showcase Fallback"
      >
        <div className="relative flex flex-col items-center text-center p-8">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-accent/30 bg-radial from-primary/20 to-bg-elevated shadow-glow">
            <span className="font-display text-4xl font-bold text-accent">
              Bhojon
            </span>
          </div>
          <p className="mt-4 font-label text-xs tracking-widest text-muted">
            SIGNATURE SMOKED KACCHI BIRYANI
          </p>
        </div>
      </div>
    );
  }

  const shouldRender = isInViewport && isTabVisible;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative h-full w-full ${className}`}
      aria-label="Interactive 3D Dish Showcase"
    >
      <Canvas
        frameloop={shouldRender ? "always" : "demand"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.8, 4.2], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        className="touch-none"
      >
        <Suspense fallback={null}>
          <LightingRig />
          <DishModel modelUrl={modelUrl} pointer={pointer} />
          <FloatingIngredients pointer={pointer} />
          {/* Mobile uses 80 particles, desktop uses 260 */}
          <SteamParticles count={isTouch ? 80 : 260} />
        </Suspense>
      </Canvas>
    </div>
  );
}
