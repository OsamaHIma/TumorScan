"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";

const Brain = ({ isMobile }) => {
  const brain = useGLTF("/models/tumors/scene.gltf");
  // Rotate the phone mesh every frame
  useFrame(({ clock }) => {
    brain.scene.rotation.y = clock.getElapsedTime() * 0.3; // Modify rotation speed here
  });
  return (
    <mesh>
      <ambientLight intensity={10} />
      <pointLight intensity={10} position={[10, 10, 10]} />

      <hemisphereLight intensity={0.15} groundColor="black" />

      <directionalLight
        color={0x4066ff}
        intensity={8.8}
        position={[-1, 1, 1]}
      />

      <spotLight
        color={0xffb978}
        intensity={6.8}
        position={[10, -10, 5]}
        angle={Math.PI / 4}
        penumbra={0.5}
        decay={2}
        distance={100}
        castShadow
        shadow-mapSize={1024}
      />

      <primitive
        rotation={[0, 0, 0]}
        object={brain.scene}
        scale={isMobile ? 0.1 : 0.2}
        position={[0, 3, 0]}
      />
    </mesh>
  );
};

const BrainCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handelChanges = (ev) => {
      setIsMobile(ev.matches);
    };
    mediaQuery.addEventListener("change", handelChanges);
    return () => {
      mediaQuery.removeEventListener("change", handelChanges);
    };
  }, []);

  return (
    <Canvas
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 80], fov: 25, rotation: [0, 0, 0] }}
      gl={{ preserveDrawingBuffer: true }}
      className="cursor-grab active:cursor-grabbing"
      onError={(error) => {
        console.error("err", error);
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Brain isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BrainCanvas;
