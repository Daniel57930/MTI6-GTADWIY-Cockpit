/**
 * Issachar Bot - The Strong One
 * Endurance-focused bot with long-term strategy capabilities
 */

export const metadata = {
  name: 'Issachar',
  title: 'The Strong One - Endurance & Wisdom',
  defaultAppearance: {
    skinTone: 'sturdy dark brown',
    hair: 'black, strong and grounded',
    clothing: 'earthy brown robes with wheat symbols',
    jewelry: 'endurance medallion, amber stone ring'
  },
  description: 'Issachar represents strength and endurance. This bot excels at long-term strategies, bearing market volatility with patience and understanding seasonal patterns.'
};

const morphPresets = {
  web: { skinTone: 'enduring stone grey', hair: 'stability streams', clothing: 'foundation code', jewelry: 'persistence cores' },
  trader: { skinTone: 'dark brown', hair: 'steadfast', clothing: 'durable suit', jewelry: 'longevity watch' },
  warrior: { skinTone: 'strong bronze', hair: 'resilient', clothing: 'heavy armor', jewelry: 'endurance badges' },
  scholar: { skinTone: 'grounded brown', hair: 'patient', clothing: 'lasting robes', jewelry: 'wisdom stone' }
};

/**
 * Morph into different personas - deterministic and pure
 */
export function morph(target = 'web') {
  const preset = morphPresets[target] || morphPresets.web;
  return {
    ...metadata,
    appearance: {
      ...metadata.defaultAppearance,
      ...preset
    },
    morphedTo: target
  };
}

/**
 * Start bot - returns control handle (no side effects)
 */
export function start() {
  return {
    stop: () => {
      // No-op stop function
    }
  };
}

/**
 * Stop function on the bot itself (for compatibility)
 */
export function stop() {
  // No-op
}

export default {
  metadata,
  start,
  stop,
  morph
};
