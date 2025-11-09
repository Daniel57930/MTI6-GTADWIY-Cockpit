import { useState } from 'react';

/**
 * EarningsOverlay - Display daily/weekly earnings with sovereign controls
 */
export default function EarningsOverlay() {
  const [visible, setVisible] = useState(true);
  const [earnings] = useState({
    daily: 247.83,
    weekly: 1542.67,
    monthly: 6834.21,
    currency: 'USD'
  });

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 255, 136, 0.3)',
      borderRadius: '12px',
      padding: '1.5rem',
      color: '#fff',
      minWidth: '280px',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <h3 style={{ margin: 0, color: '#00ff88' }}>💰 Earnings</h3>
        <button
          onClick={() => setVisible(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '1.25rem'
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <div style={{ opacity: 0.7, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
            Daily
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ff88' }}>
            ${earnings.daily.toFixed(2)}
          </div>
        </div>

        <div>
          <div style={{ opacity: 0.7, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
            Weekly
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            ${earnings.weekly.toFixed(2)}
          </div>
        </div>

        <div>
          <div style={{ opacity: 0.7, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
            Monthly
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            ${earnings.monthly.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
