import { useState, useEffect } from 'react';

/**
 * useAddressMonitor Hook
 * Monitors wallet address changes
 */
export function useAddressMonitor(initialAddress = null) {
  const [address, setAddress] = useState(initialAddress);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') {
      return;
    }

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        setAddress(null);
      } else {
        setAddress(accounts[0]);
      }
    };

    const handleChainChanged = () => {
      // Reload the page on chain change as recommended by MetaMask
      window.location.reload();
    };

    setIsMonitoring(true);

    // Listen for account changes
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Cleanup listeners on unmount
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
      setIsMonitoring(false);
    };
  }, []);

  return { address, isMonitoring };
}

export default useAddressMonitor;
