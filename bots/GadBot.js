/**
 * GadBot - Seventh of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Gad',
  title: 'Gad - The Troop',
  defaultAppearance: {
    id: 'gad-default',
    theme: 'military',
    color: '#B22222',
    icon: '🛡️'
  },
  description: 'Gad tribe bot - represents fortune and military strength.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'gad-web', theme: 'military', color: '#B22222', icon: '🛡️' },
    mobile: { id: 'gad-mobile', theme: 'compact', color: '#B22222', icon: '🛡️' },
    terminal: { id: 'gad-terminal', theme: 'ascii', color: 'red', icon: 'G' },
    default: { id: 'gad-default', theme: 'military', color: '#B22222', icon: '🛡️' }
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
