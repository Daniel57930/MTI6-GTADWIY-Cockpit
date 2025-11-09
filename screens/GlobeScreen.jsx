import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

/**
 * Electric Globe Component
 * Interactive 3D globe with electric/energy effects for sovereign cockpit
 */
function ElectricGlobe() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[2, 64, 64]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <MeshDistortMaterial
        color={hovered ? "#00ffff" : "#0088ff"}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

/**
 * Energy Particles around globe
 */
function EnergyParticles() {
  const particlesRef = useRef();
  const particleCount = 100;

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const radius = 2.5 + Math.random() * 0.5;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    particles.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
      </mesh>
    );
  }

  return <group ref={particlesRef}>{particles}</group>;
}

/**
 * GlobeScreen - Electric Globe with Three.js
 * Main screen component for 3D visualization
 */
export default function GlobeScreen() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#000' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: '#fff' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Electric Globe</h1>
        <p style={{ margin: '0.5rem 0', opacity: 0.8 }}>
          MTI6-GTADWIY Sovereign Cockpit Visualization
        </p>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        
        <ElectricGlobe />
        <EnergyParticles />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: '#fff',
        opacity: 0.6,
        fontSize: '0.875rem'
      }}>
        <p>🎮 Click and drag to rotate | Scroll to zoom</p>
      </div>
    </div>
  );
}
