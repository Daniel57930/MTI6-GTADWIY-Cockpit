// Simple in-memory BotStats logger. Attach to window.BotStatsLogger for global access.
const store = [];

function log(entry) {
  const e = { ts: new Date().toISOString(), ...entry };
  store.push(e);
  // Keep last 1000 entries
  if (store.length > 1000) store.shift();
  console.log("[BotStatsLogger]", e);
}

function getRecent(limit = 100) {
  return store.slice(-limit).reverse();
}

const BotStatsLogger = { log, getRecent };

if (typeof window !== "undefined") {
  window.BotStatsLogger = BotStatsLogger;
}

export default BotStatsLogger;
