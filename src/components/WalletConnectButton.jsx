import React, { useEffect, useState } from 'react'
import {
  isMetaMaskInstalled,
  connectMetaMask,
  onAccountsChanged,
  onChainChanged,
  disconnect as disconnectConnector,
} from '../../metamaskConnector.js'

export default function WalletConnectButton() {
  const [installed, setInstalled] = useState(false)
  const [account, setAccount] = useState(null)
  const [chain, setChain] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setInstalled(isMetaMaskInstalled())
    const unsubA = onAccountsChanged((acct) => setAccount(acct))
    const unsubC = onChainChanged((c) => setChain(c))
    if (isMetaMaskInstalled() && window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress)
    }
    return () => {
      unsubA()
      unsubC()
    }
  }, [])

  async function handleConnect() {
    setError(null)
    try {
      const res = await connectMetaMask()
      setAccount(res.account)
      setChain(res.chainId)
    } catch (err) {
      setError(err?.message || String(err))
    }
  }

  function handleDisconnect() {
    disconnectConnector()
    setAccount(null)
    setChain(null)
  }

  return (
    <div className="wallet-connect">
      {installed ? (
        account ? (
          <div>
            <div>Connected: {account}</div>
            <div>Chain: {chain}</div>
            <button onClick={handleDisconnect}>Disconnect</button>
          </div>
        ) : (
          <button onClick={handleConnect}>Connect MetaMask</button>
        )
      ) : (
        <div>
          <div>MetaMask not detected</div>
          <a href="https://metamask.io/download.html" target="_blank" rel="noreferrer">Install MetaMask</a>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  )
}