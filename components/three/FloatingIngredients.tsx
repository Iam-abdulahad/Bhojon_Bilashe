"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingIngredientsProps {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}

export function FloatingIngredients({ pointer }: FloatingIngredientsProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate deterministic orbits and initial rotations for ingredients:
  // e.g., red chili peppers, star anise / spices, cardamom pods, bay leaves
  const items = useMemo(() => {
    return [
      // Chili 1
      { radius: 2.1, speed: 0.35, yOffset: 0.4, scale: 0.28, type: "chili", color: "#E8532B", phase: 0 },
      // Chili 2
      { radius: 2.4, speed: -0.28, yOffset: -0.3, scale: 0.22, type: "chili", color: "#FF6A3D", phase: Math.PI },
      // Star Anise / Spice cluster
      { radius: 1.9, speed: 0.45, yOffset: 0.8, scale: 0.24, type: "star", color: "#8E4A23", phase: 1.2 },
      // Cardamom Pod
      { radius: 2.3, speed: -0.38, yOffset: 0.1, scale: 0.2, type: "seed", color: "#7FA650", phase: 2.5 },
      // Saffron Strand / Herb
      { radius: 2.0, speed: 0.5, yOffset: -0.6, scale: 0.18, type: "seed", color: "#F2B84B", phase: 3.8 },
      // Clove / Spice
      { radius: 2.6, speed: -0.3, yOffset: 0.6, scale: 0.16, type: "star", color: "#4A2818", phase: 4.5 },
    ];
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Gentle reaction to pointer tilt
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.current.x * 0.25,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.current.y * 0.2,
      0.05
    );

    // Update children positions around orbits
    const children = groupRef.current.children;
    items.forEach((item, index) => {
      const child = children[index];
      if (child) {
        const angle = t * item.speed + item.phase;
        child.position.x = Math.cos(angle) * item.radius;
        child.position.z = Math.sin(angle) * item.radius;
        child.position.y = item.yOffset + Math.sin(t * 1.5 + index) * 0.12;

        // Tumble rotation
        child.rotation.x += 0.015;
        child.rotation.y += 0.02;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <group key={i} scale={item.scale}>
          {item.type === "chili" ? (
            // Procedural stylized curved chili
            <mesh castShadow>
              <coneGeometry args={[0.3, 1.4, 8]} />
              <meshStandardMaterial
                color={item.color}
                roughness={0.25}
                metalness={0.1}
                emissive="#400"
                emissiveIntensity={0.2}
              />
            </mesh>
          ) : item.type === "star" ? (
            // Procedural star anise / dry spice
            <mesh castShadow>
              <dodecahedronGeometry args={[0.5, 0]} />
              <meshStandardMaterial
                color={item.color}
                roughness={0.8}
                metalness={0.05}
              />
            </mesh>
          ) : (
            // Cardamom / herb leaf
            <mesh castShadow>
              <capsuleGeometry args={[0.2, 0.5, 4, 8]} />
              <meshStandardMaterial
                color={item.color}
                roughness={0.4}
                metalness={0.0}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}
