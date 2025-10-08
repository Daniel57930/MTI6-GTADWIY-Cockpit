import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Emotional Overlay Component
 * Displays emotional state indicators and overlays for the cockpit interface
 */
const EmotionalOverlay = ({ 
  emotions = ['calm', 'focused', 'alert', 'stressed'], 
  updateInterval = 5000,
  onEmotionChange 
}) => {
  const [currentEmotion, setCurrentEmotion] = useState('calm');
  const [intensity, setIntensity] = useState(0.5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);

  // Initialize and set up emotion monitoring
  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        // Simulate initialization delay
        await new Promise(resolve => setTimeout(resolve, 300));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    initialize();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Monitor and update emotional state
  useEffect(() => {
    if (loading || error) return;

    intervalRef.current = setInterval(() => {
      // Simulate emotion fluctuation
      const randomIntensity = Math.random();
      setIntensity(randomIntensity);
      
      // Log emotion to history
      setHistory(prev => {
        const newEntry = {
          emotion: currentEmotion,
          intensity: randomIntensity,
          timestamp: Date.now()
        };
        return [...prev.slice(-9), newEntry]; // Keep last 10 entries
      });
    }, updateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading, error, currentEmotion, updateInterval]);

  const handleEmotionSelect = useCallback((emotion) => {
    setCurrentEmotion(emotion);
    if (onEmotionChange) {
      onEmotionChange({ emotion, intensity, timestamp: Date.now() });
    }
  }, [intensity, onEmotionChange]);

  const getEmotionColor = (emotion) => {
    const colors = {
      calm: '#51cf66',
      focused: '#3282b8',
      alert: '#ffd43b',
      stressed: '#ff6b6b',
      excited: '#cc5de8',
      neutral: '#868e96'
    };
    return colors[emotion] || colors.neutral;
  };

  const getOverlayOpacity = () => {
    return Math.min(0.3 + intensity * 0.4, 0.7);
  };

  // Fallback loader
  if (loading) {
    return (
      <div className="emotional-overlay loading" role="status" aria-live="polite">
        <div className="pulse-loader"></div>
        <p>Calibrating emotional sensors...</p>
      </div>
    );
  }

  // Error fallback
  if (error) {
    return (
      <div className="emotional-overlay error" role="alert">
        <h3>Emotional Overlay Error</h3>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Reset</button>
      </div>
    );
  }

  return (
    <div className="emotional-overlay-container" role="region" aria-label="Emotional State Overlay">
      {/* Background overlay effect */}
      <div 
        className="emotion-background"
        style={{
          backgroundColor: getEmotionColor(currentEmotion),
          opacity: getOverlayOpacity()
        }}
        aria-hidden="true"
      />

      <div className="emotional-overlay">
        <header className="overlay-header">
          <h2>Emotional State</h2>
          <div className="current-emotion">
            <span 
              className="emotion-indicator"
              style={{ backgroundColor: getEmotionColor(currentEmotion) }}
            />
            <span className="emotion-name">{currentEmotion.toUpperCase()}</span>
          </div>
        </header>

        <div className="emotion-controls">
          <div className="emotion-selector">
            <label htmlFor="emotion-select">Select Emotion:</label>
            <div className="emotion-buttons" id="emotion-select">
              {emotions.map(emotion => (
                <button
                  key={emotion}
                  className={`emotion-btn ${currentEmotion === emotion ? 'active' : ''}`}
                  onClick={() => handleEmotionSelect(emotion)}
                  style={{
                    borderColor: currentEmotion === emotion ? getEmotionColor(emotion) : '#16213e'
                  }}
                  aria-pressed={currentEmotion === emotion}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="intensity-display">
            <label>Intensity:</label>
            <div className="intensity-bar">
              <div 
                className="intensity-fill"
                style={{
                  width: `${intensity * 100}%`,
                  backgroundColor: getEmotionColor(currentEmotion)
                }}
                role="progressbar"
                aria-valuenow={Math.round(intensity * 100)}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
            <span className="intensity-value">{Math.round(intensity * 100)}%</span>
          </div>
        </div>

        {history.length > 0 && (
          <div className="emotion-history">
            <h3>Recent History</h3>
            <div className="history-timeline">
              {history.map((entry, idx) => (
                <div 
                  key={idx}
                  className="history-entry"
                  style={{ borderLeftColor: getEmotionColor(entry.emotion) }}
                >
                  <span className="history-emotion">{entry.emotion}</span>
                  <span className="history-intensity">{Math.round(entry.intensity * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .emotional-overlay-container {
          position: relative;
          background: #1a1a2e;
          border: 2px solid #16213e;
          border-radius: 8px;
          padding: 20px;
          color: #eee;
          min-width: 350px;
          overflow: hidden;
        }

        .emotion-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          transition: all 0.5s ease;
          z-index: 0;
        }

        .emotional-overlay {
          position: relative;
          z-index: 1;
        }

        .emotional-overlay.loading,
        .emotional-overlay.error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }

        .pulse-loader {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #3282b8;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }

        .overlay-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .overlay-header h2 {
          margin: 0;
          color: #eee;
        }

        .current-emotion {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .emotion-indicator {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: inline-block;
        }

        .emotion-name {
          font-weight: bold;
          font-size: 14px;
        }

        .emotion-controls {
          margin-bottom: 20px;
        }

        .emotion-selector {
          margin-bottom: 20px;
        }

        .emotion-selector label {
          display: block;
          margin-bottom: 10px;
          color: #aaa;
        }

        .emotion-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .emotion-btn {
          padding: 8px 16px;
          border: 2px solid #16213e;
          border-radius: 20px;
          background: rgba(15, 52, 96, 0.5);
          color: #eee;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: capitalize;
        }

        .emotion-btn:hover {
          background: rgba(15, 52, 96, 0.8);
        }

        .emotion-btn.active {
          background: rgba(50, 130, 184, 0.5);
        }

        .intensity-display {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .intensity-display label {
          color: #aaa;
          min-width: 70px;
        }

        .intensity-bar {
          flex: 1;
          height: 20px;
          background: rgba(22, 33, 62, 0.8);
          border-radius: 10px;
          overflow: hidden;
        }

        .intensity-fill {
          height: 100%;
          transition: width 0.3s ease, background-color 0.5s ease;
        }

        .intensity-value {
          min-width: 45px;
          text-align: right;
          font-weight: bold;
        }

        .emotion-history {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .emotion-history h3 {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #aaa;
        }

        .history-timeline {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .history-entry {
          display: flex;
          justify-content: space-between;
          padding: 6px 10px;
          background: rgba(15, 52, 96, 0.3);
          border-radius: 4px;
          border-left: 3px solid;
          font-size: 12px;
        }

        .history-emotion {
          text-transform: capitalize;
        }

        .history-intensity {
          color: #aaa;
        }
      `}</style>
    </div>
  );
};

export default EmotionalOverlay;
