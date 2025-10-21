import React from "react";

const WalletDetailPanel = ({ wallet, onClose }) => (
  <div className="wallet-detail-panel dark-theme">
    <h3>{wallet.label}</h3>
    <p>Address: {wallet.address}</p>
    {/* Replace below with actual wallet data integrations */}
    <ul>
      <li>💰 Balances: [ETH: 1.2, USDC: 200, NFT: 3]</li>
      <li>⚡ Yield: [Staking: 2.1%, Farming: 3.5%]</li>
      <li>🛠️ Trading Positions: [Active/Closed]</li>
      <li>🖼️ NFTs: [List]</li>
      <li>📜 Transactions: [Latest]</li>
    </ul>
    <button onClick={onClose}>Close</button>
  </div>
);

export default WalletDetailPanel;