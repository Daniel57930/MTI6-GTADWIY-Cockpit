// Lightweight WalletConnect connector (v1 style example).
// Notes: For production use prefer WalletConnect v2 or 'web3modal' / 'wagmi' integrations.
// This connector exposes connect() and disconnect() and returns a provider-compatible object.

import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

let provider = null;
let signer = null;
let currentAccount = null;
let wcProvider = null;

export async function initWalletConnect(options = {}) {
  if (wcProvider) return wcProvider;
  wcProvider = new WalletConnectProvider({
    rpc: options.rpc || { 1: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY" },
    qrcode: true,
  });
  await wcProvider.enable();
  provider = new ethers.providers.Web3Provider(wcProvider, "any");
  signer = provider.getSigner();
  const accounts = await provider.listAccounts();
  currentAccount = accounts[0] || null;
  return wcProvider;
}

export async function connectWalletConnect() {
  if (!wcProvider) await initWalletConnect();
  const accounts = await provider.listAccounts();
  currentAccount = accounts[0] || null;
  const chainId = await wcProvider.request({ method: "eth_chainId" });
  return { account: currentAccount, chainId };
}

export function getWCProvider() {
  return wcProvider;
}

export function getAccount() {
  return currentAccount;
}

export function getSigner() {
  return signer;
}

export async function disconnectWalletConnect() {
  if (!wcProvider) return;
  await wcProvider.disconnect();
  wcProvider = null;
  provider = null;
  signer = null;
  currentAccount = null;
}