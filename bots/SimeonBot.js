/**
 * SimeonBot - Second of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Simeon',
  title: 'Simeon - The Hearer',
  defaultAppearance: {
    id: 'simeon-default',
    theme: 'sky',
    color: '#4169E1',
    icon: '👂'
  },
  description: 'Simeon tribe bot - represents hearing and understanding.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'simeon-web', theme: 'sky', color: '#4169E1', icon: '👂' },
    mobile: { id: 'simeon-mobile', theme: 'compact', color: '#4169E1', icon: '👂' },
    terminal: { id: 'simeon-terminal', theme: 'ascii', color: 'blue', icon: 'S' },
    default: { id: 'simeon-default', theme: 'sky', color: '#4169E1', icon: '👂' }
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
