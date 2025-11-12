import React, { useEffect, useState } from 'react';
import useWallet from '../../hooks/useWallet';

export default function TradingPlatform({ city = 'Unknown City' }) {
  const { account, balance, connect } = useWallet();
  const [walletBalance, setWalletBalance] = useState(balance);

  useEffect(() => setWalletBalance(balance), [balance]);

  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{city}</h2>
        <div style={{ background: '#0b1220', color: '#fff', padding: '8px 12px', borderRadius: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Wallet</div>
          <div style={{ fontWeight: 700 }}>{walletBalance ?? '—'}</div>
        </div>
      </header>

      <main>
        {/* Trading UI goes here */}
        <p>Connected account: {account ?? 'Not connected'}</p>
        {!account && <button onClick={connect}>Connect Wallet (MetaMask)</button>}
      </main>
    </div>
  );
}