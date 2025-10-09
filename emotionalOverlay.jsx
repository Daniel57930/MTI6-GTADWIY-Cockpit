import React, { useState } from "react";

/**
 * Emotional Overlay
 * - Affirmation engine (displays affirmations)
 */

const affirmations = [
  "You are in full sovereign control.",
  "Milestones are being achieved.",
  "Emotional overlay: calm, focused, present.",
  "Your cockpit responds perfectly to your intent."
];

const EmotionalOverlay = () => {
  const [current, setCurrent] = useState(0);

  const nextAffirmation = () =>
    setCurrent((prev) => (prev + 1) % affirmations.length);

  return (
    <div className="emotional-overlay">
      <h2>Emotional Overlay</h2>
      <div className="affirmation">
        <p>{affirmations[current]}</p>
        <button onClick={nextAffirmation}>Next Affirmation</button>
      </div>
    </div>
  );
};

export default EmotionalOverlay;