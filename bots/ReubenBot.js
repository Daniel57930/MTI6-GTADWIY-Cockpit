/**
 * ReubenBot - First of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Reuben',
  title: 'Reuben - The Firstborn',
  defaultAppearance: {
    id: 'reuben-default',
    theme: 'earth',
    color: '#8B4513',
    icon: '🏔️'
  },
  description: 'Reuben tribe bot - represents strength and the firstborn of the twelve tribes.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'reuben-web', theme: 'earth', color: '#8B4513', icon: '🏔️' },
    mobile: { id: 'reuben-mobile', theme: 'compact', color: '#8B4513', icon: '🏔️' },
    terminal: { id: 'reuben-terminal', theme: 'ascii', color: 'brown', icon: 'R' },
    default: { id: 'reuben-default', theme: 'earth', color: '#8B4513', icon: '🏔️' }
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
