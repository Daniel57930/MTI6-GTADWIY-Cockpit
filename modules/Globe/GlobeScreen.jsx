import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";
import ScreenSelector from "../Shared/ScreenSelector";

const earnings = [
  { lat: 40.7128, lng: -74.006, value: "$12k" }
];

export default function GlobeScreen({ onSelectScreen }) {
  const globeEl = useRef();

  useEffect(() => {
    if (globeEl.current) {
      let angle = 0;
      const animate = () => {
        angle += 0.001;
        globeEl.current.pointOfView({ lat: 0, lng: angle * (180 / Math.PI), altitude: 2.2 });
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#10102a", position: "relative" }}>
      <ScreenSelector onSelect={onSelectScreen} value="globe" />
      <Globe
        ref={globeEl}
        globeImageUrl="/assets/globe-electric-blue.jpg"
        backgroundColor="#10102a"
        pointsData={earnings}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointColor={() => "cyan"}
        pointAltitude={() => 0.05}
        pointLabel={d => `Earnings: ${d.value}`}
      />
    </div>
  );
}
