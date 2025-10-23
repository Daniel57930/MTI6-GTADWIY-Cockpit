import React, { useState } from "react";
import globalMissions from "../modules/Global/globalMission.json";
import ResistanceMeter from "../modules/Global/ResistanceMeter.jsx";

export default function GlobalMissionCockpit() {
  const [selectedCity, setSelectedCity] = useState(globalMissions.cities[0].name);
  const cityMission = globalMissions.cities.find(c => c.name === selectedCity);
  const [resistance, setResistance] = useState(Math.floor(Math.random() * 100)); // Demo: random resistance

  return (
    <div style={{ maxWidth: 800, margin: "2em auto", padding: "2em", background: "#fff", borderRadius: "1.5em", boxShadow: "0 2px 24px #0002" }}>
      <h2>🌍 Global Mission Cockpit</h2>
      <div style={{ marginBottom: "2em" }}>
        <label>Choose a City:</label>
        <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
          {globalMissions.cities.map(city => (
            <option key={city.name} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>
      <ResistanceMeter resistance={resistance} />
      <div style={{ margin: "2em 0" }}>
        <h3>{cityMission.name} Mission Panel</h3>
        <p><strong>Main Objectives:</strong> {cityMission.objectives.join(", ")}</p>
        <p><strong>Camera Feed:</strong> {cityMission.cameraFeed}</p>
        <h4>Landmarks:</h4>
        <ul>
          {cityMission.landmarks.map(lm => (
            <li key={lm.name}>
              <strong>{lm.name}</strong> – {lm.objectives.join(", ")}
              <br />
              <em>Camera: {lm.cameraFeed}</em>
              <br />
              <span>Emotional Triggers: {lm.emotionalTriggers.join(", ")}</span>
              <br />
              <span>Fallback: {lm.fallbackLogic}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: "2em", color: "#888" }}>
        <strong>Bot is ready to scaffold new missions and panels globally.</strong><br />
        <strong>Tell your bots:</strong> "Add Paris", "Add Burj Khalifa", "Add liquidity lane", etc.<br />
        <strong>All updates will appear here instantly after each bot action!</strong>
      </div>
    </div>
  );
}