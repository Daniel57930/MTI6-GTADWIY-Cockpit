import { useMemo, useState } from "react";

const OverridePanel = ({ onOverrideChange, onFallbackTrigger, onLightingSyncChange }) => {
  const [overrideEnabled, setOverrideEnabled] = useState(false);
  const [lightingSyncEnabled, setLightingSyncEnabled] = useState(false);
  const [fallbackEngaged, setFallbackEngaged] = useState(false);

  const fallbackButtonClass = useMemo(() => {
    const classes = ["fallback-trigger-button"];
    classes.push(
      fallbackEngaged ? "fallback-trigger-button--disabled" : "fallback-trigger-button--active"
    );
    return classes.join(" ");
  }, [fallbackEngaged]);

  const toggleOverride = () => {
    setOverrideEnabled((previous) => {
      const next = !previous;
      if (!next) {
        setLightingSyncEnabled(false);
        if (typeof onLightingSyncChange === "function") {
          onLightingSyncChange(false);
        }
      }

      if (typeof onOverrideChange === "function") {
        onOverrideChange(next);
      }

      return next;
    });
  };

  const toggleLightingSync = () => {
    setLightingSyncEnabled((previous) => {
      const next = !previous;
      if (typeof onLightingSyncChange === "function") {
        onLightingSyncChange(next);
      }
      return next;
    });
  };

  const triggerFallback = () => {
    if (fallbackEngaged) {
      return;
    }

    setFallbackEngaged(true);
    if (typeof onFallbackTrigger === "function") {
      onFallbackTrigger();
    }
  };

  return (
    <section className="control-card override-panel">
      <h2 className="control-card__title">Override Control Panel</h2>
      <p className="control-card__description">
        Manage manual overrides, synchronize cockpit lighting, and trigger emergency fallbacks.
      </p>

      <div className="toggle-list">
        <label className="toggle-list__item">
          <input
            type="checkbox"
            checked={overrideEnabled}
            onChange={toggleOverride}
          />
          <span className="toggle-list__label">Manual Override</span>
        </label>

        <label className="toggle-list__item">
          <input
            type="checkbox"
            checked={lightingSyncEnabled}
            onChange={toggleLightingSync}
            disabled={!overrideEnabled}
          />
          <span className="toggle-list__label">Lighting Sync</span>
        </label>
      </div>

      <button
        type="button"
        className={fallbackButtonClass}
        onClick={triggerFallback}
        disabled={fallbackEngaged}
      >
        {fallbackEngaged ? "Fallback Triggered" : "Trigger Fallback"}
      </button>
    </section>
  );
};

export default OverridePanel;
