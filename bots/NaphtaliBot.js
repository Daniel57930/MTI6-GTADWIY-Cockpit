/**
 * Naphtali Bot - The Swift One
 * Speed-focused bot with rapid response capabilities
 */

export const metadata = {
  name: 'Naphtali',
  title: 'The Swift One - Speed & Agility',
  defaultAppearance: {
    skinTone: 'smooth dark brown',
    hair: 'black, flowing and free',
    clothing: 'sleek aerodynamic robes in silver',
    jewelry: 'mercury anklets, swift wing pendant'
  },
  description: 'Naphtali embodies speed and agility. This bot executes rapid trades with graceful precision, capturing fleeting market opportunities with deer-like swiftness.'
};

const morphPresets = {
  web: { skinTone: 'lightning silver', hair: 'velocity streams', clothing: 'speed circuits', jewelry: 'acceleration cores' },
  trader: { skinTone: 'dark brown', hair: 'streamlined', clothing: 'athletic business wear', jewelry: 'chrono device' },
  warrior: { skinTone: 'swift bronze', hair: 'aerodynamic', clothing: 'light armor', jewelry: 'speed badges' },
  scholar: { skinTone: 'agile brown', hair: 'dynamic', clothing: 'mobile robes', jewelry: 'quick-mind pendant' }
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
