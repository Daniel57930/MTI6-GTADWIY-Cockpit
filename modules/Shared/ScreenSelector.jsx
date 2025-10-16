import React, { useState } from "react";

const screens = [
  { label: "Globe", value: "globe" },
  { label: "Trading Platform", value: "trading" },
  { label: "Staking", value: "staking" },
  { label: "Farming", value: "farming" },
  { label: "Mining", value: "mining" },
  { label: "Store", value: "store" },
  { label: "GTADWIY", value: "gtadwiy" }
];

export default function ScreenSelector({ value, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      position: "fixed", top: 20, right: 20, zIndex: 1000,
      background: "#181c24", borderRadius: "24px", boxShadow: "0 2px 16px #0008"
    }}>
      <button
        style={{
          fontSize: "1rem", padding: "8px 16px", borderRadius: "24px", background: "#39f",
          border: "none", cursor: "pointer", fontWeight: 600, color: "#fff"
        }}
        onClick={() => setOpen(!open)}
      >🧭 Cockpit Screens</button>
      {open && (
        <div style={{
          display: "flex", flexDirection: "column", background: "#181c24", borderRadius: "24px"
        }}>
          {screens.map(s => (
            <button key={s.value}
              style={{
                background: s.value === value ? "#39f" : "#191f2b",
                color: "#fff", margin: "4px",
                padding: "10px 24px", borderRadius: "18px", border: "none", cursor: "pointer"
              }}
              onClick={() => { onSelect(s.value); setOpen(false); }}
            >{s.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
