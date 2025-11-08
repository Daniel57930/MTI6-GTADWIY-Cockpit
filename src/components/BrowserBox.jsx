/**
 * BrowserBox Component
 * Displays browser detection and compatibility information
 */

import React from 'react';

export function BrowserBox() {
  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown Browser';
    let isCompatible = false;

    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
      browserName = 'Chrome';
      isCompatible = true;
    } else if (userAgent.indexOf('Firefox') > -1) {
      browserName = 'Firefox';
      isCompatible = true;
    } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
      browserName = 'Safari';
      isCompatible = true;
    } else if (userAgent.indexOf('Edg') > -1) {
      browserName = 'Edge';
      isCompatible = true;
    } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      browserName = 'Opera';
      isCompatible = true;
    }

    return { browserName, isCompatible };
  };

  const hasMetaMask = typeof window !== 'undefined' && 
                      typeof window.ethereum !== 'undefined' && 
                      window.ethereum.isMetaMask;

  const { browserName, isCompatible } = detectBrowser();

  return (
    <div className="browser-box">
      <div className="browser-info">
        <span className="browser-label">Browser:</span>
        <span className={`browser-name ${isCompatible ? 'compatible' : 'incompatible'}`}>
          {browserName}
        </span>
      </div>
      <div className="metamask-status">
        <span className="metamask-label">MetaMask:</span>
        <span className={`metamask-indicator ${hasMetaMask ? 'installed' : 'not-installed'}`}>
          {hasMetaMask ? '✓ Installed' : '✗ Not Installed'}
        </span>
      </div>
      {!hasMetaMask && (
        <div className="metamask-prompt">
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="install-metamask-link"
          >
            Install MetaMask
          </a>
        </div>
      )}
    </div>
  );
}

export default BrowserBox;
