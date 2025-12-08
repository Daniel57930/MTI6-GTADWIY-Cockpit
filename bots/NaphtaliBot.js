/**
 * NaphtaliBot - Sixth of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Naphtali',
  title: 'Naphtali - The Wrestler',
  defaultAppearance: {
    id: 'naphtali-default',
    theme: 'nature',
    color: '#228B22',
    icon: '🦌'
  },
  description: 'Naphtali tribe bot - represents wrestling and freedom.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'naphtali-web', theme: 'nature', color: '#228B22', icon: '🦌' },
    mobile: { id: 'naphtali-mobile', theme: 'compact', color: '#228B22', icon: '🦌' },
    terminal: { id: 'naphtali-terminal', theme: 'ascii', color: 'green', icon: 'N' },
    default: { id: 'naphtali-default', theme: 'nature', color: '#228B22', icon: '🦌' }
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
