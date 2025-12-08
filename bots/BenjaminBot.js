/**
 * Benjamin Bot - The Beloved
 * Precision-strike bot with focused execution
 */

export const metadata = {
  name: 'Benjamin',
  title: 'The Beloved - Precision Strikes',
  defaultAppearance: {
    skinTone: 'youthful deep brown',
    hair: 'black, energetic style',
    clothing: 'swift hunter robes in grey and silver',
    jewelry: 'arrow pendant, wolf emblem ring'
  },
  description: 'Benjamin represents beloved precision. This bot strikes with accuracy and determination, executing precise trades at optimal moments like a skilled marksman.'
};

const morphPresets = {
  web: { skinTone: 'precision silver', hair: 'targeting streams', clothing: 'accuracy algorithms', jewelry: 'strike cores' },
  trader: { skinTone: 'deep brown', hair: 'sharp', clothing: 'tactical suit', jewelry: 'precision watch' },
  warrior: { skinTone: 'hunter bronze', hair: 'focused', clothing: 'marksman armor', jewelry: 'accuracy medals' },
  scholar: { skinTone: 'keen brown', hair: 'analytical', clothing: 'precise robes', jewelry: 'focus pendant' }
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
