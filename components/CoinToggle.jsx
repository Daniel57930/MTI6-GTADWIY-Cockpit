import { useState } from 'react';

/**
 * CoinToggle - Toggle for cryptocurrency operations
 */
export default function CoinToggle({ onToggle }) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem',
        background: enabled ? 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)' : 'rgba(255, 255, 255, 0.1)',
        color: enabled ? '#000' : '#fff',
        border: enabled ? '2px solid #ffd700' : '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'all 0.2s'
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>🪙</span>
      <span>Coin {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}
