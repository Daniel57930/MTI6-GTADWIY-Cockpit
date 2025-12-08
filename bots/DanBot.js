/**
 * DanBot - Fifth of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Dan',
  title: 'Dan - The Judge',
  defaultAppearance: {
    id: 'dan-default',
    theme: 'justice',
    color: '#2F4F4F',
    icon: '⚔️'
  },
  description: 'Dan tribe bot - represents judgment and justice.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'dan-web', theme: 'justice', color: '#2F4F4F', icon: '⚔️' },
    mobile: { id: 'dan-mobile', theme: 'compact', color: '#2F4F4F', icon: '⚔️' },
    terminal: { id: 'dan-terminal', theme: 'ascii', color: 'darkgray', icon: 'D' },
    default: { id: 'dan-default', theme: 'justice', color: '#2F4F4F', icon: '⚔️' }
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
