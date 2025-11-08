// Lightweight MetaMask connector using ethers.js
// Usage:
//   import { connectMetaMask, getAccount, onAccountsChanged } from './metamaskConnector'
//   await connectMetaMask()
//   const addr = getAccount()

import { ethers } from 'ethers'

let provider = null
let signer = null
let currentAccount = null

function hasEthereumProvider() {
  return typeof window !== 'undefined' && !!window.ethereum
}

export function isMetaMaskInstalled() {
  return hasEthereumProvider() && window.ethereum.isMetaMask === true
}

export async function initProvider() {
  if (!hasEthereumProvider()) {
    provider = null
    signer = null
    return null
  }
  provider = new ethers.BrowserProvider(window.ethereum, 'any')
  signer = await provider.getSigner()
  return provider
}

export async function connectMetaMask() {
  if (!hasEthereumProvider()) {
    throw new Error('No Ethereum provider found (MetaMask not installed)')
  }
  // request accounts
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  currentAccount = accounts && accounts.length ? accounts[0] : null
  await initProvider()
  // optionally fetch chainId
  const chainId = await window.ethereum.request({ method: 'eth_chainId' })
  return { account: currentAccount, chainId }
}

export function getAccount() {
  return currentAccount
}

export function getSigner() {
  return signer
}

export function getProvider() {
  return provider
}

export function disconnect() {
  // MetaMask doesn't expose a programmatic "disconnect" for dapps.
  currentAccount = null
  signer = null
  provider = null
}

export function onAccountsChanged(callback) {
  if (!hasEthereumProvider()) return () => {}
  const handler = (accounts) => {
    currentAccount = accounts && accounts.length ? accounts[0] : null
    callback(currentAccount)
  }
  window.ethereum.on('accountsChanged', handler)
  return () => window.ethereum.removeListener('accountsChanged', handler)
}

export function onChainChanged(callback) {
  if (!hasEthereumProvider()) return () => {}
  const handler = (chainId) => {
    // chainId is a hex string like '0x1'
    callback(chainId)
  }
  window.ethereum.on('chainChanged', handler)
  return () => window.ethereum.removeListener('chainChanged', handler)
}
