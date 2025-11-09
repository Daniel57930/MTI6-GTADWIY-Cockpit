import { useState } from 'react';

/**
 * CashToggle - Toggle for cash/fiat operations
 */
export default function CashToggle({ onToggle }) {
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
        background: enabled ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)' : 'rgba(255, 255, 255, 0.1)',
        color: enabled ? '#000' : '#fff',
        border: enabled ? '2px solid #00ff88' : '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'all 0.2s'
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>💵</span>
      <span>Cash {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}
