// Integrations index for Brave — exports the helpers for MTI6 to use
// Usage: const brave = require('./integrations/brave');

const batFetcher = require('./batFetcher');
const onionLogger = require('./onionLogger');
const securitySync = require('./securitySync');

function mapEarningsToBots(balance, mapping = {}) {
  // Simple example: distribute BAT among named bots by weights in mapping
  // mapping is { botName: weightNumber }
  const totalWeight = Object.values(mapping).reduce((s, w) => s + (w || 0), 0) || 1;
  const distribution = {};
  Object.keys(mapping).forEach(bot => {
    const weight = mapping[bot] || 0;
    distribution[bot] = Number(((balance * (weight / totalWeight)) || 0).toFixed(6));
  });
  return distribution;
}

module.exports = {
  batFetcher,
  onionLogger,
  securitySync,
  mapEarningsToBots
};