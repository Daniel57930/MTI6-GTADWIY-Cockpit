import { useState } from 'react';

/**
 * TradeExecutor - Execute trades with validation
 */
export default function TradeExecutor() {
  const [asset, setAsset] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('market');
  const [price, setPrice] = useState('');

  const handleExecute = (action) => {
    console.log(`Executing ${action} trade:`, { asset, amount, type, price });
    // Integration point for actual trade execution
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '1.5rem',
      color: '#fff'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>⚡ Trade Executor</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            Asset
          </label>
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '1rem'
            }}
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="BNB">Binance Coin (BNB)</option>
            <option value="SOL">Solana (SOL)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            onClick={() => setType('market')}
            style={{
              padding: '0.5rem',
              background: type === 'market' ? '#00ff88' : 'rgba(255, 255, 255, 0.1)',
              color: type === 'market' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Market
          </button>
          <button
            onClick={() => setType('limit')}
            style={{
              padding: '0.5rem',
              background: type === 'limit' ? '#00ff88' : 'rgba(255, 255, 255, 0.1)',
              color: type === 'limit' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Limit
          </button>
        </div>

        {type === 'limit' && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
              Limit Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            onClick={() => handleExecute('buy')}
            style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            BUY
          </button>
          <button
            onClick={() => handleExecute('sell')}
            style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            SELL
          </button>
        </div>
      </div>
    </div>
  );
}
