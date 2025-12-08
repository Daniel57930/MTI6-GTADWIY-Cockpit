/**
 * ZebulunBot - Tenth of the Twelve Tribes
 * 
 * Import-safe, synchronous, deterministic bot stub.
 * No side effects on import.
 */

const metadata = {
  name: 'Zebulun',
  title: 'Zebulun - The Dwelling',
  defaultAppearance: {
    id: 'zebulun-default',
    theme: 'maritime',
    color: '#20B2AA',
    icon: '⚓'
  },
  description: 'Zebulun tribe bot - represents commerce and seafaring.'
};

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: { id: 'zebulun-web', theme: 'maritime', color: '#20B2AA', icon: '⚓' },
    mobile: { id: 'zebulun-mobile', theme: 'compact', color: '#20B2AA', icon: '⚓' },
    terminal: { id: 'zebulun-terminal', theme: 'ascii', color: 'cyan', icon: 'Z' },
    default: { id: 'zebulun-default', theme: 'maritime', color: '#20B2AA', icon: '⚓' }
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
