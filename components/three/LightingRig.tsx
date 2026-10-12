"use client";

import { ContactShadows } from "@react-three/drei";

export function LightingRig() {
  return (
    <>
      {/* Warm dining-room key light (#FFD9A8, intensity 2.2) */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.2}
        color="#FFD9A8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Sizzling cool-red rim light (#E8532B) from opposite flank */}
      <spotLight
        position={[-5, 3, -3]}
        intensity={2.8}
        color="#E8532B"
        angle={0.6}
        penumbra={0.8}
      />

      {/* Saffron accent rim from bottom front */}
      <pointLight
        position={[0, -2, 3]}
        intensity={1.2}
        color="#F2B84B"
      />

      {/* Soft ambient fill (0.45) so dark shadows remain rich & appetizing */}
      <ambientLight intensity={0.45} color="#2A1812" />

      {/* Soft contact shadow under the plate */}
      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.6}
        scale={6}
        blur={2.4}
        far={3}
        color="#0B0807"
      />
    </>
  );
}
