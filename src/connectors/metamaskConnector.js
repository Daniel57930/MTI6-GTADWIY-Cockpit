/**
 * MetaMask Web3 Connector
 * Handles connection to MetaMask wallet extension
 */

import { ethers } from 'ethers';

class MetaMaskConnector {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.address = null;
  }

  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled() {
    return typeof window !== 'undefined' && 
           typeof window.ethereum !== 'undefined' && 
           window.ethereum.isMetaMask;
  }

  /**
   * Connect to MetaMask wallet
   * @returns {Promise<string>} Connected wallet address
   */
  async connect() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask extension.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // Create ethers provider
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.address = accounts[0];

      // Listen for account changes
      window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
      
      // Listen for chain changes
      window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));

      return this.address;
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
      throw error;
    }
  }

  /**
   * Disconnect from MetaMask
   */
  disconnect() {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', this.handleChainChanged);
    }
    this.provider = null;
    this.signer = null;
    this.address = null;
  }

  /**
   * Get current wallet address
   * @returns {string|null} Current address or null if not connected
   */
  getAddress() {
    return this.address;
  }

  /**
   * Get current network/chain ID
   * @returns {Promise<string>} Chain ID
   */
  async getChainId() {
    if (!this.provider) {
      throw new Error('Not connected to MetaMask');
    }
    const network = await this.provider.getNetwork();
    return network.chainId.toString();
  }

  /**
   * Get account balance
   * @returns {Promise<string>} Balance in ETH
   */
  async getBalance() {
    if (!this.provider || !this.address) {
      throw new Error('Not connected to MetaMask');
    }
    const balance = await this.provider.getBalance(this.address);
    return ethers.formatEther(balance);
  }

  /**
   * Handle account changes
   * @param {string[]} accounts New accounts array
   */
  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // User disconnected their wallet
      this.disconnect();
    } else if (accounts[0] !== this.address) {
      // User switched accounts
      this.address = accounts[0];
    }
  }

  /**
   * Handle chain changes
   * @param {string} chainId New chain ID
   */
  handleChainChanged(chainId) {
    // Reload the page on chain change as recommended by MetaMask
    window.location.reload();
  }

  /**
   * Sign a message
   * @param {string} message Message to sign
   * @returns {Promise<string>} Signature
   */
  async signMessage(message) {
    if (!this.signer) {
      throw new Error('Not connected to MetaMask');
    }
    return await this.signer.signMessage(message);
  }

  /**
   * Send a transaction
   * @param {Object} transaction Transaction object
   * @returns {Promise<Object>} Transaction receipt
   */
  async sendTransaction(transaction) {
    if (!this.signer) {
      throw new Error('Not connected to MetaMask');
    }
    const tx = await this.signer.sendTransaction(transaction);
    return await tx.wait();
  }
}

// Export singleton instance
export const metamaskConnector = new MetaMaskConnector();
export default metamaskConnector;
