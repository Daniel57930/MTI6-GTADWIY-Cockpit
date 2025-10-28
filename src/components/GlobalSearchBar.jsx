import React, { useState, useEffect } from 'react';
import assetsData from '../data/assets.json';
import tokensData from '../data/tokens.json';

// Simple global search bar meant to be placed in the top-center of app layout.
// Usage: include <GlobalSearchBar /> in your top-level layout/header.

const GlobalSearchBar = ({ onSelect = () => {} }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return setResults([]);
    const q = query.toLowerCase();

    const assetMatches = assetsData.filter(a => (a.name || '').toLowerCase().includes(q) || (a.tags || []).some(t => t.toLowerCase().includes(q)) );
    const tokenMatches = tokensData.filter(t => (t.symbol || '').toLowerCase().includes(q) || (t.name || '').toLowerCase().includes(q));

    setResults([
      ...assetMatches.map(a => ({ type: 'asset', id: a.id, name: a.name })),
      ...tokenMatches.map(t => ({ type: 'token', id: t.symbol, name: t.name }))
    ].slice(0, 12));
  }, [query]);

  function handlePick(item) {
    setQuery('');
    setResults([]);
    onSelect(item);
  }

  return (
    <div style={containerStyle}>
      <input
        aria-label="Global search"
        placeholder="Search assets, tokens, screens..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={inputStyle}
      />

      {results.length > 0 && (
        <ul style={listStyle} role="listbox">
          {results.map(r => (
            <li key={`${r.type}_${r.id}`} style={itemStyle} onClick={() => handlePick(r)}>
              <strong>{r.name}</strong>
              <span style={{ marginLeft: 8, color: '#99a' }}>{r.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline styles to make the search bar centered at the top of screens when inserted in a header
const containerStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
};

const inputStyle = {
  width: '520px',
  maxWidth: '80%',
  padding: '10px 14px',
  borderRadius: '24px',
  border: '1px solid rgba(100,120,160,0.25)',
  background: 'rgba(255,255,255,0.04)',
  color: '#eaf2ff',
  outline: 'none'
};

const listStyle = {
  position: 'absolute',
  top: '48px',
  width: '520px',
  maxWidth: '80%',
  background: '#0b1220',
  border: '1px solid rgba(100,120,160,0.12)',
  borderRadius: 8,
  marginTop: 8,
  listStyle: 'none',
  padding: 8,
  zIndex: 1200
};

const itemStyle = {
  padding: '8px 10px',
  cursor: 'pointer',
  borderRadius: 6,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

export default GlobalSearchBar;