import React, { useState } from 'react';
import { connectMetaMask } from '../../metamaskConnector.js';

/**
 * WalletConnectButton Component
 * Button to connect to MetaMask wallet
 */
export function WalletConnectButton({ onConnect, onError }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const { address } = await connectMetaMask();
      setConnectedAddress(address);
      if (onConnect) {
        onConnect(address);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  if (connectedAddress) {
    return (
      <div className="wallet-connected">
        <span>Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}</span>
      </div>
    );
  }

  return (
    <button
      className="wallet-connect-button"
      onClick={handleConnect}
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}

export default WalletConnectButton;
