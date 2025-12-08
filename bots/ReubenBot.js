/**
 * Reuben Bot - The Firstborn
 * Leadership-focused bot with strong decision-making capabilities
 */

export const metadata = {
  name: 'Reuben',
  title: 'The Firstborn - Leadership & Authority',
  defaultAppearance: {
    skinTone: 'deep brown',
    hair: 'black, regal crown',
    clothing: 'royal purple robes with gold trim',
    jewelry: 'golden scepter, ruby signet ring'
  },
  description: 'Reuben represents leadership and pioneering spirit. As the firstborn, this bot excels at taking initiative and making bold decisions in uncertain markets.'
};

const morphPresets = {
  web: { skinTone: 'digital blue', hair: 'neon streams', clothing: 'cyber armor', jewelry: 'holographic crown' },
  trader: { skinTone: 'deep brown', hair: 'slicked back', clothing: 'sharp business suit', jewelry: 'platinum watch' },
  warrior: { skinTone: 'bronze', hair: 'braided', clothing: 'battle armor', jewelry: 'war medals' },
  scholar: { skinTone: 'warm brown', hair: 'natural', clothing: 'academic robes', jewelry: 'wisdom pendant' }
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
