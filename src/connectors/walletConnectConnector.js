/**
 * WalletConnect Connector
 * Fallback connector for mobile wallets and WalletConnect protocol
 */

class WalletConnectConnector {
  constructor() {
    this.provider = null;
    this.address = null;
    this.connected = false;
  }

  /**
   * Check if WalletConnect is available
   */
  isAvailable() {
    // WalletConnect requires additional setup and SDK
    // This is a placeholder implementation
    return false;
  }

  /**
   * Connect via WalletConnect
   * @returns {Promise<string>} Connected wallet address
   */
  async connect() {
    throw new Error('WalletConnect is not yet configured. Please use MetaMask or add WalletConnect SDK.');
  }

  /**
   * Disconnect from WalletConnect
   */
  async disconnect() {
    this.provider = null;
    this.address = null;
    this.connected = false;
  }

  /**
   * Get current wallet address
   * @returns {string|null} Current address or null if not connected
   */
  getAddress() {
    return this.address;
  }

  /**
   * Check connection status
   * @returns {boolean} True if connected
   */
  isConnected() {
    return this.connected;
  }
}

// Export singleton instance
export const walletConnectConnector = new WalletConnectConnector();
export default walletConnectConnector;
