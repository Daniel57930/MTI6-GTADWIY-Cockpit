import React, { useEffect, useState } from 'react';
import useWallet from '../../hooks/useWallet';

// Simple selector UI that delegates to the existing useWallet hook for MetaMask.
// WalletConnect and Supabase entries are present as placeholders for future wiring.
export default function WalletConnector({ onProviderChange }) {
  const [selected, setSelected] = useState('metamask');
  const { account, balance, connect } = useWallet();

  useEffect(() => {
    onProviderChange && onProviderChange(selected, { account, balance });
  }, [selected, account, balance, onProviderChange]);

  function handleSelect(e) {
    const v = e.target.value;
    setSelected(v);
    // If switching to MetaMask, attempt to connect automatically
    if (v === 'metamask') {
      connect().catch(() => {});
    }
    // WalletConnect / Supabase placeholders: emit provider change for caller to handle
    onProviderChange && onProviderChange(v, { account, balance });
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <label style={{ fontSize: 12, color: '#9aa' }}>Wallet</label>
      <select value={selected} onChange={handleSelect} style={{ padding: 8, borderRadius: 6 }}>
        <option value="metamask">MetaMask</option>
        <option value="walletconnect">WalletConnect</option>
        <option value="supabase">Supabase (server)</option>
      </select>

      <div style={{ marginLeft: 12 }}>
        {selected === 'metamask' && !account && (
          <button onClick={connect} style={{ padding: '6px 10px', borderRadius: 6 }}>
            Connect MetaMask
          </button>
        )}

        {account ? (
          <div style={{ fontSize: 12 }}>
            <div style={{ fontWeight: 700 }}>{account}</div>
            <div style={{ opacity: 0.8 }}>{balance ?? '—'}</div>
          </div>
        ) : (
          <div style={{ fontSize: 12, color: '#888' }}>
            {selected === 'walletconnect' ? 'Use WalletConnect flow in-app' : 'Not connected'}
          </div>
        )}
      </div>
    </div>
  );
}