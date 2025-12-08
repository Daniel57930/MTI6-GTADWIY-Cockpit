/**
 * AsherBot - Eighth of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Asher',
  title: 'Asher - The Blessed',
  defaultAppearance: {
    id: 'asher-default',
    theme: 'abundance',
    color: '#FFD700',
    icon: '🌾'
  },
  description: 'Asher tribe bot - represents happiness and abundance.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'asher-web', theme: 'abundance', color: '#FFD700', icon: '🌾' },
    mobile: { id: 'asher-mobile', theme: 'compact', color: '#FFD700', icon: '🌾' },
    terminal: { id: 'asher-terminal', theme: 'ascii', color: 'yellow', icon: 'A' },
    default: { id: 'asher-default', theme: 'abundance', color: '#FFD700', icon: '🌾' }
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
