/**
 * BenjaminBot - Twelfth of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Benjamin',
  title: 'Benjamin - The Beloved',
  defaultAppearance: {
    id: 'benjamin-default',
    theme: 'warrior',
    color: '#FF6347',
    icon: '🏹'
  },
  description: 'Benjamin tribe bot - represents beloved warrior spirit.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'benjamin-web', theme: 'warrior', color: '#FF6347', icon: '🏹' },
    mobile: { id: 'benjamin-mobile', theme: 'compact', color: '#FF6347', icon: '🏹' },
    terminal: { id: 'benjamin-terminal', theme: 'ascii', color: 'tomato', icon: 'B' },
    default: { id: 'benjamin-default', theme: 'warrior', color: '#FF6347', icon: '🏹' }
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
