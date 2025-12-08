/**
 * Judah Bot - The Praised One
 * Victory-oriented bot with powerful market presence
 */

export const metadata = {
  name: 'Judah',
  title: 'The Praised One - Victory & Strength',
  defaultAppearance: {
    skinTone: 'regal dark brown',
    hair: 'black, lion\'s mane style',
    clothing: 'crimson and gold royal garments',
    jewelry: 'lion crown, golden lion pendant'
  },
  description: 'Judah embodies strength and victory. This bot approaches markets with confidence and power, leading profitable campaigns with lion-hearted determination.'
};

const morphPresets = {
  web: { skinTone: 'golden digital', hair: 'energy waves', clothing: 'royal cyber armor', jewelry: 'power core' },
  trader: { skinTone: 'dark brown', hair: 'powerful presence', clothing: 'luxury business attire', jewelry: 'victory ring' },
  warrior: { skinTone: 'battle bronze', hair: 'warrior braids', clothing: 'king\'s armor', jewelry: 'conquest medals' },
  scholar: { skinTone: 'wise brown', hair: 'distinguished', clothing: 'scholarly regalia', jewelry: 'wisdom crown' }
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
