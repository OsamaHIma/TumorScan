"use client";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-300"></div>
      <p className="mt-8 text-xl font-bold text-gray-300">
        Loading <span className="text-orange-400">{progress.toFixed(2)}%</span>
      </p>
    </Html>
  );
};

export default CanvasLoader;
