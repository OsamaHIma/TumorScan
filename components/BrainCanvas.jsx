"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";

const Brain = () => {
  const brain = useGLTF("/models/tumors/scene.gltf");
  // console.log(brain.scenes[0].children[0].children[0].children[0])
  // Rotate the phone mesh every frame
  useFrame(({ clock }) => {
    brain.scene.rotation.y = clock.getElapsedTime() * 0.3; // Modify rotation speed here
  });
  // useEffect(() => {
  //   if (brain.scenes && brain.scenes[0]?.children[0]?.children[0]?.children[0]) {
  //     const targetMesh = brain.scenes[0].children[0].children[0].children[0];
  //     targetMesh.color = new Color("red");
  //     targetMesh.transparent = true;
  //     targetMesh.opacity = 0.5;
  //   }
  // }, [brain.scenes]);
  
  return (
    <mesh>
      <ambientLight intensity={10} />
      <pointLight intensity={10} position={[10, 10, 10]} />

      <primitive
        rotation={[0, 0, 0]}
        object={brain.scene}
        scale={0.2}
        position={[0, 3, 0]}
      />
    </mesh>
  );
};

const BrainCanvas = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 500px)");
  //   setIsMobile(mediaQuery.matches);
  //   const handelChanges = (ev) => {
  //     setIsMobile(ev.matches);
  //   };
  //   mediaQuery.addEventListener("change", handelChanges);
  //   return () => {
  //     mediaQuery.removeEventListener("change", handelChanges);
  //   };
  // }, []);

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
        {/* <Brain isMobile={isMobile} /> */}
        <Brain  />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BrainCanvas;