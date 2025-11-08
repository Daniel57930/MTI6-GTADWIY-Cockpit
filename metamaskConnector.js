// Lightweight MetaMask connector using ethers.js
// Provides a backward-compatible API (connectMetaMask, getAccounts) and helper utilities

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
  // ethers.BrowserProvider works in modern ESM browsers/environments
  provider = new ethers.BrowserProvider(window.ethereum, 'any')
  try {
    signer = await provider.getSigner()
  } catch (e) {
    // Some providers may not expose signer until connected
    signer = null
  }
  return provider
}

// Request a connection to MetaMask. Returns { account, chainId, provider }
export async function connectMetaMask() {
  if (!hasEthereumProvider()) {
    throw new Error('No Ethereum provider found (MetaMask not installed)')
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    currentAccount = accounts && accounts.length ? accounts[0] : null
    await initProvider()
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    return { account: currentAccount, chainId, provider }
  } catch (error) {
    // 4001 is user rejected request
    if (error && error.code === 4001) {
      throw new Error('User rejected the connection request.')
    }
    throw new Error(`Failed to connect to MetaMask: ${error && error.message ? error.message : String(error)}`)
  }
}

export async function getAccounts() {
  if (!hasEthereumProvider()) return []
  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    return accounts || []
  } catch (error) {
    console.error('Failed to get accounts:', error)
    return []
  }
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
  // DApps cannot programmatically disconnect MetaMask; clear local state
  currentAccount = null
  signer = null
  provider = null
}

export function onAccountsChanged(callback) {
  if (!hasEthereumProvider()) return () => {}
  const handler = (accounts) => {
    currentAccount = accounts && accounts.length ? accounts[0] : null
    try {
      callback(currentAccount)
    } catch (e) {
      console.error('onAccountsChanged callback error', e)
    }
  }
  window.ethereum.on('accountsChanged', handler)
  return () => window.ethereum.removeListener('accountsChanged', handler)
}

export function onChainChanged(callback) {
  if (!hasEthereumProvider()) return () => {}
  const handler = (chainId) => {
    // Normalize chainId to hex string
    try {
      callback(chainId)
    } catch (e) {
      console.error('onChainChanged callback error', e)
    }
  }
  window.ethereum.on('chainChanged', handler)
  return () => window.ethereum.removeListener('chainChanged', handler)
}

// Optional: expose a small helper for listening to connect/disconnect events
export function onProviderConnect(callback) {
  if (!hasEthereumProvider()) return () => {}
  const handler = (info) => callback(info)
  window.ethereum.on('connect', handler)
  return () => window.ethereum.removeListener('connect', handler)
}

export function onProviderDisconnect(callback) {
  if (!hasEthereumProvider()) return () => {}
  const handler = (error) => callback(error)
  window.ethereum.on('disconnect', handler)
  return () => window.ethereum.removeListener('disconnect', handler)
}