/**
 * Gad Bot - The Fortunate One
 * Fortune-focused bot with strategic timing capabilities
 */

export const metadata = {
  name: 'Gad',
  title: 'The Fortunate One - Strategic Timing',
  defaultAppearance: {
    skinTone: 'rich chocolate brown',
    hair: 'black, fortune-blessed curls',
    clothing: 'lucky green robes with gold coins',
    jewelry: 'prosperity amulet, jade bracelet'
  },
  description: 'Gad represents good fortune and strategic timing. This bot identifies opportune moments in the market, leveraging probability and luck for maximum gains.'
};

const morphPresets = {
  web: { skinTone: 'fortune gold digital', hair: 'probability waves', clothing: 'chance algorithms', jewelry: 'luck matrix' },
  trader: { skinTone: 'chocolate brown', hair: 'confident style', clothing: 'prosperity suit', jewelry: 'fortune cufflinks' },
  warrior: { skinTone: 'battle-tested brown', hair: 'tactical', clothing: 'strategic armor', jewelry: 'victory tokens' },
  scholar: { skinTone: 'wise brown', hair: 'learned', clothing: 'probability robes', jewelry: 'strategy pendant' }
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
