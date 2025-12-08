/**
 * Bot System Smoke Tests
 * Tests for Star and Twelve Tribes bot stubs
 * These tests verify import safety and API surface without side effects
 */

import { describe, it, expect } from 'vitest';

// Helper function to safely import modules
async function safeImport(modulePath) {
  try {
    const module = await import(modulePath);
    return { success: true, module, error: null };
  } catch (error) {
    return { success: false, module: null, error };
  }
}

// Test configuration for all tribe bots
const tribeBots = [
  { name: 'Reuben', path: '../bots/ReubenBot.js' },
  { name: 'Simeon', path: '../bots/SimeonBot.js' },
  { name: 'Levi', path: '../bots/LeviBot.js' },
  { name: 'Judah', path: '../bots/JudahBot.js' },
  { name: 'Dan', path: '../bots/DanBot.js' },
  { name: 'Naphtali', path: '../bots/NaphtaliBot.js' },
  { name: 'Gad', path: '../bots/GadBot.js' },
  { name: 'Asher', path: '../bots/AsherBot.js' },
  { name: 'Issachar', path: '../bots/IssacharBot.js' },
  { name: 'Zebulun', path: '../bots/ZebulunBot.js' },
  { name: 'Joseph', path: '../bots/JosephBot.js' },
  { name: 'Benjamin', path: '../bots/BenjaminBot.js' }
];

describe('Bot System - Import Safety', () => {
  it('should import all tribe bots without errors', async () => {
    const results = await Promise.all(
      tribeBots.map(bot => safeImport(bot.path))
    );
    
    results.forEach((result, index) => {
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(result.module).toBeDefined();
    });
  });

  it('should import StarBot without errors', async () => {
    const result = await safeImport('../bots/StarBot.js');
    expect(result.success).toBe(true);
    expect(result.module).toBeDefined();
  });

  it('should import MainBot without errors', async () => {
    const result = await safeImport('../bots/MainBot.js');
    expect(result.success).toBe(true);
    expect(result.module).toBeDefined();
  });
});

describe('Twelve Tribes - Metadata Validation', () => {
  tribeBots.forEach(({ name, path }) => {
    describe(`${name}Bot`, () => {
      it('should export metadata object', async () => {
        const { module } = await safeImport(path);
        expect(module.default.metadata).toBeDefined();
        expect(typeof module.default.metadata).toBe('object');
      });

      it('should have correct name in metadata', async () => {
        const { module } = await safeImport(path);
        expect(module.default.metadata.name).toBe(name);
      });

      it('should have title in metadata', async () => {
        const { module } = await safeImport(path);
        expect(module.default.metadata.title).toBeDefined();
        expect(typeof module.default.metadata.title).toBe('string');
        expect(module.default.metadata.title.length).toBeGreaterThan(0);
      });

      it('should have defaultAppearance in metadata', async () => {
        const { module } = await safeImport(path);
        const appearance = module.default.metadata.defaultAppearance;
        expect(appearance).toBeDefined();
        expect(appearance.skinTone).toBeDefined();
        expect(appearance.hair).toBeDefined();
        expect(appearance.clothing).toBeDefined();
        expect(appearance.jewelry).toBeDefined();
      });

      it('should have description in metadata', async () => {
        const { module } = await safeImport(path);
        expect(module.default.metadata.description).toBeDefined();
        expect(typeof module.default.metadata.description).toBe('string');
        expect(module.default.metadata.description.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('Twelve Tribes - API Surface', () => {
  tribeBots.forEach(({ name, path }) => {
    describe(`${name}Bot`, () => {
      it('should export start() function', async () => {
        const { module } = await safeImport(path);
        expect(module.default.start).toBeDefined();
        expect(typeof module.default.start).toBe('function');
      });

      it('should export stop() function', async () => {
        const { module } = await safeImport(path);
        expect(module.default.stop).toBeDefined();
        expect(typeof module.default.stop).toBe('function');
      });

      it('should export morph() function', async () => {
        const { module } = await safeImport(path);
        expect(module.default.morph).toBeDefined();
        expect(typeof module.default.morph).toBe('function');
      });

      it('start() should return handle with stop() method', async () => {
        const { module } = await safeImport(path);
        const handle = module.default.start();
        expect(handle).toBeDefined();
        expect(handle.stop).toBeDefined();
        expect(typeof handle.stop).toBe('function');
        handle.stop(); // Clean up
      });

      it('morph() should return object with appearance', async () => {
        const { module } = await safeImport(path);
        const morphed = module.default.morph('web');
        expect(morphed).toBeDefined();
        expect(typeof morphed).toBe('object');
        expect(morphed.appearance).toBeDefined();
      });

      it('morph() should be deterministic', async () => {
        const { module } = await safeImport(path);
        const morphed1 = module.default.morph('web');
        const morphed2 = module.default.morph('web');
        expect(morphed1).toEqual(morphed2);
      });

      it('morph() should handle different targets', async () => {
        const { module } = await safeImport(path);
        const targets = ['web', 'trader', 'warrior', 'scholar'];
        
        targets.forEach(target => {
          const morphed = module.default.morph(target);
          expect(morphed.morphedTo).toBe(target);
          expect(morphed.appearance).toBeDefined();
        });
      });
    });
  });
});

describe('StarBot - Compatibility Tests', () => {
  it('should have a default export', async () => {
    const { module } = await safeImport('../bots/StarBot.js');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('object');
  });

  it('should have start() method', async () => {
    const { module } = await safeImport('../bots/StarBot.js');
    expect(module.default.start).toBeDefined();
    expect(typeof module.default.start).toBe('function');
  });

  it('start() should return handle with stop() method', async () => {
    const { module } = await safeImport('../bots/StarBot.js');
    const handle = module.default.start();
    expect(handle).toBeDefined();
    expect(handle.stop).toBeDefined();
    expect(typeof handle.stop).toBe('function');
    handle.stop(); // Clean up
  });
});

describe('MainBot - Compatibility Tests', () => {
  it('should have a default export', async () => {
    const { module } = await safeImport('../bots/MainBot.js');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('object');
  });

  it('should have initialize() method', async () => {
    const { module } = await safeImport('../bots/MainBot.js');
    expect(module.default.initialize).toBeDefined();
    expect(typeof module.default.initialize).toBe('function');
  });

  it('should have startMonitoring() method', async () => {
    const { module } = await safeImport('../bots/MainBot.js');
    expect(module.default.startMonitoring).toBeDefined();
    expect(typeof module.default.startMonitoring).toBe('function');
  });

  it('should have stopMonitoring() method', async () => {
    const { module } = await safeImport('../bots/MainBot.js');
    expect(module.default.stopMonitoring).toBeDefined();
    expect(typeof module.default.stopMonitoring).toBe('function');
  });
});

describe('Bot System - No Side Effects', () => {
  it('importing all tribe bots should not throw errors', async () => {
    // This test verifies that importing all bots doesn't cause side effects
    const imports = tribeBots.map(bot => safeImport(bot.path));
    const results = await Promise.all(imports);
    
    results.forEach(result => {
      expect(result.success).toBe(true);
    });
  });

  it('importing multiple times should be idempotent', async () => {
    // Import the same bot twice
    const result1 = await safeImport('../bots/ReubenBot.js');
    const result2 = await safeImport('../bots/ReubenBot.js');
    
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
    
    // Metadata should be identical
    expect(result1.module.default.metadata).toEqual(result2.module.default.metadata);
  });
});

describe('Morphing System - Advanced Tests', () => {
  it('should preserve original metadata when morphing', async () => {
    const { module } = await safeImport('../bots/JudahBot.js');
    const original = module.default.metadata;
    const morphed = module.default.morph('web');
    
    // Original metadata should be included
    expect(morphed.name).toBe(original.name);
    expect(morphed.title).toBe(original.title);
    expect(morphed.description).toBe(original.description);
  });

  it('should create different appearances for different targets', async () => {
    const { module } = await safeImport('../bots/JosephBot.js');
    const web = module.default.morph('web');
    const trader = module.default.morph('trader');
    
    // Appearances should be different
    expect(web.appearance).not.toEqual(trader.appearance);
    expect(web.morphedTo).toBe('web');
    expect(trader.morphedTo).toBe('trader');
  });

  it('should handle default target when none provided', async () => {
    const { module } = await safeImport('../bots/BenjaminBot.js');
    const morphed = module.default.morph();
    
    // Should default to 'web'
    expect(morphed.morphedTo).toBe('web');
    expect(morphed.appearance).toBeDefined();
  });
});

describe('Control Flow - Start/Stop Pattern', () => {
  it('should allow multiple start/stop cycles', async () => {
    const { module } = await safeImport('../bots/NaphtaliBot.js');
    
    // First cycle
    const handle1 = module.default.start();
    expect(handle1.stop).toBeDefined();
    handle1.stop();
    
    // Second cycle
    const handle2 = module.default.start();
    expect(handle2.stop).toBeDefined();
    handle2.stop();
  });

  it('should allow starting multiple bots simultaneously', async () => {
    const bot1 = await safeImport('../bots/DanBot.js');
    const bot2 = await safeImport('../bots/GadBot.js');
    const bot3 = await safeImport('../bots/AsherBot.js');
    
    const handle1 = bot1.module.default.start();
    const handle2 = bot2.module.default.start();
    const handle3 = bot3.module.default.start();
    
    expect(handle1.stop).toBeDefined();
    expect(handle2.stop).toBeDefined();
    expect(handle3.stop).toBeDefined();
    
    handle1.stop();
    handle2.stop();
    handle3.stop();
  });
});
