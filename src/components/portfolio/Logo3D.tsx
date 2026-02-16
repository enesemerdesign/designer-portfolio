"use client";

import React, { useRef, useMemo, MutableRefObject, Suspense, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

function LogoMesh({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const rotY = useRef(0);

  const svgData = useLoader(SVGLoader, "/logo/logo-black.svg");

  const data = useMemo(() => {
    if (!svgData.paths || svgData.paths.length === 0) return null;

    const allShapes: THREE.Shape[] = [];
    svgData.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      allShapes.push(...shapes);
    });

    if (allShapes.length === 0) return null;

    const depth = 100;

    const geos = allShapes.map((shape) =>
      new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelThickness: 12,
        bevelSize: 6,
        bevelSegments: 2,
        curveSegments: 8,
      })
    );

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    geos.forEach((geo) => {
      geo.computeBoundingBox();
      if (geo.boundingBox) {
        minX = Math.min(minX, geo.boundingBox.min.x);
        maxX = Math.max(maxX, geo.boundingBox.max.x);
        minY = Math.min(minY, geo.boundingBox.min.y);
        maxY = Math.max(maxY, geo.boundingBox.max.y);
      }
    });

    return {
      geos,
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
      dz: depth / 2,
      scale: 3.8 / Math.max(maxX - minX, maxY - minY),
    };
  }, [svgData]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    rotY.current += delta * 0.12;
    const mx = mouse.current.x;
    const my = mouse.current.y;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotY.current + mx * 0.4,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -0.3 + my * 0.2,
      0.05
    );
  });

  if (!data) return null;

  return (
    <group ref={groupRef} scale={[data.scale, -data.scale, data.scale]} rotation={[0, 0.3, 0]}>
      {data.geos.map((geo, i) => (
        <mesh key={i} geometry={geo} position={[-data.cx, -data.cy, -data.dz]}>
          <meshStandardMaterial
            color="#3a3a40"
            metalness={0.92}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function FallbackMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <torusKnotGeometry args={[1.2, 0.4, 64, 12]} />
        <meshStandardMaterial color="#c8c8ce" metalness={0.92} roughness={0.1} />
      </mesh>
    </group>
  );
}

interface Logo3DProps {
  className?: string;
}

export default function Logo3D({ className = "" }: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = 0;
    mouseRef.current.y = 0;
  }, []);

  if (!mounted) return <div className={className} />;

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 36, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.4;
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[8, 6, 10]} intensity={3.5} />
        <directionalLight position={[-6, -2, 8]} intensity={1.2} color="#d0d0ff" />
        <spotLight position={[0, 10, 5]} intensity={2} angle={0.3} penumbra={0.6} />

        <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.12}>
          <Suspense fallback={<FallbackMesh />}>
            <LogoMesh mouse={mouseRef} />
          </Suspense>
        </Float>
      </Canvas>
    </div>
  );
}
