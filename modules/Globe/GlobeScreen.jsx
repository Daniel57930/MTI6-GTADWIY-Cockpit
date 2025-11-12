import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { FlyToCamera } from './cameraControls';
import useWallet from '../../hooks/useWallet';

export default function GlobeScreen({ points = [], walletMap = {} }) {
  const { camera } = useThree();
  const sceneRef = useRef();
  const [pinPulseMap, setPinPulseMap] = useState({});
  const [btcPrice, setBtcPrice] = useState(null);
  const { account, balance } = useWallet();

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

  // Helper: get balance for a point from walletMap or fallback
  function getBalanceForPoint(point) {
    if (!point.cityId) return null;
    const entry = walletMap[point.cityId];
    if (!entry) return null;
    return entry.balance || entry.liquidity || null;
  }

  // Convert balance string like "1.2345 ETH" or numeric to a number (ETH)
  function parseNumericBalance(b) {
    if (b == null) return 0;
    if (typeof b === 'number') return b;
    const m = String(b).match(/([0-9]+\.?[0-9]*)/);
    return m ? parseFloat(m[1]) : 0;
  }

  return (
    <group ref={sceneRef}>
      {points.map(point => {
        const rawBal = getBalanceForPoint(point);
        const numericBal = parseNumericBalance(rawBal);
        // scale and glow based on liquidity
        const scale = 0.05 + Math.min(1, numericBal / 5) * 0.25; // up to 0.3 size
        const glowIntensity = Math.min(1, numericBal / 5);

        return (
          <mesh
            key={point.id}
            position={[point.x, point.y, point.z]}
            scale={[scale, scale, scale]}
            onClick={() => {
              FlyToCamera(camera, new THREE.Vector3(point.x, point.y, point.z));
              if (point.name && point.name.toLowerCase().includes('new york')) {
                triggerPulse(point.id);
              }
            }}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color={pinPulseMap[point.id] ? 'hotpink' : 'orange'}
              emissive={new THREE.Color(0xffaa66).multiplyScalar(glowIntensity)}
              emissiveIntensity={0.6 * glowIntensity}
            />

            {/* Wallet balance label */}
            {rawBal != null && (
              <mesh position={[0, 0.12, 0]}>
                <planeGeometry args={[0.8, 0.22]} />
                <meshBasicMaterial transparent opacity={0.9} color="#001" />
                {/* ideally use Text sprite — simplified here */}
              </mesh>
            )}
          </mesh>
        );
      })}
    </group>
  );
}