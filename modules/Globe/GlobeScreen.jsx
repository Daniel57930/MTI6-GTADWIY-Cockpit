import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import ScreenSelector from "../Shared/ScreenSelector";

const initialEarnings = [
  { id: 1, lat: 40.7128, lng: -74.006, value: "$12k", label: "New York" },
  { id: 2, lat: 51.5074, lng: -0.1278, value: "$8k", label: "London" },
  { id: 3, lat: 35.6895, lng: 139.6917, value: "$6.4k", label: "Tokyo" }
];

export default function GlobeScreen({ onSelectScreen }) {
  const globeEl = useRef();
  const [autoRotate, setAutoRotate] = useState(true);
  const [speed, setSpeed] = useState(0.001);
  const [pointsData, setPointsData] = useState(initialEarnings);

  useEffect(() => {
    if (globeEl.current) {
      let angle = 0;
      let raf;
      const animate = () => {
        if (autoRotate) {
          angle += speed;
          globeEl.current.pointOfView({ lat: 0, lng: angle * (180 / Math.PI), altitude: 2.2 }, 50);
        }
        raf = requestAnimationFrame(animate);
      };
      animate();
      return () => cancelAnimationFrame(raf);
    }
  }, [autoRotate, speed]);

  function handlePointClick(point) {
    // If parent supplied onSelectScreen, navigate to trading for a point click
    if (onSelectScreen) {
      onSelectScreen("trading");
    } else {
      // Fallback demo behavior
      alert(`Clicked: ${point.label} — Earnings: ${point.value}`);
    }
  }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#10102a", position: "relative" }}>
      <ScreenSelector onSelect={onSelectScreen} value="globe" />

      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 20, color: "#fff" }}>
        <h2 style={{ margin: 0 }}>Electric Globe</h2>
        <p style={{ margin: 0, opacity: 0.8 }}>MTI6-GTADWIY Sovereign Cockpit</p>
      </div>

      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 20, color: "#fff", display: "flex", gap: 12 }}>
        <div style={{ background: "rgba(0,0,0,0.6)", padding: 12, borderRadius: 12 }}>
          <div style={{ marginBottom: 8 }}>
            <label style={{ marginRight: 8, fontWeight: 700, color: "#fff" }}>Auto Rotate</label>
            <button onClick={() => setAutoRotate(a => !a)} style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>{autoRotate ? 'On' : 'Off'}</button>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 700, color: '#fff' }}>Speed</label>
            <input type="range" min={0} max={0.01} step={0.0001} value={speed} onChange={e => setSpeed(Number(e.target.value))} style={{ width: 120, marginLeft: 8 }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => onSelectScreen && onSelectScreen('trading')} style={{ padding: '8px 12px', background: '#39f', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>Open Trading</button>
          </div>
        </div>
      </div>

      <Globe
        ref={globeEl}
        globeImageUrl="/assets/globe-electric-blue.jpg"
        backgroundColor="#10102a"
        pointsData={pointsData}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointColor={() => "cyan"}
        pointAltitude={() => 0.05}
        pointLabel={d => `${d.label} — Earnings: ${d.value}`}
        onPointClick={handlePointClick}
      />
    </div>
  );
}