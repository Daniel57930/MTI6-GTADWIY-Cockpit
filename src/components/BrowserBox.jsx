import React, { useEffect, useState } from 'react'

const BrowserBox = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)

  useEffect(() => {
    setIsMetaMaskInstalled(typeof window !== 'undefined' && !!window.ethereum && window.ethereum.isMetaMask)
  }, [])

  function handleInstall() {
    // Open MetaMask download page in a new tab
    window.open('https://metamask.io/download.html', '_blank', 'noopener,noreferrer')
  }

  function simulateInstall() {
    // Helpful for local testing: inject a lightweight mock provider
    if (!window.ethereum) {
      // eslint-disable-next-line no-undef
      window.ethereum = {
        isMetaMask: true,
        request: ({ method }) => {
          if (method === 'eth_requestAccounts') return Promise.resolve(['0xSIMULATED'])
          if (method === 'eth_chainId') return Promise.resolve('0x1')
          return Promise.reject(new Error('mock: unknown method'))
        },
        on: () => {},
        removeListener: () => {},
      }
      setIsMetaMaskInstalled(true)
      // eslint-disable-next-line no-alert
      alert('Simulated MetaMask provider injected for testing')
    }
  }

  return (
    <div className="browser-box">
      <div className="browser-box__inner">
        <div className="browser-box__left">
          <div className="browser-box__address">https://local.cockpit</div>
        </div>
        <div className="browser-box__center">
          {isMetaMaskInstalled ? (
            <span className="browser-box__status browser-box__status--ok">MetaMask detected</span>
          ) : (
            <span className="browser-box__status browser-box__status--warn">MetaMask not detected</span>
          )}
        </div>
        <div className="browser-box__right">
          {!isMetaMaskInstalled ? (
            <button className="browser-box__btn" onClick={handleInstall}>Install MetaMask</button>
          ) : (
            <button className="browser-box__btn" onClick={() => window.open('https://metamask.io', '_blank')}>Open MetaMask</button>
          )}
          <button className="browser-box__btn browser-box__btn--muted" onClick={simulateInstall}>Simulate</button>
        </div>
      </div>
    </div>
  )
}

export default BrowserBox
