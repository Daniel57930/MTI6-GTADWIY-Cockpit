// Spiritual growth logging utilities

const legacyLog = [];

export function logGrowth(event, details = {}) {
  const entry = {
    event,
    details,
    timestamp: new Date().toISOString()
  };

  legacyLog.push(entry);
  console.log("Spiritual growth logged:", entry);
  return entry;
}

export function getLegacyLog() {
  return [...legacyLog];
}
