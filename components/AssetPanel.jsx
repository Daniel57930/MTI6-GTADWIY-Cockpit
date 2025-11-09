import { useState } from 'react';

/**
 * AssetPanel - Display and manage crypto assets
 */
export default function AssetPanel() {
  const [assets] = useState([
    { symbol: 'BTC', name: 'Bitcoin', amount: 0.5234, price: 43250.00, change: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', amount: 3.2145, price: 2280.50, change: -1.2 },
    { symbol: 'BNB', name: 'Binance Coin', amount: 12.456, price: 315.75, change: 4.8 },
    { symbol: 'SOL', name: 'Solana', amount: 45.123, price: 98.20, change: 6.3 }
  ]);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '1.5rem',
      color: '#fff'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>📊 Asset Portfolio</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {assets.map((asset) => {
          const value = asset.amount * asset.price;
          return (
            <div
              key={asset.symbol}
              style={{
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{asset.symbol}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.6 }}>{asset.name}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Holdings</div>
                <div style={{ fontWeight: 'bold' }}>{asset.amount.toFixed(4)}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  ${value.toFixed(2)}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>24h Change</div>
                <div style={{
                  fontWeight: 'bold',
                  color: asset.change >= 0 ? '#00ff88' : '#ff4444'
                }}>
                  {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0, 255, 136, 0.1)',
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.25rem' }}>
          Total Portfolio Value
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00ff88' }}>
          ${assets.reduce((sum, a) => sum + (a.amount * a.price), 0).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
