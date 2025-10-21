import React, { useState } from "react";
import { connectMetaMask } from "../Wallets/connectMetaMask";

const TOKENS = [
  { symbol: "ETH", address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  { symbol: "USDC", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
  // Add more tokens as needed!
];

export default function TradingPanel() {
  const [wallet, setWallet] = useState(null);
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleConnect = async () => {
    try {
      const addr = await connectMetaMask();
      setWallet(addr);
      setStatus("Connected: " + addr);
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  const handleSwap = async () => {
    // Placeholder for trading logic (Uniswap, 1inch, etc.)
    setStatus("Trade executed (demo) for " + amount + " " + fromToken.symbol + " to " + toToken.symbol);
  };

  return (
    <div className="trading-panel dark-theme">
      <h2>Swap Tokens</h2>
      {!wallet ? (
        <button onClick={handleConnect}>Connect MetaMask</button>
      ) : (
        <div>
          <div>Wallet: {wallet}</div>
          <select value={fromToken.symbol} onChange={e => setFromToken(TOKENS.find(t => t.symbol === e.target.value))}>
            {TOKENS.map(token => <option key={token.symbol}>{token.symbol}</option>)}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <select value={toToken.symbol} onChange={e => setToToken(TOKENS.find(t => t.symbol === e.target.value))}>
            {TOKENS.map(token => <option key={token.symbol}>{token.symbol}</option>)}
          </select>
          <button onClick={handleSwap}>Swap</button>
        </div>
      )}
      <div>{status}</div>
    </div>
  );
}