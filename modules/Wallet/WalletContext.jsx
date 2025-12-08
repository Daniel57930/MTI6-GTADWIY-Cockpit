import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useWallet from '../../hooks/useWallet';

// WalletContext: provides { provider, account, balance, walletMap, setWalletMap, connect, setProvider }
const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [provider, setProvider] = useState('metamask');
  const { account, balance, connect } = useWallet(); // existing MetaMask hook
  const [walletMap, setWalletMap] = useState({}); // keyed by cityId
  const value = useMemo(() => ({ provider, setProvider, account, balance, connect, walletMap, setWalletMap }), [provider, account, balance, walletMap]);

  // Example: seed walletMap with local account (simple heuristic)
  useEffect(() => {
    if (!account) return;
    // If you have city mapping per-account, populate walletMap here (placeholder)
    // setWalletMap(m => ({ ...m, someCityId: { account, balance } }));
  }, [account, balance]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWalletContext must be used within WalletProvider');
  return ctx;
}

export default WalletContext;