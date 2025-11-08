import { useMemo, useState } from "react";
import BlessingOverlay from "../blessingOverlay.jsx";
import EmotionalOverlay from "../emotionalOverlay.jsx";
import OverridePanel from "../overridePanel.jsx";
import CashAppBridge from "../cashAppBridge.js";
import WalletConnect from "../walletConnect.js";
import BrowserBox from "./components/BrowserBox";
import WalletConnectButton from "./components/WalletConnectButton";
import {
  activateStarSync,
  deactivateStarSync,
  getMilestones,
  isStarSyncActive,
  logMilestone
} from "../milestoneTracker.js";
import { getLegacyLog, logGrowth } from "../legacyTracker.js";
import "../styles/cockpit.css";

const App = () => {
  const walletConnector = useMemo(() => new WalletConnect(), []);
  const cashBridge = useMemo(() => new CashAppBridge(), []);

  const [milestoneName, setMilestoneName] = useState("");
  const [milestoneDetail, setMilestoneDetail] = useState("");
  const [milestones, setMilestones] = useState(getMilestones());
  const [starSyncEnabled, setStarSyncEnabled] = useState(isStarSyncActive());

  const [legacyReflection, setLegacyReflection] = useState("");
  const [legacyEntries, setLegacyEntries] = useState(getLegacyLog());

  const [depositAmount, setDepositAmount] = useState("");
  const [depositAccount, setDepositAccount] = useState("");
  const [depositQueue, setDepositQueue] = useState(cashBridge.getDepositQueue());

  const [walletStatus, setWalletStatus] = useState("disconnected");

  const handleMilestoneSubmit = (event) => {
    event.preventDefault();
    if (!milestoneName.trim()) {
      return;
    }

    logMilestone(milestoneName.trim(),
      milestoneDetail.trim()
        ? { note: milestoneDetail.trim() }
        : undefined
    );
    setMilestones(getMilestones());
    setMilestoneName("");
    setMilestoneDetail("");
  };

  const toggleStarSync = () => {
    if (starSyncEnabled) {
      deactivateStarSync();
    } else {
      activateStarSync();
    }
    setStarSyncEnabled(isStarSyncActive());
  };

  const handleLegacySubmit = (event) => {
    event.preventDefault();
    if (!legacyReflection.trim()) {
      return;
    }

    logGrowth("Legacy milestone", { reflection: legacyReflection.trim() });
    setLegacyEntries(getLegacyLog());
    setLegacyReflection("");
  };

  const handleDepositSubmit = async (event) => {
    event.preventDefault();
    const cleanedAccount = depositAccount.trim();
    const parsedAmount = Number(depositAmount);

    if (!cleanedAccount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    await cashBridge.stealthDeposit(parsedAmount, cleanedAccount);
    setDepositQueue(cashBridge.getDepositQueue());
    setDepositAmount("");
    setDepositAccount("");
  };

  const connectWallet = async () => {
    const connected = await walletConnector.connectMetaMask();
    setWalletStatus(connected ? "connected" : "disconnected");
  };

  return (
    <div className="cockpit-dashboard">
      <BrowserBox />
      <header className="dashboard-header">
        <h1 className="dashboard-title">GTADWIY Cockpit</h1>
        <p className="dashboard-subtitle">
          Manage sovereign overrides, emotional overlays, milestones, and financial flows.
        </p>
      </header>

      <main className="dashboard-main">
        <div className="panel-grid">
          <div className="panel-column">
            <BlessingOverlay />
            <EmotionalOverlay />
          </div>

          <div className="panel-column">
            <OverridePanel />

            <section className="control-card milestone-tracker">
              <div className="control-card__header">
                <h2 className="control-card__title">Milestone Tracker</h2>
                <button
                  type="button"
                  className={`toggle-button ${starSyncEnabled ? "toggle-button--active" : ""}`}
                  onClick={toggleStarSync}
                >
                  {starSyncEnabled ? "Star Sync Enabled" : "Enable Star Sync"}
                </button>
              </div>

              <form className="form-grid" onSubmit={handleMilestoneSubmit}>
                <label className="form-field">
                  <span className="field-label">Milestone name</span>
                  <input
                    className="field-input"
                    type="text"
                    value={milestoneName}
                    onChange={(event) => setMilestoneName(event.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Details</span>
                  <textarea
                    className="field-input field-input--multiline"
                    value={milestoneDetail}
                    onChange={(event) => setMilestoneDetail(event.target.value)}
                    rows={3}
                  />
                </label>

                <div className="form-actions">
                  <button type="submit" className="primary-action-button">
                    Log milestone
                  </button>
                </div>
              </form>

              <ul className="data-list">
                {milestones.map((milestone) => (
                  <li key={milestone.timestamp} className="data-list__item">
                    <div>
                      <p className="data-list__title">{milestone.name}</p>
                      {milestone.details?.note ? (
                        <p className="data-list__note">{milestone.details.note}</p>
                      ) : null}
                    </div>
                    <div className="data-list__meta">
                      <span>{new Date(milestone.timestamp).toLocaleString()}</span>
                      {milestone.star ? <span className="meta-badge">Star</span> : null}
                    </div>
                  </li>
                ))}
                {milestones.length === 0 ? (
                  <li className="data-list__item data-list__item--empty">No milestones logged yet.</li>
                ) : null}
              </ul>
            </section>
          </div>

          <div className="panel-column">
            <section className="control-card legacy-panel">
              <h2 className="control-card__title">Legacy Log</h2>
              <form className="form-grid" onSubmit={handleLegacySubmit}>
                <label className="form-field">
                  <span className="field-label">Reflection</span>
                  <textarea
                    className="field-input field-input--multiline"
                    value={legacyReflection}
                    onChange={(event) => setLegacyReflection(event.target.value)}
                    rows={3}
                  />
                </label>
                <div className="form-actions">
                  <button type="submit" className="primary-action-button">
                    Log reflection
                  </button>
                </div>
              </form>

              <ul className="data-list">
                {legacyEntries.map((entry) => (
                  <li key={entry.timestamp} className="data-list__item">
                    <div>
                      <p className="data-list__title">{entry.event}</p>
                      {entry.details?.reflection ? (
                        <p className="data-list__note">{entry.details.reflection}</p>
                      ) : null}
                    </div>
                    <div className="data-list__meta">
                      <span>{new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
                  </li>
                ))}
                {legacyEntries.length === 0 ? (
                  <li className="data-list__item data-list__item--empty">No reflections recorded yet.</li>
                ) : null}
              </ul>
            </section>

            <section className="control-card finance-panel">
              <h2 className="control-card__title">Stealth Deposits</h2>
              <form className="form-grid" onSubmit={handleDepositSubmit}>
                <label className="form-field">
                  <span className="field-label">Amount</span>
                  <input
                    className="field-input"
                    type="number"
                    min="0"
                    step="0.01"
                    value={depositAmount}
                    onChange={(event) => setDepositAmount(event.target.value)}
                  />
                </label>

                <label className="form-field">
                  <span className="field-label">Account identifier</span>
                  <input
                    className="field-input"
                    type="text"
                    value={depositAccount}
                    onChange={(event) => setDepositAccount(event.target.value)}
                  />
                </label>

                <div className="form-actions">
                  <button type="submit" className="primary-action-button">
                    Queue deposit
                  </button>
                </div>
              </form>

              <ul className="data-list">
                {depositQueue.map((deposit) => (
                  <li key={deposit.timestamp} className="data-list__item">
                    <div>
                      <p className="data-list__title">
                        {deposit.amount.toLocaleString(undefined, {
                          style: "currency",
                          currency: "USD"
                        })}
                      </p>
                      <p className="data-list__note">{deposit.account}</p>
                    </div>
                    <div className="data-list__meta">
                      <span>{new Date(deposit.timestamp).toLocaleString()}</span>
                      <span className="meta-badge">{deposit.status}</span>
                    </div>
                  </li>
                ))}
                {depositQueue.length === 0 ? (
                  <li className="data-list__item data-list__item--empty">No deposits queued yet.</li>
                ) : null}
              </ul>
            </section>

            <section className="control-card wallet-panel">
              <div className="control-card__header">
                <h2 className="control-card__title">Wallet Sync</h2>
                <span className={`status-indicator status-indicator--${walletStatus}`}></span>
              </div>
              <p className="control-card__description">
                Connect MetaMask to synchronize cockpit telemetry with blockchain controls.
              </p>
              <WalletConnectButton />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;