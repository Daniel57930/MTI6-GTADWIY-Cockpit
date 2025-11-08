/**
 * useAddressMonitor Hook
 * React hook for monitoring wallet address changes
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Monitor wallet address changes
 * @param {Object} connector - Wallet connector instance
 * @param {number} pollInterval - Polling interval in milliseconds (default: 1000)
 * @returns {Object} { address, isConnected, error }
 */
export function useAddressMonitor(connector, pollInterval = 1000) {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const checkAddress = useCallback(async () => {
    try {
      if (connector && typeof connector.getAddress === 'function') {
        const currentAddress = connector.getAddress();
        
        if (currentAddress !== address) {
          setAddress(currentAddress);
          setIsConnected(!!currentAddress);
        }
        
        setError(null);
      }
    } catch (err) {
      console.error('Error checking address:', err);
      setError(err.message);
      setIsConnected(false);
    }
  }, [connector, address]);

  useEffect(() => {
    // Initial check
    checkAddress();

    // Set up polling
    const intervalId = setInterval(checkAddress, pollInterval);

    // Cleanup
    return () => {
      clearInterval(intervalId);
    };
  }, [checkAddress, pollInterval]);

  // Listen for account changes if MetaMask
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        const newAddress = accounts[0] || null;
        setAddress(newAddress);
        setIsConnected(!!newAddress);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return {
    address,
    isConnected,
    error
  };
}

export default useAddressMonitor;
