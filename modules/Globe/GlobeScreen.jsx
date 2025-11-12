import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { FlyToCamera } from './cameraControls';
import { useWalletContext } from '../Wallet/WalletContext';

export default function GlobeScreen({ points: initialPoints = [], onSelectScreen }) {
  const { camera } = useThree();
  const sceneRef = useRef();
  const [points, setPoints] = useState(initialPoints);
  const [pinPulseMap, setPinPulseMap] = useState({});
  const { walletMap } = useWalletContext();

  // Fetch points from API on mount
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/globe-points');
        const json = await res.json();
        if (!mounted) return;
        setPoints(json.points || []);
      } catch (e) {
        console.warn('Failed to load globe points', e);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // WebSocket to receive live updates (value changes)
  useEffect(() => {
    let ws;
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      const host = window.location.host;
      ws = new WebSocket(`${protocol}://${host}/ws/globe`);
    } catch (e) {
      console.warn('WebSocket init failed', e);
      return;
    }

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === 'point-update' && msg.point) {
          setPoints(prev => prev.map(p => p.id === msg.point.id ? { ...p, ...msg.point } : p));
          // pulse the updated pin
          setPinPulseMap(m => ({ ...m, [msg.point.id]: true }));
          setTimeout(() => setPinPulseMap(m => { const nm = { ...m }; delete nm[msg.point.id]; return nm; }), 1000);
        }
      } catch (e) { console.warn('ws message parse', e); }
    };

    ws.onopen = () => { console.debug('ws globe connected'); };
    ws.onclose = () => { console.debug('ws globe closed'); };

    return () => { try { ws.close(); } catch (e) {} };
  }, []);

  useFrame(() => {
    const scene = sceneRef.current;
    if (!scene || !camera) return;
    const z = camera.position.z || 1;
    const density = THREE.MathUtils.clamp((z - 2) * 0.0008, 0.0001, 0.01);
    if (scene.fog) scene.fog.density = density;
  });

  function handlePinClick(point) {
    // fly camera
    FlyToCamera(camera, new THREE.Vector3(point.x, point.y, point.z));
    // select trading screen with context
    const payload = { city: point.city || point.name, symbol: point.symbol || 'BTC', valueUsd: point.valueUsd || 0, cityId: point.cityId };
    onSelectScreen && onSelectScreen('trading', payload);
  }

  function getBalanceForPoint(point) {
    if (!point.cityId) return null;
    const entry = (walletMap || {})[point.cityId];
    return entry ? entry.balance || entry.liquidity || null : null;
  }

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
        const scale = 0.05 + Math.min(1, numericBal / 5) * 0.25;
        const glowIntensity = Math.min(1, numericBal / 5);

        return (
          <mesh
            key={point.id}
            position={[point.x, point.y, point.z]}
            scale={[scale, scale, scale]}
            onClick={() => handlePinClick(point)}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color={pinPulseMap[point.id] ? 'hotpink' : 'orange'}
              emissive={new THREE.Color(0xffaa66).multiplyScalar(glowIntensity)}
              emissiveIntensity={0.6 * glowIntensity}
            />

            {/* balance label */}
            {rawBal != null && (
              <group position={[0, 0.12, 0]}>
                <planeGeometry args={[0.8, 0.22]} />
                <meshBasicMaterial transparent opacity={0.9} color="#001" />
              </group>
            )}
          </mesh>
        );
      })}
    </group>
  );
}