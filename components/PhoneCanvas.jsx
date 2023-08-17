"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useState, useMemo } from "react";
import { OrbitControls, Preload, useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping, Vector2 } from "three";
import CanvasLoader from "./CanvasLoader";

const Phone = ({ isMobile }) => {
  const phone = useGLTF("/models/cells/scene.gltf");

  return (
    <mesh>
      <ambientLight intensity={10} />
      <pointLight intensity={10} position={[10, 10, 10]} />

      <hemisphereLight intensity={0.15} groundColor="black" />


      <primitive
        rotation={[0, 0, 0]}
        object={phone.scene}
        scale={10}
        position={[-10, 0, 0]}
      />
    </mesh>
  );
};

const PhoneCanvas = () => {
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
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 80], fov: 25, rotation: [0, 0, 0] }}
      gl={{ preserveDrawingBuffer: true }}
      className="cursor-grab active:cursor-grabbing"
      onError={(error) => {
        console.error("err", error);
      }}
      style={{ height: "100%", position: "absolute", width: "100%", top: 0 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* <OrbitControls
          enableZoom={false}
          // enablePan={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
        /> */}
        <Phone isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PhoneCanvas;