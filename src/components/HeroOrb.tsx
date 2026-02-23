import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const GlassOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const velocity = useRef({ x: 0, y: 0 });
  const prevPointer = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    velocity.current.x = (pointer.x - prevPointer.current.x) / Math.max(delta, 0.001);
    velocity.current.y = (pointer.y - prevPointer.current.y) / Math.max(delta, 0.001);
    prevPointer.current.x = pointer.x;
    prevPointer.current.y = pointer.y;

    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    const rotSpeed = Math.min(speed * 0.02, 0.08);

    meshRef.current.rotation.x += (pointer.y * 0.3 - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (pointer.x * 0.3 - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.z += rotSpeed * delta;
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 12), []);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.5}
        chromaticAberration={0.3}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.1}
        ior={1.5}
        color="#ffffff"
        attenuationDistance={0.4}
        attenuationColor="#ffffff"
        roughness={0}
        transmission={1}
      />
    </mesh>
  );
};

const HeroOrb = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ffffff" />
        <GlassOrb />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroOrb;
