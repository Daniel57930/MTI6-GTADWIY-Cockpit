import { useState } from 'react';

/**
 * SlideBar - Adjustable control slider for various parameters
 */
export default function SlideBar({ label = 'Control', min = 0, max = 100, defaultValue = 50, onChange }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div style={{
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      color: '#fff'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem'
      }}>
        <label style={{ fontWeight: 'bold' }}>{label}</label>
        <span style={{ color: '#00ff88' }}>{value}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        style={{
          width: '100%',
          cursor: 'pointer',
          accentColor: '#00ff88'
        }}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.875rem',
        opacity: 0.6,
        marginTop: '0.25rem'
      }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
