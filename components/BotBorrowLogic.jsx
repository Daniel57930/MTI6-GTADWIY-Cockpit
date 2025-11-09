import { useState } from 'react';

/**
 * BotBorrowLogic - Manage bot borrowing and lending operations
 */
export default function BotBorrowLogic() {
  const [borrowMode, setBorrowMode] = useState('lend');
  const [amount, setAmount] = useState('');
  const [apr, setApr] = useState(8.5);
  const [duration, setDuration] = useState(30);

  const [positions] = useState([
    { id: 1, type: 'lend', amount: 1000, apr: 8.5, duration: 30, elapsed: 15 },
    { id: 2, type: 'borrow', amount: 500, apr: 12.0, duration: 60, elapsed: 25 }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Bot ${borrowMode}ing:`, { amount, apr, duration });
    // Integration point for borrow/lend logic
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '1.5rem',
      color: '#fff'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>🤖 Bot Borrow Logic</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <button
          onClick={() => setBorrowMode('lend')}
          style={{
            padding: '0.75rem',
            background: borrowMode === 'lend' ? '#00ff88' : 'rgba(255, 255, 255, 0.1)',
            color: borrowMode === 'lend' ? '#000' : '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Lend
        </button>
        <button
          onClick={() => setBorrowMode('borrow')}
          style={{
            padding: '0.75rem',
            background: borrowMode === 'borrow' ? '#ff6b9d' : 'rgba(255, 255, 255, 0.1)',
            color: borrowMode === 'borrow' ? '#fff' : '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Borrow
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            Amount ($)
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

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            APR: {apr}%
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00ff88' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>
            Duration: {duration} days
          </label>
          <input
            type="range"
            min="7"
            max="365"
            step="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#00ff88' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '1rem',
            background: borrowMode === 'lend'
              ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
              : 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
            color: borrowMode === 'lend' ? '#000' : '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          {borrowMode === 'lend' ? '💸 Lend' : '💰 Borrow'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ marginBottom: '0.75rem', fontSize: '0.875rem', opacity: 0.8 }}>
          Active Positions
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {positions.map((pos) => (
            <div
              key={pos.id}
              style={{
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                fontSize: '0.875rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {pos.type}
                </span>
                <span>${pos.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
                <span>{pos.apr}% APR</span>
                <span>{pos.elapsed}/{pos.duration} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
