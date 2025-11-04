import { isBrowser } from '../../src/lib/envGuard';

export async function connectMetaMask() {
  if (!isBrowser()) {
    throw new Error("MetaMask connection requires a browser environment.");
  }
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts[0]; // Returns first connected wallet address
    } catch (error) {
      throw new Error("MetaMask sign-in failed: " + error.message);
    }
  } else {
    throw new Error("MetaMask extension not detected. Please install MetaMask.");
  }
}