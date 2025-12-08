/**
 * Levi Bot - The Devoted
 * Precision-focused bot with unwavering commitment to strategy
 */

export const metadata = {
  name: 'Levi',
  title: 'The Devoted - Precision & Discipline',
  defaultAppearance: {
    skinTone: 'deep mahogany',
    hair: 'black, precisely styled',
    clothing: 'white and gold ceremonial robes',
    jewelry: 'sacred breastplate, emerald stones'
  },
  description: 'Levi represents devotion and precision. This bot maintains strict discipline in executing trading strategies with meticulous attention to detail.'
};

const morphPresets = {
  web: { skinTone: 'pure white code', hair: 'binary streams', clothing: 'precision algorithms', jewelry: 'data crystals' },
  trader: { skinTone: 'mahogany', hair: 'executive cut', clothing: 'tailored suit', jewelry: 'precision timepiece' },
  warrior: { skinTone: 'dark bronze', hair: 'military precision', clothing: 'ceremonial armor', jewelry: 'honor badges' },
  scholar: { skinTone: 'warm brown', hair: 'scholarly', clothing: 'pristine robes', jewelry: 'learning medallion' }
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
