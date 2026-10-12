"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DishModelProps {
  modelUrl?: string;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}

export function DishModel({ pointer }: DishModelProps) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Idle float (sin bob)
    meshRef.current.position.y = Math.sin(t * 1.2) * 0.06;

    // Base continuous slow rotate
    meshRef.current.rotation.y += 0.005;

    // Pointer-driven damped tilt (lerp 0.08)
    const targetRotX = 0.28 + pointer.current.y * 0.25;
    const targetRotZ = -pointer.current.x * 0.22;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotX,
      0.08
    );
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      targetRotZ,
      0.08
    );
  });

  // Stylized procedural plate + warm gourmet biryani / grilled meat mound
  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Heavy matte-black ceramic artisanal plate */}
      <mesh receiveShadow castShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.75, 1.35, 0.2, 48]} />
        <meshStandardMaterial
          color="#161210"
          roughness={0.65}
          metalness={0.2}
        />
      </mesh>

      {/* Plate rim bevel */}
      <mesh receiveShadow castShadow position={[0, -0.05, 0]}>
        <torusGeometry args={[1.7, 0.07, 16, 48]} />
        <meshStandardMaterial
          color="#221A16"
          roughness={0.7}
          metalness={0.25}
        />
      </mesh>

      {/* Saffron & spice glazed biryani rice mound */}
      <mesh castShadow position={[0, 0.12, 0]}>
        <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshStandardMaterial
          color="#F2B84B"
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* Tender charcoal-roasted meat pieces on top */}
      <group position={[0, 0.52, 0]}>
        <mesh castShadow position={[-0.25, 0, 0.15]} rotation={[0.2, 0.4, 0]}>
          <boxGeometry args={[0.55, 0.35, 0.45]} />
          <meshStandardMaterial
            color="#5C1F0E"
            roughness={0.6}
            metalness={0.15}
          />
        </mesh>
        <mesh castShadow position={[0.28, 0.05, -0.1]} rotation={[-0.3, 0.6, 0.2]}>
          <boxGeometry args={[0.5, 0.32, 0.4]} />
          <meshStandardMaterial
            color="#742A16"
            roughness={0.55}
            metalness={0.18}
          />
        </mesh>
        <mesh castShadow position={[0.02, 0.14, -0.05]} rotation={[0.4, -0.2, 0.1]}>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color="#8F351B"
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      </group>

      {/* Fresh coriander / herb garnish on top */}
      <mesh castShadow position={[0.05, 0.72, 0.05]} rotation={[0.1, 0.8, -0.2]}>
        <tetrahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#7FA650"
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Saffron glaze ring accent */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.45, 32]} />
        <meshStandardMaterial
          color="#E8532B"
          emissive="#E8532B"
          emissiveIntensity={0.2}
          roughness={0.3}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}
