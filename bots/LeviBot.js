/**
 * LeviBot - Third of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Levi',
  title: 'Levi - The Joined',
  defaultAppearance: {
    id: 'levi-default',
    theme: 'sacred',
    color: '#9370DB',
    icon: '⚖️'
  },
  description: 'Levi tribe bot - represents priesthood and service.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'levi-web', theme: 'sacred', color: '#9370DB', icon: '⚖️' },
    mobile: { id: 'levi-mobile', theme: 'compact', color: '#9370DB', icon: '⚖️' },
    terminal: { id: 'levi-terminal', theme: 'ascii', color: 'purple', icon: 'L' },
    default: { id: 'levi-default', theme: 'sacred', color: '#9370DB', icon: '⚖️' }
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
