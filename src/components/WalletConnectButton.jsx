/**
 * WalletConnectButton Component
 * Button for connecting/disconnecting Web3 wallets
 */

import React, { useState } from 'react';
import { metamaskConnector } from '../connectors/metamaskConnector';
import { useAddressMonitor } from '../hooks/useAddressMonitor';

export function WalletConnectButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  
  const { address, isConnected } = useAddressMonitor(metamaskConnector);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      await metamaskConnector.connect();
    } catch (err) {
      console.error('Connection error:', err);
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    metamaskConnector.disconnect();
    setError(null);
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="wallet-connect-container">
      {!isConnected ? (
        <button
          className="wallet-connect-button"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-connected">
          <div className="wallet-address" title={address}>
            <span className="address-indicator">●</span>
            {formatAddress(address)}
          </div>
          <button
            className="wallet-disconnect-button"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
      
      {error && (
        <div className="wallet-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default WalletConnectButton;
