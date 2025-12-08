import React from 'react';
import { useWalletContext } from '../Wallet/WalletContext';

export default function TradingPlatform({ city = 'Unknown', symbol = 'BTC', valueUsd = 0, cityId } = {}) {
  const { provider, account, balance, walletMap } = useWalletContext();
  // If walletMap has entry for cityId prefer it
  const cityWallet = cityId ? (walletMap[cityId] || null) : null;
  const displayBalance = cityWallet?.balance ?? balance ?? '—';

  return (
    <div style={{ padding: 20, color: '#eee', background: 'linear-gradient(#071018, #001)', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Trading {String(symbol).toUpperCase()} in {city}</h2>
          <div style={{ opacity: 0.85 }}>Context value (USD): ${Number(valueUsd).toFixed(2)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Provider: {provider}</div>
          <div style={{ fontWeight: 700, marginTop: 4 }}>{account || 'Not connected'}</div>
          <div style={{ marginTop: 4 }}>Balance: {displayBalance}</div>
        </div>
      </div>

      <section style={{ marginTop: 20 }}>
        <div style={{ padding: 12, background: '#06121a88', borderRadius: 8 }}>
          <p>City-specific trading UI placeholder. Wire order forms, charts, and bot controls here.</p>
        </div>
      </section>
    </div>
  );
}