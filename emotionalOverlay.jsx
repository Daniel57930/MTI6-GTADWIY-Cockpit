import { useState } from "react";

const affirmations = [
  "You are in full sovereign control.",
  "Milestones are being achieved.",
  "Emotional overlay: calm, focused, present.",
  "Your cockpit responds perfectly to your intent."
];

const EmotionalOverlay = ({ onAffirmationChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cycleAffirmation = () => {
    const nextIndex = (currentIndex + 1) % affirmations.length;
    setCurrentIndex(nextIndex);
    if (typeof onAffirmationChange === "function") {
      onAffirmationChange(affirmations[nextIndex]);
    }
  };

  return (
    <section className="overlay-card emotional-overlay">
      <h2 className="overlay-card__title">Emotional Overlay</h2>
      <div className="overlay-card__body">
        <p className="overlay-card__message">{affirmations[currentIndex]}</p>
        <button
          type="button"
          className="overlay-card__action"
          onClick={cycleAffirmation}
        >
          Next Affirmation
        </button>
      </div>
    </section>
  );
};

export default EmotionalOverlay;
