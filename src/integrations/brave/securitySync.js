// Brave security sync helper.
// Produces/exports a JSON "desired settings" file that MTI6 can apply or compare.
// Note: Brave does not expose a universal programmatic settings API for all settings
// across platforms; this helper generates the desired-state payload and helpers
// for automation agents to apply (or to surface in the cockpit UI).
// Usage: const {defaultSettings, exportSettings} = require('./securitySync')

const fs = require('fs');
const os = require('os');
const path = require('path');

const defaultExportDir = path.join(os.homedir(), '.mti6', 'brave');
const defaultExportFile = path.join(defaultExportDir, 'brave_desired_settings.json');

const defaultSettings = {
  // High-level recommended Brave settings for MTI6
  shields: {
    blockTrackers: true,
    blockAds: true,
    blockThirdPartyCookies: true,
    fingerprintingProtection: 'standard', // 'standard'|'strict'
    aggressiveMode: true // recommended to enable aggressive shields where possible
  },
  connections: {
    upgradeInsecureRequests: true, // HTTPS upgrade
    enableHTTPSOnlyMode: true
  },
  privacy: {
    sendDoNotTrack: true,
    preventCrossSiteCookies: true,
    autoClearOnExit: {
      history: true,
      cookies: true,
      cache: true
    },
    disableAutofill: true,
    disablePaymentAutofill: true
  },
  search: {
    defaultEngine: 'DuckDuckGo'
  },
  webrtc: {
    disableNonProxiedUdp: true,
    // explanatory note: Brave exposes this in Settings > Security
  },
  extensions: {
    recommended: [
      { id: 'uBlockOrigin', name: 'uBlock Origin' },
      { id: 'https-everywhere', name: 'HTTPS Everywhere' }
    ],
    banned: [
      // list extension IDs known for tracking (customize per org)
    ]
  },
  tor: {
    preferTorForSensitiveMissions: true,
    logTorAccessesTo: defaultExportDir // where MissionSyncPanel can pick up logs
  }
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
}

function exportSettings(targetPath) {
  const outPath = targetPath || defaultExportFile;
  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, JSON.stringify(defaultSettings, null, 2), { mode: 0o600 });
  return outPath;
}

function loadExportedSettings(pathToFile) {
  if (!fs.existsSync(pathToFile)) throw new Error('Settings file not found: ' + pathToFile);
  return JSON.parse(fs.readFileSync(pathToFile, 'utf8'));
}

module.exports = {
  defaultSettings,
  exportSettings,
  loadExportedSettings,
  exportPath: defaultExportFile
};
