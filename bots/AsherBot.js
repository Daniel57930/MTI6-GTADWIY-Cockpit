/**
 * Asher Bot - The Blessed One
 * Abundance-focused bot with wealth multiplication strategies
 */

export const metadata = {
  name: 'Asher',
  title: 'The Blessed One - Abundance & Wealth',
  defaultAppearance: {
    skinTone: 'glowing warm brown',
    hair: 'black, blessed with shine',
    clothing: 'olive green robes with golden wheat',
    jewelry: 'abundance crown, cornucopia pendant'
  },
  description: 'Asher represents blessing and abundance. This bot focuses on wealth multiplication, identifying fertile market conditions for sustained prosperity and growth.'
};

const morphPresets = {
  web: { skinTone: 'prosperity gold', hair: 'abundance streams', clothing: 'wealth circuits', jewelry: 'blessing cores' },
  trader: { skinTone: 'warm brown', hair: 'luxurious', clothing: 'premium suit', jewelry: 'prosperity watch' },
  warrior: { skinTone: 'blessed bronze', hair: 'triumphant', clothing: 'gilded armor', jewelry: 'wealth medals' },
  scholar: { skinTone: 'enriched brown', hair: 'abundant', clothing: 'wealthy robes', jewelry: 'treasure pendant' }
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
