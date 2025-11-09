/**
 * MetaMask connector (ethers v6)
 *
 * Minimal, safe scaffold to connect to MetaMask (EIP-1193 / window.ethereum)
 * - Returns: { provider, signer, address }
 * - Adds lightweight listeners for account/chain changes (app should handle updates)
 *
 * Install:
 *   npm install ethers@^6
 *
 * Note: MetaMask does not support programmatic "disconnect" — app state should be cleaned up.
 */
import { BrowserProvider } from "ethers";

export async function connectMetaMask() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask (window.ethereum) not found");
  }

  // Ask user to connect
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // Wrap the EIP-1193 provider with ethers v6 BrowserProvider
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  // App-level listeners: you should wire these to your state management
  window.ethereum.on &&
    window.ethereum.on("accountsChanged", (accounts) => {
      console.debug("MetaMask accountsChanged", accounts);
      // Example: emit an event or call a callback to update UI
    });

  window.ethereum.on &&
    window.ethereum.on("chainChanged", (chainId) => {
      console.debug("MetaMask chainChanged", chainId);
      // Example: refresh provider, re-query balances, etc.
    });

  return { provider, signer, address };
}

export async function disconnectMetaMask() {
  // MetaMask doesn't support a remote programmatic disconnect.
  // Clean up any app state, listeners, and UI as needed.
  if (typeof window !== "undefined" && window.ethereum && window.ethereum.removeListener) {
    try {
      window.ethereum.removeListener("accountsChanged", () => {});
      window.ethereum.removeListener("chainChanged", () => {});
    } catch (e) {
      // ignore
    }
  }
  console.debug("disconnectMetaMask: app should clear wallet state");
}