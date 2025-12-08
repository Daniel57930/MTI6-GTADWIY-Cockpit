/**
 * Joseph Bot - The Dreamer
 * Vision-focused bot with predictive market analysis
 */

export const metadata = {
  name: 'Joseph',
  title: 'The Dreamer - Vision & Prophecy',
  defaultAppearance: {
    skinTone: 'radiant dark brown',
    hair: 'black, visionary sheen',
    clothing: 'multi-colored royal coat',
    jewelry: 'dream-catcher pendant, amethyst ring'
  },
  description: 'Joseph represents dreams and vision. This bot possesses prophetic market insight, interpreting patterns and trends to predict future movements with remarkable accuracy.'
};

const morphPresets = {
  web: { skinTone: 'visionary purple', hair: 'dream streams', clothing: 'prophecy algorithms', jewelry: 'future cores' },
  trader: { skinTone: 'dark brown', hair: 'visionary', clothing: 'premier suit', jewelry: 'insight timepiece' },
  warrior: { skinTone: 'prophetic bronze', hair: 'strategic', clothing: 'commander armor', jewelry: 'vision medals' },
  scholar: { skinTone: 'enlightened brown', hair: 'prophetic', clothing: 'oracle robes', jewelry: 'wisdom crystal' }
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
