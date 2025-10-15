import { useState } from "react";

const blessings = [
  "Victory is declared over your journey.",
  "Prophetic win: abundance unlocked.",
  "Blessings flow in every milestone.",
  "Your path is guided and protected."
];

const BlessingOverlay = ({ onBlessingChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextBlessing = () => {
    const nextIndex = (currentIndex + 1) % blessings.length;
    setCurrentIndex(nextIndex);
    if (typeof onBlessingChange === "function") {
      onBlessingChange(blessings[nextIndex]);
    }
  };

  return (
    <section className="overlay-card blessing-overlay">
      <h2 className="overlay-card__title">Blessing Overlay</h2>
      <div className="overlay-card__body">
        <p className="overlay-card__message">{blessings[currentIndex]}</p>
        <button
          type="button"
          className="overlay-card__action"
          onClick={showNextBlessing}
        >
          Next Blessing
        </button>
      </div>
    </section>
  );
};

export default BlessingOverlay;
