import { useState } from 'react';

/**
 * CardToggle - Toggle for card/payment operations
 */
export default function CardToggle({ onToggle }) {
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
        background: enabled ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)' : 'rgba(255, 255, 255, 0.1)',
        color: enabled ? '#fff' : '#fff',
        border: enabled ? '2px solid #ff6b9d' : '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'all 0.2s'
      }}
    >
      <span style={{ fontSize: '1.25rem' }}>💳</span>
      <span>Card {enabled ? 'ON' : 'OFF'}</span>
    </button>
  );
}
