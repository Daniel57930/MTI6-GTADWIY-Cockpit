import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { FlyToCamera } from './cameraControls';

export default function GlobeScreen({ points = [] }) {
  const { camera } = useThree();
  const sceneRef = useRef();
  const [pinPulseMap, setPinPulseMap] = useState({});
  const [btcPrice, setBtcPrice] = useState(null);

  // Fog that fades with camera zoom
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.fog = new THREE.FogExp2(0x111122, 0.002);
  }, []);

  // Update fog density each frame based on camera distance
  useFrame(() => {
    const scene = sceneRef.current;
    if (!scene || !camera) return;
    // Map camera.position.z to fog density (tweak as needed)
    const z = camera.position.z || 1;
    const density = THREE.MathUtils.clamp((z - 2) * 0.0008, 0.0001, 0.01);
    if (scene.fog) scene.fog.density = density;
  });

  // Poll CoinGecko for BTC price for New York pin example
  useEffect(() => {
    let mounted = true;
    async function fetchBTC() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const j = await res.json();
        if (!mounted) return;
        setBtcPrice(j?.bitcoin?.usd ?? null);
      } catch (e) {
        console.warn('CoinGecko fetch failed', e);
      }
    }
    fetchBTC();
    const id = setInterval(fetchBTC, 30000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  // Handler for price update pulse
  function triggerPulse(pinId) {
    setPinPulseMap(m => ({ ...m, [pinId]: true }));
    setTimeout(() => setPinPulseMap(m => { const nm = { ...m }; delete nm[pinId]; return nm; }), 900);
  }

  // Example WebSocket or event hook placeholder to trigger pulses on price updates
  useEffect(() => {
    // Placeholder: wire your WS or event emitter here and call triggerPulse(pinId)
    // Example:
    // ws.on('price-update', ({ pinId }) => triggerPulse(pinId));
  }, []);

  return (
    <group ref={sceneRef}>
      {/* Example globe and pins rendering. Replace with your actual globe code. */}
      {points.map(point => (
        <mesh
          key={point.id}
          position={[point.x, point.y, point.z]}
          onClick={() => {
            // camera fly-to
            FlyToCamera(camera, new THREE.Vector3(point.x, point.y, point.z));
            // if this is New York and we have price, show pulse
            if (point.name && point.name.toLowerCase().includes('new york')) {
              triggerPulse(point.id);
            }
          }}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color={pinPulseMap[point.id] ? 'hotpink' : 'orange'} />
          {/* Price label example for New York */}
          {point.name && point.name.toLowerCase().includes('new york') && btcPrice != null && (
            <mesh position={[0, 0.12, 0]}>
              <planeGeometry args={[0.6, 0.18]} />
              <meshBasicMaterial transparent opacity={0.85} color="#000" />
            </mesh>
          )}
        </mesh>
      ))}
    </group>
  );
}