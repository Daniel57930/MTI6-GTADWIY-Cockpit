import React, { useState } from "react";

/**
 * Blessing Overlay
 * - Prophetic wins display
 */

const blessings = [
  "Victory is declared over your journey.",
  "Prophetic win: abundance unlocked.",
  "Blessings flow in every milestone.",
  "Your path is guided and protected."
];

const BlessingOverlay = () => {
  const [current, setCurrent] = useState(0);

  const nextBlessing = () =>
    setCurrent((prev) => (prev + 1) % blessings.length);

  return (
    <div className="blessing-overlay">
      <h2>Blessing Overlay</h2>
      <div className="prophetic-win">
        <p>{blessings[current]}</p>
        <button onClick={nextBlessing}>Next Blessing</button>
      </div>
    </div>
  );
};

export default BlessingOverlay;
