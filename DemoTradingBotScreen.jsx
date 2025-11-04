import React, { useState, useEffect, useRef } from "react";

// Expand this asset list with ANY asset/APIs you want
const assets = [
  { symbol: "ETH", name: "Ethereum", price: 1800 },
  { symbol: "USDT", name: "Tether", price: 1 },
  { symbol: "UNI", name: "Uniswap", price: 4.5 }
  // Add more assets as you connect APIs
];

// Major bot strategies
const strategies = [
  "Trend Following",
  "Mean Reversion",
  "Scalping (Microtrading)",
  "Arbitrage",
  "Market Making",
  "Momentum",
  "Custom"
];

const earningMethods = [
  "Trading",
  "Liquidity Provision",
  "Staking",
  "Yield Farming"
];

// Adaptive strategy selection (demo logic)
function pickStrategy(currentPrice, lastPrice, balance) {
  if (Math.abs(currentPrice - lastPrice) / lastPrice > 0.05) return "Momentum";
  if (currentPrice > lastPrice) return "Trend Following";
  if (currentPrice < lastPrice) return "Mean Reversion";
  if (balance > 500) return "Scalping (Microtrading)";
  return "Market Making";
}

export default function DemoTradingBotScreen() {
  const [balance, setBalance] = useState(3);
  const [investAmount, setInvestAmount] = useState(1);
  const [tradingSpeed, setTradingSpeed] = useState(25); // ms between trades (top speed)
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(assets[0].symbol);
  const [selectedStrategies, setSelectedStrategies] = useState([strategies[0]]);
  const [totalTrades, setTotalTrades] = useState(0);
  const [earnings, setEarnings] = useState({
    Trading: 0,
    "Liquidity Provision": 0,
    Staking: 0,
    "Yield Farming": 0
  });
  const [log, setLog] = useState([]);
  const [lastPrice, setLastPrice] = useState(assets[0].price);

  const botRef = useRef();

  useEffect(() => {
    if (isRunning) {
      botRef.current = setInterval(() => {
        // Simulate asset price movement
        const asset = assets.find(a => a.symbol === selectedAsset);
        const currentPrice = asset.price + (Math.random() - 0.5) * asset.price * 0.01;

        // Adaptive strategy selection
        const strategy = pickStrategy(currentPrice, lastPrice, balance);
        setSelectedStrategies([strategy]);

        // Simulate trade outcome based on strategy
        let change = 0;
        switch (strategy) {
          case "Trend Following":
            change = ((currentPrice > lastPrice) ? 1 : -1) * 0.01 * investAmount;
            break;
          case "Mean Reversion":
            change = ((currentPrice < lastPrice) ? 1 : -1) * 0.008 * investAmount;
            break;
          case "Scalping (Microtrading)":
            change = (Math.random() - 0.5) * 0.004 * investAmount;
            break;
          case "Arbitrage":
            change = Math.random() * 0.003 * investAmount;
            break;
          case "Market Making":
            change = (Math.random() - 0.5) * 0.002 * investAmount;
            break;
          case "Momentum":
            change = ((currentPrice - lastPrice) / lastPrice) * 0.012 * investAmount;
            break;
          case "Custom":
            change = (Math.random() - 0.5) * 0.01 * investAmount;
            break;
          default:
            change = (Math.random() - 0.5) * 0.01 * investAmount;
        }

        // Update balance and earnings
        setBalance(b => Math.max(0, b + change));
        setEarnings(e => ({
          ...e,
          Trading: e.Trading + change
        }));
        setTotalTrades(t => t + 1);
        setLastPrice(currentPrice);

        // Log trade
        setLog(l => [
          {
            trade: t + 1,
            asset: selectedAsset,
            strategy,
            change: change.toFixed(4),
            price: currentPrice.toFixed(2),
            balance: (balance + change).toFixed(2)
          },
          ...l.slice(0, 29) // keep last 30 trades
        ]);

        // Auto-scale: invest more as balance grows
        setInvestAmount(i => Math.min(balance, Math.max(1, Math.floor(balance / 3))));

        // Simulate earnings from other methods every 100 trades
        if ((totalTrades + 1) % 100 === 0) {
          setEarnings(e => ({
            ...e,
            "Liquidity Provision": e["Liquidity Provision"] + balance * 0.001,
            Staking: e.Staking + balance * 0.0008,
            "Yield Farming": e["Yield Farming"] + balance * 0.0005
          }));
        }
      }, tradingSpeed);
    } else {
      clearInterval(botRef.current);
    }
    return () => clearInterval(botRef.current);
    // eslint-disable-next-line
  }, [isRunning, tradingSpeed, investAmount, selectedAsset, totalTrades, balance, lastPrice]);

  return (
    <div style={{ maxWidth: 540, margin: "3em auto", padding: "2em", background: "#fff", borderRadius: "1.5em", boxShadow: "0 2px 24px #0002" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1em" }}>🤖 Automated Trading Bot Cockpit</h2>
      <div style={{ marginBottom: "1em", fontWeight: "bold" }}>
        Demo Balance: ${balance.toFixed(2)}
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label>Trading Speed (ms): </label>
        <input
          type="range"
          min={10}
          max={1000}
          value={tradingSpeed}
          onChange={e => setTradingSpeed(Number(e.target.value))}
          style={{ width: 200, marginRight: 20 }}
        />
        <span style={{ fontWeight: "bold" }}>{tradingSpeed}ms</span>
        <label style={{ marginLeft: 20 }}>Investment per Trade: </label>
        <input
          type="number"
          min={1}
          max={balance}
          value={investAmount}
          onChange={e => setInvestAmount(Number(e.target.value))}
          style={{ width: 80 }}
        />
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label>Asset: </label>
        <select value={selectedAsset} onChange={e => setSelectedAsset(e.target.value)}>
          {assets.map(a => (
            <option key={a.symbol} value={a.symbol}>{a.name} ({a.symbol})</option>
          ))}
        </select>
        <span style={{ marginLeft: 12, color: "#888" }}>Add more assets/APIs to scale up</span>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label>Strategy: </label>
        <select value={selectedStrategies[0]} onChange={e => setSelectedStrategies([e.target.value])}>
          {strategies.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span style={{ marginLeft: 12, color: "#888" }}>Adaptive: Bot picks best strategy as price moves</span>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <button
          style={{
            background: isRunning ? "#e24343" : "#37c871",
            color: "#fff",
            border: "none",
            borderRadius: "0.8em",
            padding: "0.6em 1.2em",
            fontWeight: "bold",
            fontSize: "1.1em"
          }}
          onClick={() => setIsRunning(r => !r)}
        >
          {isRunning ? "Stop Bot" : "Start Bot"}
        </button>
      </div>
      <div style={{ marginBottom: "1em", fontWeight: "bold" }}>
        Total Trades: {totalTrades}
      </div>
      <h3 style={{ margin: "1.5em 0 0.5em 0", textAlign: "center" }}>Earnings Breakdown</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {earningMethods.map(m => (
          <li key={m} style={{ marginBottom: "0.5em", fontWeight: "bold" }}>
            {m}: ${earnings[m].toFixed(2)}
          </li>
        ))}
      </ul>
      <h3 style={{ margin: "1.5em 0 0.5em 0", textAlign: "center" }}>Recent Trades (last 30)</h3>
      <table style={{ width: "100%", fontSize: "0.9em", borderCollapse: "collapse", marginBottom: "1em" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>#</th>
            <th>Strategy</th>
            <th>Asset</th>
            <th>Change</th>
            <th>Price</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {log.map((entry, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f6f6f6" }}>
              <td>{entry.trade}</td>
              <td>{entry.strategy}</td>
              <td>{entry.asset}</td>
              <td style={{ color: entry.change >= 0 ? "#37c871" : "#e24343" }}>{entry.change}</td>
              <td>{entry.price}</td>
              <td>{entry.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: "center", color: "#888", marginTop: "2em" }}>
        <strong>Full automation:</strong> Bot trades every few ms for max speed.<br />
        <strong>Manual control:</strong> Use slider to slow down trading.<br />
        <strong>Multi-strategy & adaptive:</strong> Bot picks best strategy as market moves.<br />
        <strong>Scalable:</strong> Add more assets, APIs, and methods as you grow.<br />
        <strong>Demo mode:</strong> No risk. Switch to real trading when ready!
      </div>
    </div>
  );
}