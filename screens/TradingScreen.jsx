import { useState, useEffect } from 'react';

/**
 * TradingScreen - Trading UI inspired by Pocket Option
 * Cockpit trading interface with real-time controls
 */
export default function TradingScreen() {
  const [selectedAsset, setSelectedAsset] = useState('BTC/USD');
  const [tradeAmount, setTradeAmount] = useState(100);
  const [tradeDirection, setTradeDirection] = useState('up');
  const [tradeTime, setTradeTime] = useState(60);
  const [balance, setBalance] = useState(10000);
  const [trades, setTrades] = useState([]);

  const assets = ['BTC/USD', 'ETH/USD', 'BNB/USD', 'SOL/USD', 'DOGE/USD'];
  const timeOptions = [30, 60, 120, 300, 600];

  const executeTrade = () => {
    const newTrade = {
      id: Date.now(),
      asset: selectedAsset,
      amount: tradeAmount,
      direction: tradeDirection,
      time: tradeTime,
      openPrice: (Math.random() * 50000 + 20000).toFixed(2),
      timestamp: new Date().toISOString(),
      status: 'active'
    };

    setTrades([newTrade, ...trades]);
    setBalance(balance - tradeAmount);

    // Simulate trade completion
    setTimeout(() => {
      const win = Math.random() > 0.5;
      setTrades(prevTrades =>
        prevTrades.map(trade =>
          trade.id === newTrade.id
            ? { ...trade, status: win ? 'win' : 'loss' }
            : trade
        )
      );
      if (win) {
        setBalance(prev => prev + tradeAmount * 1.85);
      }
    }, tradeTime * 1000);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      padding: '20px',
      color: '#fff'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem' }}>Trading Cockpit</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '1.25rem'
        }}>
          <span style={{ opacity: 0.7 }}>Balance:</span>
          <span style={{ color: '#00ff88', fontWeight: 'bold' }}>
            ${balance.toFixed(2)}
          </span>
        </div>
      </header>

      {/* Main Trading Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        marginBottom: '2rem'
      }}>
        {/* Chart Area */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '1.5rem',
          minHeight: '400px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedAsset}</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {assets.map(asset => (
                <button
                  key={asset}
                  onClick={() => setSelectedAsset(asset)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedAsset === asset ? '#00ff88' : 'rgba(255,255,255,0.1)',
                    color: selectedAsset === asset ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Chart Placeholder */}
          <div style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            fontSize: '1.25rem',
            opacity: 0.5
          }}>
            📊 Live Chart (ChartEngine Integration Point)
          </div>
        </div>

        {/* Trading Panel */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Quick Trade</h3>

          {/* Amount Input */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>
              Trade Amount
            </label>
            <input
              type="number"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Time Selection */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>
              Trade Duration (seconds)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {timeOptions.map(time => (
                <button
                  key={time}
                  onClick={() => setTradeTime(time)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: tradeTime === time ? '#00ff88' : 'rgba(255,255,255,0.1)',
                    color: tradeTime === time ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {time}s
                </button>
              ))}
            </div>
          </div>

          {/* Trade Direction Buttons */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              onClick={() => {
                setTradeDirection('up');
                executeTrade();
              }}
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}
            >
              📈 UP
            </button>
            <button
              onClick={() => {
                setTradeDirection('down');
                executeTrade();
              }}
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}
            >
              📉 DOWN
            </button>
          </div>
        </div>
      </div>

      {/* Active Trades */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '1.5rem'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Active Trades</h3>
        {trades.length === 0 ? (
          <p style={{ opacity: 0.5, textAlign: 'center', padding: '2rem' }}>
            No trades yet. Start trading to see them here!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {trades.slice(0, 5).map(trade => (
              <div
                key={trade.id}
                style={{
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Asset</div>
                  <div style={{ fontWeight: 'bold' }}>{trade.asset}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Amount</div>
                  <div style={{ fontWeight: 'bold' }}>${trade.amount}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Direction</div>
                  <div style={{ fontWeight: 'bold' }}>
                    {trade.direction === 'up' ? '📈 UP' : '📉 DOWN'}
                  </div>
                </div>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Open Price</div>
                  <div style={{ fontWeight: 'bold' }}>${trade.openPrice}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.7, fontSize: '0.875rem' }}>Status</div>
                  <div style={{
                    fontWeight: 'bold',
                    color: trade.status === 'win' ? '#00ff88' : trade.status === 'loss' ? '#ff4444' : '#ffaa00'
                  }}>
                    {trade.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
