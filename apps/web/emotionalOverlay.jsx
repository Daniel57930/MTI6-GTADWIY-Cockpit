import React, { useState, useEffect } from 'react';

/**
 * Emotional Overlay - Affirmation Engine Module
 * Displays emotional state-based affirmations and presence
 * Integrates with StarBot affirmation engine
 * Part of MTI6-GTADWIY-Cockpit
 */

const EMOTIONAL_STATES = {
  PEACE: 'peace',
  STRENGTH: 'strength',
  CLARITY: 'clarity',
  SOVEREIGNTY: 'sovereignty',
  GRATITUDE: 'gratitude'
};

const AFFIRMATIONS = {
  [EMOTIONAL_STATES.PEACE]: [
    "I am centered in divine peace",
    "Peace flows through all my actions",
    "I rest in sovereign stillness"
  ],
  [EMOTIONAL_STATES.STRENGTH]: [
    "I am fortified by unwavering strength",
    "My resolve is unshakeable",
    "Strength guides my every decision"
  ],
  [EMOTIONAL_STATES.CLARITY]: [
    "Clarity illuminates my path",
    "I see with divine understanding",
    "Truth reveals itself to me"
  ],
  [EMOTIONAL_STATES.SOVEREIGNTY]: [
    "I walk in complete sovereignty",
    "My authority is divine and absolute",
    "I govern my domain with wisdom"
  ],
  [EMOTIONAL_STATES.GRATITUDE]: [
    "I overflow with gratitude",
    "Every breath is a blessing",
    "Thankfulness fills my spirit"
  ]
};

export const EmotionalOverlay = () => {
  const [currentState, setCurrentState] = useState(EMOTIONAL_STATES.PEACE);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Rotate affirmations every 5 seconds
    const interval = setInterval(() => {
      const affirmations = AFFIRMATIONS[currentState];
      const nextIndex = (affirmationIndex + 1) % affirmations.length;
      setAffirmationIndex(nextIndex);
      setCurrentAffirmation(affirmations[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentState, affirmationIndex]);

  useEffect(() => {
    // Set initial affirmation
    setCurrentAffirmation(AFFIRMATIONS[currentState][0]);
  }, [currentState]);

  const changeEmotionalState = (state) => {
    setCurrentState(state);
    setAffirmationIndex(0);
    console.log(`[Emotional State Changed] Now in ${state} state`);
  };

  return (
    <div className={`emotional-overlay ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="overlay-controls">
        <button 
          className="toggle-visibility"
          onClick={() => setIsVisible(!isVisible)}
          aria-label="Toggle overlay visibility"
        >
          {isVisible ? '◐' : '◑'}
        </button>
      </div>

      {isVisible && (
        <>
          <div className="state-selector">
            {Object.values(EMOTIONAL_STATES).map((state) => (
              <button
                key={state}
                className={`state-button ${currentState === state ? 'active' : ''}`}
                onClick={() => changeEmotionalState(state)}
                data-state={state}
              >
                {state.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="affirmation-display" data-state={currentState}>
            <div className="affirmation-text">
              {currentAffirmation}
            </div>
            <div className="affirmation-glow"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmotionalOverlay;
