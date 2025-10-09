import React, { useState } from "react";

/**
 * Sovereign Override Panel
 * - Manual override toggles for cockpit systems
 * - Lighting sync logic
 * - Fallback loader/triggers for emergencies
 */

const OverridePanel = () => {
  // Manual override state
  const [override, setOverride] = useState(false);

  // Lighting sync state
  const [lightingSync, setLightingSync] = useState(false);

  // Fallback trigger state
  const [fallbackActive, setFallbackActive] = useState(false);

  // Handlers
  const handleOverrideToggle = () => setOverride((prev) => !prev);

  const handleLightingSync = () => setLightingSync((prev) => !prev);

  const handleFallbackTrigger = () => setFallbackActive(true);

  return (
    <section className="override-panel">
      <h2>Override Control Panel</h2>

      <div>
        <label>
          <input
            type="checkbox"
            checked={override}
            onChange={handleOverrideToggle}
          />
          Manual Override
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={lightingSync}
            onChange={handleLightingSync}
            disabled={!override}
          />
          Lighting Sync
        </label>
      </div>

      <div>
        <button
          onClick={handleFallbackTrigger}
          disabled={fallbackActive}
          style={{
            background: fallbackActive ? "#999" : "#d22",
            color: "#fff",
            padding: "0.5em 1em",
            borderRadius: "4px",
            cursor: fallbackActive ? "not-allowed" : "pointer"
          }}
        >
          {fallbackActive ? "Fallback Triggered" : "Trigger Fallback"}
        </button>
      </div>
    </section>
  );
};

export default OverridePanel;