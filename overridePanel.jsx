import React, { useState, useEffect, useCallback } from 'react';

/**
 * Override Panel Component
 * Provides sovereign control over system operations with manual override capabilities
 */
const OverridePanel = ({ 
  onOverride, 
  initialState = 'auto', 
  systems = [] 
}) => {
  const [mode, setMode] = useState(initialState);
  const [activeOverrides, setActiveOverrides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate initialization/loading
  useEffect(() => {
    const initializePanel = async () => {
      try {
        setLoading(true);
        // Simulate async initialization
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initializePanel();
  }, []);

  const handleModeToggle = useCallback(() => {
    const newMode = mode === 'auto' ? 'manual' : 'auto';
    setMode(newMode);
    if (onOverride) {
      onOverride({ mode: newMode, timestamp: Date.now() });
    }
  }, [mode, onOverride]);

  const handleSystemOverride = useCallback((system) => {
    setActiveOverrides(prev => {
      const isActive = prev.includes(system);
      const updated = isActive 
        ? prev.filter(s => s !== system)
        : [...prev, system];
      
      if (onOverride) {
        onOverride({ 
          system, 
          active: !isActive, 
          timestamp: Date.now() 
        });
      }
      
      return updated;
    });
  }, [onOverride]);

  // Fallback loader
  if (loading) {
    return (
      <div className="override-panel loading" role="status" aria-live="polite">
        <div className="loader-spinner"></div>
        <p>Initializing Override Panel...</p>
      </div>
    );
  }

  // Error fallback
  if (error) {
    return (
      <div className="override-panel error" role="alert">
        <h3>Override Panel Error</h3>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Retry</button>
      </div>
    );
  }

  return (
    <div className="override-panel" role="region" aria-label="Override Control Panel">
      <header className="panel-header">
        <h2>Override Control</h2>
        <div className="mode-indicator" data-mode={mode}>
          <span className="mode-label">Mode:</span>
          <span className="mode-value">{mode.toUpperCase()}</span>
        </div>
      </header>

      <div className="panel-controls">
        <button 
          className={`mode-toggle ${mode}`}
          onClick={handleModeToggle}
          aria-pressed={mode === 'manual'}
        >
          {mode === 'auto' ? 'Switch to Manual' : 'Switch to Auto'}
        </button>

        {systems.length > 0 && (
          <div className="system-overrides">
            <h3>System Controls</h3>
            <ul className="system-list">
              {systems.map(system => (
                <li key={system.id || system.name}>
                  <button
                    className={`system-btn ${activeOverrides.includes(system.name) ? 'active' : ''}`}
                    onClick={() => handleSystemOverride(system.name)}
                    disabled={mode === 'auto'}
                    aria-pressed={activeOverrides.includes(system.name)}
                  >
                    <span className="system-name">{system.name}</span>
                    <span className="system-status">
                      {activeOverrides.includes(system.name) ? 'OVERRIDE' : 'NORMAL'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="panel-status">
          <p className="status-text">
            Active Overrides: {activeOverrides.length}
          </p>
        </div>
      </div>

      <style jsx>{`
        .override-panel {
          background: #1a1a2e;
          border: 2px solid #16213e;
          border-radius: 8px;
          padding: 20px;
          color: #eee;
          min-width: 300px;
        }

        .override-panel.loading,
        .override-panel.error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }

        .loader-spinner {
          border: 4px solid #16213e;
          border-top: 4px solid #0f4c75;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #16213e;
          padding-bottom: 10px;
        }

        .panel-header h2 {
          margin: 0;
          color: #3282b8;
        }

        .mode-indicator {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .mode-indicator[data-mode="manual"] .mode-value {
          color: #ff6b6b;
        }

        .mode-indicator[data-mode="auto"] .mode-value {
          color: #51cf66;
        }

        .mode-toggle {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mode-toggle.auto {
          background: #51cf66;
          color: #1a1a2e;
        }

        .mode-toggle.manual {
          background: #ff6b6b;
          color: white;
        }

        .system-overrides {
          margin-top: 20px;
        }

        .system-overrides h3 {
          color: #3282b8;
          margin-bottom: 10px;
        }

        .system-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .system-list li {
          margin-bottom: 8px;
        }

        .system-btn {
          width: 100%;
          padding: 10px;
          border: 1px solid #16213e;
          border-radius: 4px;
          background: #0f3460;
          color: #eee;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .system-btn:hover:not(:disabled) {
          background: #16213e;
          border-color: #3282b8;
        }

        .system-btn.active {
          background: #ff6b6b;
          border-color: #ff6b6b;
        }

        .system-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .panel-status {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #16213e;
        }

        .status-text {
          margin: 0;
          color: #3282b8;
        }
      `}</style>
    </div>
  );
};

export default OverridePanel;
