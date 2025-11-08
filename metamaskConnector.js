/**
 * MetaMask Connector
 * Provides functionality to connect to MetaMask wallet
 */

export async function connectMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please install MetaMask extension.');
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found. Please unlock MetaMask.');
    }

    return {
      address: accounts[0],
      provider: window.ethereum,
    };
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('User rejected the connection request.');
    }
    throw new Error(`Failed to connect to MetaMask: ${error.message}`);
  }
}

export async function getAccounts() {
  if (typeof window.ethereum === 'undefined') {
    return [];
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    return accounts;
  } catch (error) {
    console.error('Failed to get accounts:', error);
    return [];
  }
}

export function isMetaMaskInstalled() {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
}
