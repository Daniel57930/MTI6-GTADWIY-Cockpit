import { useState } from 'react';

/**
 * SearchBar - Universal search component for cockpit
 */
export default function SearchBar({ placeholder = 'Search...', onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        padding: '0.5rem 1rem',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '1rem'
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
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
        )}
      </div>
    </form>
  );
}
