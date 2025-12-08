/**
 * JosephBot - Eleventh of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Joseph',
  title: 'Joseph - The Fruitful',
  defaultAppearance: {
    id: 'joseph-default',
    theme: 'prosperity',
    color: '#32CD32',
    icon: '🌳'
  },
  description: 'Joseph tribe bot - represents fruitfulness and dreams.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'joseph-web', theme: 'prosperity', color: '#32CD32', icon: '🌳' },
    mobile: { id: 'joseph-mobile', theme: 'compact', color: '#32CD32', icon: '🌳' },
    terminal: { id: 'joseph-terminal', theme: 'ascii', color: 'green', icon: 'J' },
    default: { id: 'joseph-default', theme: 'prosperity', color: '#32CD32', icon: '🌳' }
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
