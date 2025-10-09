// legacyTracker.js
// Spiritual growth logging scaffold

const legacyLog = [];

function logGrowth(event, details = {}) {
  const entry = {
    event,
    details,
    timestamp: new Date().toISOString()
  };
  legacyLog.push(entry);
  console.log('Spiritual growth logged:', entry);
}

function getLegacyLog() {
  return legacyLog;
}

module.exports = {
  logGrowth,
  getLegacyLog
};
