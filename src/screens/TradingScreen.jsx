import React, { useState } from "react";

// Mock candlestick chart (placeholder)
function CandlestickChart() {
  return (
    <div style={{
      height: "220px",
      background: "linear-gradient(90deg,#222 20%,#eee 100%)",
      borderRadius: "12px",
      marginBottom: "1em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold"
    }}>
      <span style={{ fontSize: "2em" }}>📈</span>
      <span style={{ marginLeft: "1em" }}>Candlestick Chart</span>
    </div>
  );
}

const initialWallets = [
  { address: "0xD4...B9C2", label: "Main Wallet", status: "Connected" },
  { address: "0xA3...F8D1", label: "Secondary Wallet", status: "Connected" }
];

export default function TradingScreen() {
  const [wallets, setWallets] = useState(initialWallets);
  const [selectedWalletIdx, setSelectedWalletIdx] = useState(0);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [tradeType, setTradeType] = useState("Call");
  const [amount, setAmount] = useState(100);

  // Placeholder for security logic (expand with actual wallet guardrails)
  function switchWallet(idx) {
    // Add security checks here (2FA, biometric, etc.)
    setSelectedWalletIdx(idx);
    setToggleOpen(false);
  }

  // To add a wallet securely
  function addWallet(address, label) {
    // Add custom security logic here before adding
    setWallets(prev => [...prev, { address, label, status: "Connected" }]);
  }

  return (
    <div className="trading-screen" style={{ maxWidth: 520, margin: "3em auto", padding: "2em", background: "#fff", borderRadius: "1.5em", boxShadow: "0 2px 24px #0002", position: "relative" }}>
      {/* Wallet Selector */}
      <div style={{
        position: "absolute",
        top: 20,
        right: 24,
        zIndex: 200
      }}>
        <button
          style={{
            fontWeight: "bold",
            background: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "1em",
            padding: "0.4em 1em",
            cursor: "pointer",
            fontSize: "1em",
            boxShadow: "0 2px 8px #0002"
          }}
          onClick={() => setToggleOpen(v => !v)}
        >
          {wallets[selectedWalletIdx].label} <span style={{ fontFamily: "monospace", marginLeft: "0.5em" }}>{wallets[selectedWalletIdx].address}</span> ▼
        </button>
        {toggleOpen && (
          <div style={{
            background: "#fff",
            borderRadius: "0.8em",
            boxShadow: "0 2px 12px #0003",
            marginTop: "0.4em",
            minWidth: "270px",
            position: "absolute",
            right: 0
          }}>
            {wallets.map((w, idx) => (
              <div
                key={w.address}
                style={{
                  padding: "0.6em 1em",
                  cursor: "pointer",
                  background: idx === selectedWalletIdx ? "#eee" : "#fff",
                  borderBottom: idx < wallets.length - 1 ? "1px solid #eee" : "none",
                  display: "flex",
                  alignItems: "center"
                }}
                onClick={() => switchWallet(idx)}
              >
                <span style={{ fontWeight: "bold" }}>{w.label}</span>
                <span style={{ fontFamily: "monospace", marginLeft: "0.8em" }}>{w.address}</span>
                <span style={{ color: "#37c871", fontWeight: "bold", marginLeft: "0.8em" }}>{w.status}</span>
              </div>
            ))}
            <div style={{ padding: "0.6em 1em", textAlign: "center" }}>
              <button
                style={{
                  background: "#37c871",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.8em",
                  padding: "0.4em 1em",
                  cursor: "pointer",
                  fontSize: "0.95em",
                  fontWeight: "bold",
                  marginTop: "0.4em"
                }}
                onClick={() => {
                  // Example: add a wallet (replace with real logic or modal)
                  const address = prompt("Enter new wallet address:");
                  const label = prompt("Enter wallet label:");
                  if (address && label) addWallet(address, label);
                }}
              >
                + Add Wallet
              </button>
            </div>
          </div>
        )}
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "0.5em" }}>Trading Platform</h1>
      <CandlestickChart />
      <div style={{ display: "flex", marginBottom: "1em" }}>
        <button
          onClick={() => setTradeType("Call")}
          style={{
            flex: 1,
            padding: "0.8em",
            background: tradeType === "Call" ? "#37c871" : "#eee",
            color: tradeType === "Call" ? "#fff" : "#333",
            border: "none",
            borderRadius: "0.5em 0 0 0.5em",
            fontWeight: "bold"
          }}
        >Call</button>
        <button
          onClick={() => setTradeType("Put")}
          style={{
            flex: 1,
            padding: "0.8em",
            background: tradeType === "Put" ? "#e24343" : "#eee",
            color: tradeType === "Put" ? "#fff" : "#333",
            border: "none",
            borderRadius: "0 0.5em 0.5em 0",
            fontWeight: "bold"
          }}
        >Put</button>
      </div>
      <div style={{ marginBottom: "1em" }}>
        <label style={{ marginRight: "1em", fontWeight: "bold" }}>Amount:</label>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          style={{ padding: "0.5em", borderRadius: "0.5em", border: "1px solid #ccc", width: 100, fontWeight: "bold" }}
        />
        <span style={{ marginLeft: "0.5em", fontWeight: "bold" }}>$</span>
      </div>
      <button
        style={{
          width: "100%",
          padding: "1em",
          background: tradeType === "Call" ? "#37c871" : "#e24343",
          color: "#fff",
          border: "none",
          borderRadius: "0.8em",
          fontSize: "1.2em",
          fontWeight: "bold",
          marginBottom: "1em"
        }}
        onClick={() => alert(`Placed ${tradeType} trade for $${amount} with ${wallets[selectedWalletIdx].label}`)}
      >
        Place {tradeType} Trade
      </button>
      <div style={{ textAlign: "center", color: "#888", fontSize: "0.9em" }}>
        * This is a demo interface for cockpit trading.<br />
        Wallet switching uses secure placeholder logic.
      </div>
    </div>
  );
}