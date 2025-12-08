/**
 * Simeon Bot - The Listener
 * Analytical bot focused on market signals and patterns
 */

export const metadata = {
  name: 'Simeon',
  title: 'The Listener - Pattern Recognition',
  defaultAppearance: {
    skinTone: 'rich dark brown',
    hair: 'black, adorned with silver threads',
    clothing: 'deep blue robes with star patterns',
    jewelry: 'silver ear cuffs, moonstone pendant'
  },
  description: 'Simeon excels at listening to market whispers and detecting subtle patterns. This bot specializes in identifying emerging trends before they become obvious.'
};

const morphPresets = {
  web: { skinTone: 'matrix green', hair: 'data streams', clothing: 'digital mesh', jewelry: 'signal receivers' },
  trader: { skinTone: 'dark brown', hair: 'neat fade', clothing: 'professional attire', jewelry: 'smart earpiece' },
  warrior: { skinTone: 'ebony', hair: 'warrior locks', clothing: 'tactical gear', jewelry: 'communication device' },
  scholar: { skinTone: 'warm sepia', hair: 'contemplative', clothing: 'research coat', jewelry: 'analysis tools' }
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
