/**
 * Connect to MetaMask wallet
 * 
 * Prompts the user to connect their MetaMask wallet and returns the connected address.
 * Requires MetaMask browser extension to be installed.
 * 
 * @returns {Promise<string>} The connected wallet address
 * @throws {Error} If MetaMask is not installed or connection fails
 */
export async function connectMetaMask() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts[0]; // Returns first connected wallet address
    } catch (error) {
      throw new Error("MetaMask sign-in failed: " + error.message);
    }
  } else {
    throw new Error("MetaMask extension not detected.");
  }
}