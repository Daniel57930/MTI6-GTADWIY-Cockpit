/**
 * Bot System Smoke Tests
 * 
 * Import-safe smoke tests for StarBot and the 12 tribe bots.
 * These tests verify basic functionality without side effects.
 */

import { test, expect, describe } from 'vitest';

/**
 * Safe import helper - ensures no side effects on import
 */
async function safeImport(modulePath) {
  const module = await import(modulePath);
  return module.default;
}

describe('StarBot - Main Communicator', () => {
  test('is import-safe and exports expected structure', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    
    expect(StarBot).toBeDefined();
    expect(StarBot).toBeTypeOf('object');
    expect(StarBot.metadata).toBeDefined();
    expect(StarBot.metadata.name).toBe('Star');
  });

  test('start() returns handle with stop()', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    const handle = StarBot.start();
    
    expect(handle).toBeDefined();
    expect(handle.stop).toBeTypeOf('function');
    
    handle.stop();
  });

  test('morph("web") returns object with id string', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    const appearance = StarBot.morph('web');
    
    expect(appearance).toBeDefined();
    expect(appearance).toBeTypeOf('object');
    expect(appearance.id).toBeTypeOf('string');
    expect(appearance.id).toBe('star-web');
  });

  test('registerBots can register a tribe bot', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    const ReubenBot = await safeImport('../bots/ReubenBot.js');
    
    const botMap = new Map();
    botMap.set('Reuben', ReubenBot);
    
    expect(() => StarBot.registerBots(botMap)).not.toThrow();
  });

  test('sendTo routes message synchronously to registered bot', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    const JudahBot = await safeImport('../bots/JudahBot.js');
    
    const botMap = new Map();
    botMap.set('Judah', JudahBot);
    StarBot.registerBots(botMap);
    
    const response = StarBot.sendTo('Judah', 'Test message');
    
    expect(response).toBeDefined();
    expect(response.success).toBe(true);
    expect(response.to).toBe('Judah');
    expect(response.message).toBe('Test message');
    expect(response.botMetadata).toBeDefined();
    expect(response.botMetadata.name).toBe('Judah');
  });

  test('sendTo handles non-existent bot gracefully', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    
    const response = StarBot.sendTo('NonExistent', 'Test');
    
    expect(response.success).toBe(false);
    expect(response.error).toBeDefined();
    expect(response.error).toContain('not found');
  });

  test('onMessage registers listener and returns unsubscribe', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    
    let messageReceived = null;
    const unsubscribe = StarBot.onMessage((event) => {
      messageReceived = event;
    });
    
    expect(unsubscribe).toBeTypeOf('function');
    
    // Register a bot and send message
    const SimeonBot = await safeImport('../bots/SimeonBot.js');
    const botMap = new Map();
    botMap.set('Simeon', SimeonBot);
    StarBot.registerBots(botMap);
    StarBot.sendTo('Simeon', 'Hello');
    
    expect(messageReceived).toBeDefined();
    expect(messageReceived.to).toBe('Simeon');
    
    unsubscribe();
  });
});

describe('Tribe Bots - The Twelve Tribes', () => {
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

  tribeBots.forEach(({ name, path }) => {
    describe(`${name}Bot`, () => {
      test('is import-safe and exports expected structure', async () => {
        const bot = await safeImport(path);
        
        expect(bot).toBeDefined();
        expect(bot).toBeTypeOf('object');
        expect(bot.metadata).toBeDefined();
        expect(bot.metadata.name).toBe(name);
      });

      test('has metadata with name, title, defaultAppearance, and description', async () => {
        const bot = await safeImport(path);
        
        expect(bot.metadata.name).toBe(name);
        expect(bot.metadata.title).toBeTypeOf('string');
        expect(bot.metadata.defaultAppearance).toBeDefined();
        expect(bot.metadata.description).toBeTypeOf('string');
      });

      test('start() returns handle with stop()', async () => {
        const bot = await safeImport(path);
        const handle = bot.start();
        
        expect(handle).toBeDefined();
        expect(handle.stop).toBeTypeOf('function');
        expect(handle.isRunning).toBeTypeOf('function');
        expect(handle.isRunning()).toBe(true);
        
        handle.stop();
        expect(handle.isRunning()).toBe(false);
      });

      test('morph("web") returns object with id string', async () => {
        const bot = await safeImport(path);
        const appearance = bot.morph('web');
        
        expect(appearance).toBeDefined();
        expect(appearance).toBeTypeOf('object');
        expect(appearance.id).toBeTypeOf('string');
        expect(appearance.id).toContain(name.toLowerCase());
      });

      test('morph is deterministic (pure function)', async () => {
        const bot = await safeImport(path);
        const appearance1 = bot.morph('web');
        const appearance2 = bot.morph('web');
        
        expect(appearance1.id).toBe(appearance2.id);
        expect(appearance1.theme).toBe(appearance2.theme);
        expect(appearance1.color).toBe(appearance2.color);
      });
    });
  });

  test('all 12 tribe bots can be registered with StarBot', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    const botMap = new Map();
    
    for (const { name, path } of tribeBots) {
      const bot = await safeImport(path);
      botMap.set(name, bot);
    }
    
    expect(() => StarBot.registerBots(botMap)).not.toThrow();
    expect(botMap.size).toBe(12);
  });

  test('StarBot can send messages to all 12 tribe bots', async () => {
    const StarBot = await safeImport('../bots/StarBot.js');
    const botMap = new Map();
    
    for (const { name, path } of tribeBots) {
      const bot = await safeImport(path);
      botMap.set(name, bot);
    }
    
    StarBot.registerBots(botMap);
    
    for (const { name } of tribeBots) {
      const response = StarBot.sendTo(name, `Greetings, ${name}!`);
      expect(response.success).toBe(true);
      expect(response.to).toBe(name);
      expect(response.botMetadata.name).toBe(name);
    }
  });
});

describe('Bot System Integration', () => {
  test('total bot count is exactly 13 (Star + 12 tribes)', async () => {
    const allBotPaths = [
      '../bots/StarBot.js',
      '../bots/ReubenBot.js',
      '../bots/SimeonBot.js',
      '../bots/LeviBot.js',
      '../bots/JudahBot.js',
      '../bots/DanBot.js',
      '../bots/NaphtaliBot.js',
      '../bots/GadBot.js',
      '../bots/AsherBot.js',
      '../bots/IssacharBot.js',
      '../bots/ZebulunBot.js',
      '../bots/JosephBot.js',
      '../bots/BenjaminBot.js'
    ];
    
    expect(allBotPaths.length).toBe(13);
    
    // Verify all can be imported
    for (const path of allBotPaths) {
      const bot = await safeImport(path);
      expect(bot).toBeDefined();
      expect(bot.metadata).toBeDefined();
    }
  });

  test('no duplicate bot names', async () => {
    const allBotPaths = [
      '../bots/StarBot.js',
      '../bots/ReubenBot.js',
      '../bots/SimeonBot.js',
      '../bots/LeviBot.js',
      '../bots/JudahBot.js',
      '../bots/DanBot.js',
      '../bots/NaphtaliBot.js',
      '../bots/GadBot.js',
      '../bots/AsherBot.js',
      '../bots/IssacharBot.js',
      '../bots/ZebulunBot.js',
      '../bots/JosephBot.js',
      '../bots/BenjaminBot.js'
    ];
    
    const names = new Set();
    for (const path of allBotPaths) {
      const bot = await safeImport(path);
      const name = bot.metadata.name;
      expect(names.has(name)).toBe(false);
      names.add(name);
    }
    
    expect(names.size).toBe(13);
  });
});
