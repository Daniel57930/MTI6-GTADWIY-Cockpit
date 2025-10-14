import React, { useState, useEffect } from 'react';

/**
 * Override Panel - Core toggle logic for sovereignty control
 * Manages manual override states for automated systems
 * Part of MTI6-GTADWIY-Cockpit
 */

export const OverridePanel = () => {
  const [overrideActive, setOverrideActive] = useState(false);
  const [overrideLevel, setOverrideLevel] = useState(0);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    if (overrideActive) {
      setTimestamp(new Date().toISOString());
      console.log(`[Override Activated] Level ${overrideLevel} at ${timestamp}`);
    }
  }, [overrideActive, overrideLevel]);

  const handleOverrideToggle = () => {
    setOverrideActive(!overrideActive);
  };

  const adjustOverrideLevel = (level) => {
    if (level >= 0 && level <= 10) {
      setOverrideLevel(level);
    }
  };

  return (
    <div className="override-panel" data-active={overrideActive}>
      <div className="override-header">
        <h2>Sovereignty Override Control</h2>
        <button 
          className={`override-toggle ${overrideActive ? 'active' : ''}`}
          onClick={handleOverrideToggle}
          aria-label="Toggle override"
        >
          {overrideActive ? 'OVERRIDE ACTIVE' : 'OVERRIDE INACTIVE'}
        </button>
      </div>
      
      <div className="override-controls">
        <label htmlFor="override-level">Override Level: {overrideLevel}</label>
        <input
          id="override-level"
          type="range"
          min="0"
          max="10"
          value={overrideLevel}
          onChange={(e) => adjustOverrideLevel(parseInt(e.target.value))}
          disabled={!overrideActive}
        />
      </div>

      {overrideActive && timestamp && (
        <div className="override-status">
          <p>Override initiated: {timestamp}</p>
          <p>Current level: {overrideLevel}/10</p>
        </div>
      )}
    </div>
  );
};

export default OverridePanel;
