"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// ─── Lerp helper ───────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ─── Eye that tracks the cursor ────────────────────────────────────────────
function Eye({
  position,
  mouse,
}: {
  position: [number, number, number];
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const pupilRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!pupilRef.current) return;
    pupilRef.current.position.x = lerp(pupilRef.current.position.x, mouse.current.x * 0.06, 0.1);
    pupilRef.current.position.y = lerp(pupilRef.current.position.y, mouse.current.y * 0.04, 0.1);
  });

  return (
    <group position={position}>
      {/* White sclera — reduced segments */}
      <mesh>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshStandardMaterial color="#e8e8ff" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Iris */}
      <mesh position={[0, 0, 0.09]}>
        <circleGeometry args={[0.075, 16]} />
        <meshStandardMaterial color="#7c3aed" roughness={0.2} emissive="#6d28d9" emissiveIntensity={0.6} />
      </mesh>
      {/* Pupil — tracks cursor */}
      <mesh ref={pupilRef} position={[0, 0, 0.115]}>
        <circleGeometry args={[0.038, 12]} />
        <meshStandardMaterial color="#0a0a1a" roughness={0.0} />
      </mesh>
      {/* Specular glint */}
      <mesh position={[0.032, 0.032, 0.13]}>
        <circleGeometry args={[0.014, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// ─── Full Robot Body ────────────────────────────────────────────────────────
function RobotBody({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const headRef    = useRef<THREE.Group>(null);
  const bodyRef    = useRef<THREE.Group>(null);
  const armLRef    = useRef<THREE.Group>(null);
  const armRRef    = useRef<THREE.Group>(null);
  const earLRef    = useRef<THREE.Mesh>(null);
  const earRRef    = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  const clock = useRef(0);

  useFrame((_, delta) => {
    clock.current += delta;
    const mx = mouse.current.x;
    const my = mouse.current.y;
    const t  = clock.current;

    if (headRef.current) {
      headRef.current.rotation.y = lerp(headRef.current.rotation.y, mx * 0.5, 0.06);
      headRef.current.rotation.x = lerp(headRef.current.rotation.x, -my * 0.28, 0.06);
    }
    if (bodyRef.current) {
      bodyRef.current.rotation.y = lerp(bodyRef.current.rotation.y, mx * -0.07, 0.04);
      bodyRef.current.position.y = lerp(
        bodyRef.current.position.y,
        -1.4 + Math.sin(t * 0.8) * 0.035,
        0.04
      );
    }
    if (armLRef.current) {
      armLRef.current.rotation.z = lerp(armLRef.current.rotation.z, 0.45 + Math.sin(t * 0.65) * 0.06, 0.05);
    }
    if (armRRef.current) {
      armRRef.current.rotation.z = lerp(armRRef.current.rotation.z, -0.45 + Math.sin(t * 0.65 + 1) * 0.06, 0.05);
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 1.6) * 0.1;
    }
    // Ear pulse — mutate existing material property (no new objects)
    if (earLRef.current && earLRef.current.material instanceof THREE.MeshStandardMaterial) {
      earLRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2.5) * 0.4;
    }
    if (earRRef.current && earRRef.current.material instanceof THREE.MeshStandardMaterial) {
      earRRef.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2.5 + Math.PI) * 0.4;
    }
  });

  const metalGray:   THREE.MeshStandardMaterialParameters = { color: "#1e1b4b", roughness: 0.3, metalness: 0.8 };
  const lightPurple: THREE.MeshStandardMaterialParameters = { color: "#4c1d95", roughness: 0.25, metalness: 0.85 };
  const glowCyan:    THREE.MeshStandardMaterialParameters = { color: "#06b6d4", roughness: 0.15, metalness: 0.5, emissive: "#06b6d4" as unknown as THREE.ColorRepresentation, emissiveIntensity: 0.7 };
  const glowPurple:  THREE.MeshStandardMaterialParameters = { color: "#8b5cf6", roughness: 0.15, metalness: 0.45, emissive: "#7c3aed" as unknown as THREE.ColorRepresentation, emissiveIntensity: 0.9 };

  return (
    <group>
      {/* ── HEAD ── */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.82, 0.82]} />
          <meshStandardMaterial {...metalGray} />
        </mesh>

        {/* Face plate */}
        <mesh position={[0, 0, 0.415]}>
          <boxGeometry args={[0.78, 0.68, 0.04]} />
          <meshStandardMaterial color="#0f0a2e" roughness={0.05} metalness={0.3} />
        </mesh>

        {/* Eyes */}
        <Eye position={[-0.2, 0.08, 0.44]} mouse={mouse} />
        <Eye position={[ 0.2, 0.08, 0.44]} mouse={mouse} />

        {/* Welcoming Smile — arc of blocks */}
        {[
          { x: -0.14, y: -0.12, r:  0.38 },
          { x: -0.07, y: -0.16, r:  0.18 },
          { x:  0,    y: -0.17, r:  0    },
          { x:  0.07, y: -0.16, r: -0.18 },
          { x:  0.14, y: -0.12, r: -0.38 },
        ].map((pt, i) => (
          <mesh key={i} position={[pt.x, pt.y, 0.435]} rotation={[0, 0, pt.r]}>
            <boxGeometry args={[0.055, 0.032, 0.01]} />
            <meshStandardMaterial {...glowCyan} emissiveIntensity={0.9} />
          </mesh>
        ))}

        {/* Cheek blush dots */}
        {([-0.3, 0.3] as const).map((x, i) => (
          <mesh key={i} position={[x, -0.04, 0.42]}>
            <circleGeometry args={[0.04, 8]} />
            <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.6} transparent opacity={0.55} />
          </mesh>
        ))}

        {/* Left ear glow */}
        <mesh ref={earLRef} position={[-0.48, 0.05, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.15, 10]} />
          <meshStandardMaterial {...glowCyan} emissive="#06b6d4" emissiveIntensity={0.8} />
        </mesh>

        {/* Right ear glow */}
        <mesh ref={earRRef} position={[0.48, 0.05, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.15, 10]} />
          <meshStandardMaterial {...glowPurple} emissive="#7c3aed" emissiveIntensity={0.8} />
        </mesh>

        {/* Antenna */}
        <group position={[0, 0.48, 0]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
            <meshStandardMaterial {...lightPurple} />
          </mesh>
          <mesh ref={antennaRef} position={[0, 0.28, 0]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial {...glowPurple} emissive="#a855f7" emissiveIntensity={1.8} />
          </mesh>
        </group>

        {/* Head panel line */}
        <mesh position={[0, 0.3, 0.415]}>
          <boxGeometry args={[0.6, 0.012, 0.01]} />
          <meshBasicMaterial color="#4c1d95" />
        </mesh>
      </group>

      {/* ── NECK ── */}
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.2, 10]} />
        <meshStandardMaterial {...metalGray} />
      </mesh>

      {/* ── TORSO ── */}
      <group ref={bodyRef} position={[0, -1.4, 0]}>
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[1.05, 0.85, 0.62]} />
          <meshStandardMaterial {...metalGray} />
        </mesh>

        {/* Chest glowing panel */}
        <mesh position={[0, 1.18, 0.32]}>
          <boxGeometry args={[0.55, 0.45, 0.03]} />
          <meshStandardMaterial color="#0f0a2e" roughness={0.05} />
        </mesh>

        {/* Chest core orb — simple glowing sphere, no distort */}
        <mesh position={[0, 1.18, 0.36]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.05}
            metalness={0.6}
            emissive="#7c3aed"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Shoulder bolts */}
        {([-0.56, 0.56] as const).map((x, i) => (
          <mesh key={i} position={[x, 1.15, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.12, 8]} />
            <meshStandardMaterial {...lightPurple} />
          </mesh>
        ))}

        {/* Waist */}
        <mesh position={[0, 0.68, 0]}>
          <boxGeometry args={[0.82, 0.22, 0.5]} />
          <meshStandardMaterial {...lightPurple} />
        </mesh>

        {/* Leg stubs */}
        {([-0.24, 0.24] as const).map((x, i) => (
          <group key={i} position={[x, 0.38, 0]}>
            <mesh>
              <boxGeometry args={[0.28, 0.48, 0.34]} />
              <meshStandardMaterial {...metalGray} />
            </mesh>
            <mesh position={[0, -0.26, 0.15]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial {...glowCyan} emissive="#06b6d4" emissiveIntensity={0.6} />
            </mesh>
          </group>
        ))}

        {/* Left arm */}
        <group ref={armLRef} position={[-0.72, 1.15, 0]} rotation={[0, 0, 0.45]}>
          <mesh position={[0, -0.32, 0]}>
            <boxGeometry args={[0.22, 0.65, 0.22]} />
            <meshStandardMaterial {...metalGray} />
          </mesh>
          <mesh position={[0, -0.72, 0]}>
            <boxGeometry args={[0.26, 0.26, 0.2]} />
            <meshStandardMaterial {...lightPurple} />
          </mesh>
          {[-0.07, 0, 0.07].map((x, i) => (
            <mesh key={i} position={[x, -0.94, 0.05]}>
              <boxGeometry args={[0.055, 0.18, 0.055]} />
              <meshStandardMaterial color="#312e81" roughness={0.3} metalness={0.8} />
            </mesh>
          ))}
        </group>

        {/* Right arm */}
        <group ref={armRRef} position={[0.72, 1.15, 0]} rotation={[0, 0, -0.45]}>
          <mesh position={[0, -0.32, 0]}>
            <boxGeometry args={[0.22, 0.65, 0.22]} />
            <meshStandardMaterial {...metalGray} />
          </mesh>
          <mesh position={[0, -0.72, 0]}>
            <boxGeometry args={[0.26, 0.26, 0.2]} />
            <meshStandardMaterial {...lightPurple} />
          </mesh>
          {[-0.07, 0, 0.07].map((x, i) => (
            <mesh key={i} position={[x, -0.94, 0.05]}>
              <boxGeometry args={[0.055, 0.18, 0.055]} />
              <meshStandardMaterial color="#312e81" roughness={0.3} metalness={0.8} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

// ─── Main ThreeAvatar export ────────────────────────────────────────────────
export default function ThreeAvatar() {
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!mounted) {
    return <div style={{ width: "100%", height: "100%", background: "transparent" }} />;
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 42 }}
        gl={{
          antialias: false,          // Disabled — biggest FPS gain on integrated GPUs
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        dpr={Math.min(window.devicePixelRatio, 1.5)}  // Cap pixel ratio
        shadows={false}                                 // Disabled — shadows are expensive
        frameloop="always"
      >
        {/* Minimal lighting — 2 lights max */}
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 5, 4]} intensity={1.6} color="#c4b5fd" />
        <pointLight position={[-3, 2, 3]} intensity={1.0} color="#06b6d4" />

        <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.28}>
          <RobotBody mouse={mouseRef} />
        </Float>
      </Canvas>
    </div>
  );
}
