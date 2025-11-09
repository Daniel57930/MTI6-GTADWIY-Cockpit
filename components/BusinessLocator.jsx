import { useState } from 'react';

/**
 * BusinessLocator - Find and track business opportunities
 */
export default function BusinessLocator() {
  const [location, setLocation] = useState('');
  const [businesses] = useState([
    { id: 1, name: 'DeFi Protocol Alpha', type: 'Investment', distance: '0.2 mi' },
    { id: 2, name: 'NFT Marketplace Beta', type: 'Trading', distance: '0.5 mi' },
    { id: 3, name: 'Crypto Exchange Gamma', type: 'Exchange', distance: '1.1 mi' }
  ]);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '1.5rem',
      color: '#fff'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>📍 Business Locator</h3>

      <input
        type="text"
        placeholder="Search location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          marginBottom: '1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '1rem'
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {businesses.map(business => (
          <div
            key={business.id}
            style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
              {business.name}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', opacity: 0.7 }}>
              <span>{business.type}</span>
              <span>{business.distance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
