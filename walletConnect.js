// walletConnect.js
// MetaMask sync integration scaffold

class WalletConnect {
  constructor() {
    this.isConnected = false;
    this.provider = null;
  }

  async connectMetaMask() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.provider = window.ethereum;
        this.isConnected = true;
        console.log('MetaMask connected');
      } catch (err) {
        console.error('MetaMask connection error:', err);
      }
    } else {
      console.warn('MetaMask not found');
    }
  }

  getProvider() {
    return this.provider;
  }
}

module.exports = WalletConnect;
