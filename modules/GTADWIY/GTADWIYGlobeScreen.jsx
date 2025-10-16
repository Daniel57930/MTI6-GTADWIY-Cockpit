import React, { useState } from "react";

const cities = [
  { name: "Bronxword", coords: [390, 150] },
  { name: "Rome", coords: [540, 180] },
  { name: "Gauteng", coords: [520, 370] },
];

export default function GTADWIYGlobeScreen() {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#10102a",
      position: "relative",
      overflow: "hidden"
    }}>
      <img
        src="/assets/gtadwiy-globe-map.png"
        alt="GTADWIY Globe Map"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 0
        }}
      />
      {cities.map(city => (
        <div
          key={city.name}
          style={{
            position: "absolute",
            left: city.coords[0],
            top: city.coords[1],
            width: 20,
            height: 20,
            borderRadius: 10,
            background: "#39f",
            border: "2px solid #fff",
            cursor: "pointer",
            zIndex: 2,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 12px #39f"
          }}
          title={city.name}
          onClick={() => setSelectedCity(city.name)}
        />
      ))}
      <div style={{
        position: "absolute",
        left: "50%",
        bottom: 40,
        transform: "translateX(-50%)",
        color: "#fff",
        fontSize: "2.5rem",
        fontFamily: "'Orbitron', 'Arial Black', sans-serif",
        textShadow: "0 0 16px #39f, 0 0 32px #000",
        zIndex: 3
      }}>
        GTAdwiy
      </div>
      {selectedCity && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: 80,
          transform: "translateX(-50%)",
          background: "rgba(24,28,36,0.95)",
          borderRadius: "16px",
          padding: "32px",
          color: "#fff",
          minWidth: 320,
          zIndex: 4,
          boxShadow: "0 2px 32px #39f"
        }}>
          <h2>{selectedCity}</h2>
          <p>Gameplay triggers, mission selector, and live feeds go here.</p>
          <button onClick={() => setSelectedCity(null)} style={{
            marginTop: "24px",
            padding: "8px 24px",
            borderRadius: "8px",
            background: "#39f",
            color: "#fff",
            border: "none"
          }}>Close</button>
        </div>
      )}
    </div>
  );
}
