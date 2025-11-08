import React from 'react';

/**
 * BrowserBox Component
 * Displays browser extension status and information
 */
export function BrowserBox({ children, className = '' }) {
  return (
    <div className={`browser-box ${className}`}>
      <div className="browser-box-header">
        <span className="browser-box-title">Browser Extension Status</span>
      </div>
      <div className="browser-box-content">
        {children}
      </div>
    </div>
  );
}

export default BrowserBox;
