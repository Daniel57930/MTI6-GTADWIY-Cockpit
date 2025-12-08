/**
 * Dan Bot - The Judge
 * Justice-oriented bot with balanced decision-making
 */

export const metadata = {
  name: 'Dan',
  title: 'The Judge - Balance & Justice',
  defaultAppearance: {
    skinTone: 'deep ebony',
    hair: 'black, wisdom locks',
    clothing: 'balanced black and white robes',
    jewelry: 'scales of justice pendant, sapphire ring'
  },
  description: 'Dan represents judgment and balance. This bot weighs market conditions carefully, ensuring fair and balanced trading decisions based on comprehensive analysis.'
};

const morphPresets = {
  web: { skinTone: 'balanced grey code', hair: 'equilibrium streams', clothing: 'justice algorithms', jewelry: 'balance matrix' },
  trader: { skinTone: 'ebony', hair: 'professional', clothing: 'balanced suit', jewelry: 'judgment watch' },
  warrior: { skinTone: 'dark steel', hair: 'tactical', clothing: 'fair combat gear', jewelry: 'honor shield' },
  scholar: { skinTone: 'thoughtful brown', hair: 'sage-like', clothing: 'academic robes', jewelry: 'wisdom scales' }
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
