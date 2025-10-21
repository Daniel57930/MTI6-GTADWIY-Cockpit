import React, { useState } from "react";
import WalletDetailPanel from "./WalletDetailPanel";

const walletsList = [
  { address: "0x123...", label: "Main Trading Wallet" },
  { address: "0x456...", label: "Staking Wallet" },
  // Add more wallets here as needed!
];

const WalletsPanel = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  return (
    <div className="wallets-panel dark-theme">
      <h2>💼 Sovereign Wallets</h2>
      <ul>
        {walletsList.map(wallet => (
          <li key={wallet.address}>
            <button onClick={() => setSelectedWallet(wallet)}>
              {wallet.label} ({wallet.address.slice(0, 8)}...)
            </button>
          </li>
        ))}
      </ul>
      {selectedWallet && (
        <WalletDetailPanel wallet={selectedWallet} onClose={() => setSelectedWallet(null)} />
      )}
    </div>
  );
};

export default WalletsPanel;
