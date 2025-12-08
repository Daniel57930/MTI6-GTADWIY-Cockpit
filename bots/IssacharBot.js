/**
 * IssacharBot - Ninth of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Issachar',
  title: 'Issachar - The Reward',
  defaultAppearance: {
    id: 'issachar-default',
    theme: 'wisdom',
    color: '#4B0082',
    icon: '📚'
  },
  description: 'Issachar tribe bot - represents wisdom and understanding of times.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'issachar-web', theme: 'wisdom', color: '#4B0082', icon: '📚' },
    mobile: { id: 'issachar-mobile', theme: 'compact', color: '#4B0082', icon: '📚' },
    terminal: { id: 'issachar-terminal', theme: 'ascii', color: 'indigo', icon: 'I' },
    default: { id: 'issachar-default', theme: 'wisdom', color: '#4B0082', icon: '📚' }
  };
  return appearances[target] || appearances.default;
}

/**
 * Start the bot (synchronous control handle)
 * @returns {object} Control handle with stop()
 */
function start() {
  let isRunning = true;
  return {
    stop: () => { isRunning = false; },
    isRunning: () => isRunning
  };
}

export default {
  metadata,
  morph,
  start
};
