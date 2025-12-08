/**
 * Zebulun Bot - The Dwelling One
 * Harbor-focused bot with global market connectivity
 */

export const metadata = {
  name: 'Zebulun',
  title: 'The Dwelling One - Global Markets',
  defaultAppearance: {
    skinTone: 'seafaring deep brown',
    hair: 'black, wind-swept',
    clothing: 'ocean blue robes with ship symbols',
    jewelry: 'compass pendant, pearl necklace'
  },
  description: 'Zebulun represents dwelling and commerce. This bot navigates global markets like a skilled sailor, connecting different trading harbors and capitalizing on international opportunities.'
};

const morphPresets = {
  web: { skinTone: 'ocean digital blue', hair: 'network waves', clothing: 'connection protocols', jewelry: 'global nodes' },
  trader: { skinTone: 'deep brown', hair: 'international style', clothing: 'worldly suit', jewelry: 'global timepiece' },
  warrior: { skinTone: 'naval bronze', hair: 'maritime', clothing: 'captain\'s armor', jewelry: 'voyage medals' },
  scholar: { skinTone: 'traveled brown', hair: 'worldly', clothing: 'explorer robes', jewelry: 'knowledge compass' }
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
