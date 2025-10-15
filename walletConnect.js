// MetaMask sync integration scaffold

export default class WalletConnect {
  constructor() {
    this.isConnected = false;
    this.provider = null;
  }

  async connectMetaMask() {
    if (typeof window === "undefined" || !window.ethereum) {
      console.warn("MetaMask not found");
      return false;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      this.provider = window.ethereum;
      this.isConnected = true;
      console.log("MetaMask connected");
      return true;
    } catch (error) {
      console.error("MetaMask connection error:", error);
      return false;
    }
  }

  getProvider() {
    return this.provider;
  }

  isConnectedToWallet() {
    return this.isConnected;
  }
}
