import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <>
      <div className="h-screen bg-black">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
        <motion.div className="absolute h-screen top-0 w-full left-0">
          <Spline scene="https://prod.spline.design/kfZO01cNHqFMPVIT/scene.splinecode" />
        </motion.div>
      </div>
      <div className="bg-black h-screen ease-linear">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>
    </>
  );
}

function Stars(props) {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1 })
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 50;
    ref.current.rotation.y -= delta / 75;
  });
  useEffect(() => {
    document.addEventListener("scroll", () => {
      ref.current.rotation.x = window.scrollY / 1000;
      ref.current.rotation.y = window.scrollY / 1000;
    });
  }, []);
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#21cda8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
