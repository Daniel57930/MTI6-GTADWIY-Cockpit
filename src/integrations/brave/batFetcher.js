// BAT earnings fetcher for Brave (Node.js)
// Reads Brave's ledger_state.json (if present) and exposes helpers
// Usage: const {getLedgerState, getBalance} = require('./batFetcher')

const fs = require('fs');
const os = require('os');
const path = require('path');

function defaultLedgerPaths() {
  const homedir = os.homedir();
  const platform = os.platform();
  if (platform === 'win32') {
    const local = process.env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');
    return [
      path.join(local, 'BraveSoftware', 'Brave-Browser', 'User Data', 'Default', 'ledger_state.json')
    ];
  } else if (platform === 'darwin') {
    return [
      path.join(homedir, 'Library', 'Application Support', 'BraveSoftware', 'Brave-Browser', 'Default', 'ledger_state.json')
    ];
  } else {
    // assume linux
    return [
      path.join(homedir, '.config', 'BraveSoftware', 'Brave-Browser', 'Default', 'ledger_state.json'),
      path.join(homedir, '.config', 'brave', 'Brave-Browser', 'Default', 'ledger_state.json')
    ];
  }
}

function findLedgerFile(customPath) {
  if (customPath) {
    if (fs.existsSync(customPath)) return customPath;
  }
  for (const p of defaultLedgerPaths()) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function readJsonSafe(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to read/parse JSON at ${filePath}: ${err.message}`);
  }
}

// Attempts to extract common BAT balance/rewards fields; if structure differs,
// returns raw object so consumers can process according to their Brave version.
function parseLedgerObject(obj) {
  // Known-ish structures vary by Brave version; be defensive
  const result = {
    raw: obj,
    balanceBAT: null,
    pendingBAT: null,
    earningsHistory: null
  };

  // Some Brave versions store wallet info under 'wallet' or 'wallet_state'
  if (obj && typeof obj === 'object') {
    if (obj.wallet && typeof obj.wallet === 'object') {
      const w = obj.wallet;
      result.balanceBAT = w.balance || w.ledger_balance || w.state || null;
    }
    if (obj.rewards && typeof obj.rewards === 'object') {
      const r = obj.rewards;
      result.balanceBAT = r.balance || result.balanceBAT;
      result.earningsHistory = r.history || r.monthly || r.estimated || null;
    }
    // common key names
    result.balanceBAT = result.balanceBAT || obj.balance || obj.estimated_balance || obj.estimatedBalance || null;
    result.pendingBAT = obj.pending || obj.pending_rewards || null;
    // If there's a "stats" or "accrual" key, include it
    result.earningsHistory = result.earningsHistory || obj.stats || obj.accrual || null;
  }

  return result;
}

function getLedgerState(options = {}) {
  // options.path may be provided
  const file = findLedgerFile(options.path);
  if (!file) {
    throw new Error('ledger_state.json not found. Provide path via options.path or ensure Brave is installed and has Rewards enabled.');
  }
  const obj = readJsonSafe(file);
  return parseLedgerObject(obj);
}

function getBalance(options = {}) {
  const state = getLedgerState(options);
  // prefer numeric balance if present, otherwise return null
  const numeric = state.balanceBAT;
  if (typeof numeric === 'number') return numeric;
  // try nested numeric in strings
  if (typeof numeric === 'string') {
    const n = parseFloat(numeric);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

module.exports = {
  getLedgerState,
  getBalance,
  findLedgerFile
};