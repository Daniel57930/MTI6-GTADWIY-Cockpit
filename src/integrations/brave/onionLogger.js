// .onion access logger for cockpit MissionSyncPanel
// Provides logging for .onion accesses (timestamp, url, bot tags, optional metadata).
// Usage: const {logOnionAccess, readOnionLog} = require('./onionLogger');

const fs = require('fs');
const os = require('os');
const path = require('path');

const defaultLogDir = path.join(os.homedir(), '.mti6', 'logs');
const defaultLogFile = path.join(defaultLogDir, 'brave_onion_access.log');

function ensureLogDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  }
}

function isOnionUrl(url) {
  try {
    // quick check for .onion suffix
    return typeof url === 'string' && /\.onion(\/|$)/i.test(url);
  } catch {
    return false;
  }
}

function logOnionAccess(url, opts = {}) {
  const {tags = [], bot = null, meta = {}} = opts;
  if (!isOnionUrl(url)) {
    throw new Error('URL does not appear to be a .onion address');
  }
  ensureLogDir(defaultLogDir);
  const entry = {
    ts: new Date().toISOString(),
    url,
    tags,
    bot,
    meta
  };
  fs.appendFileSync(defaultLogFile, JSON.stringify(entry) + '\n', { mode: 0o600 });
  return entry;
}

function readOnionLog(limit = 200) {
  if (!fs.existsSync(defaultLogFile)) return [];
  const lines = fs.readFileSync(defaultLogFile, 'utf8').trim().split('\n').filter(Boolean);
  const last = lines.slice(-limit);
  return last.map(l => {
    try { return JSON.parse(l); } catch { return {raw: l}; }
  });
}

module.exports = {
  logOnionAccess,
  readOnionLog,
  logFile: defaultLogFile
};
