"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SteamParticlesProps {
  count?: number;
}

// Deterministic pseudo-random helper to keep useMemo pure
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function SteamParticles({ count = 200 }: SteamParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i + 1);
      const r2 = pseudoRandom(i + 101);
      const r3 = pseudoRandom(i + 201);
      const r4 = pseudoRandom(i + 301);

      // Clustered slightly around center plate with slight spread
      const radius = 0.2 + r1 * 0.7;
      const angle = r2 * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = r3 * 1.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      vel[i * 3] = (r4 - 0.5) * 0.003;
      vel[i * 3 + 1] = 0.008 + r1 * 0.012;
      vel[i * 3 + 2] = (r2 - 0.5) * 0.003;
    }

    return [pos, vel];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Rise up
      array[i * 3 + 1] += velocities[i * 3 + 1] * (delta * 60);
      // Subtle sway
      array[i * 3] += Math.sin(array[i * 3 + 1] * 3 + i) * 0.002;
      array[i * 3 + 2] += Math.cos(array[i * 3 + 1] * 3 + i) * 0.002;

      // Loop when particle reaches above 2.2 units
      if (array[i * 3 + 1] > 2.2) {
        array[i * 3 + 1] = 0.1 + Math.random() * 0.2;
        const radius = 0.2 + Math.random() * 0.6;
        const angle = Math.random() * Math.PI * 2;
        array[i * 3] = Math.cos(angle) * radius;
        array[i * 3 + 2] = Math.sin(angle) * radius;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#F6EFE6"
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
