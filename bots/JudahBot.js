/**
 * JudahBot - Fourth of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Judah',
  title: 'Judah - The Praised',
  defaultAppearance: {
    id: 'judah-default',
    theme: 'royal',
    color: '#DAA520',
    icon: '🦁'
  },
  description: 'Judah tribe bot - represents leadership and praise.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'judah-web', theme: 'royal', color: '#DAA520', icon: '🦁' },
    mobile: { id: 'judah-mobile', theme: 'compact', color: '#DAA520', icon: '🦁' },
    terminal: { id: 'judah-terminal', theme: 'ascii', color: 'gold', icon: 'J' },
    default: { id: 'judah-default', theme: 'royal', color: '#DAA520', icon: '🦁' }
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
