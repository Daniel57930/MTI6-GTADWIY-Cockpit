# Bot System Documentation

## Overview

The MTI6-GTADWIY-Cockpit bot system consists of exactly **13 bots**: **StarBot** (the main communicator) and **12 tribe bots** named after the Twelve Tribes of Israel.

All bots are designed to be:
- **Import-safe**: No side effects occur when importing the module
- **Synchronous**: All operations are deterministic and synchronous
- **Pure**: The `morph()` function is a pure function with no side effects
- **Testable**: Each bot exports a predictable interface

## Bot Architecture

### StarBot - The Main Communicator

StarBot is the central orchestrator that manages communication between all tribe bots.

**Key Responsibilities:**
- Register and manage tribe bot modules
- Route messages between bots synchronously
- Coordinate bot activities
- Provide a unified interface for bot communication

**API:**

```javascript
import StarBot from './bots/StarBot.js';

// Metadata
StarBot.metadata.name;  // 'Star'
StarBot.metadata.title; // 'Star - Main Communicator'

// Register bots
const botMap = new Map();
botMap.set('Reuben', ReubenBot);
botMap.set('Simeon', SimeonBot);
StarBot.registerBots(botMap);

// Send messages
const response = StarBot.sendTo('Reuben', 'Hello, Reuben!');
// Returns: { success: true, to: 'Reuben', message: '...', botMetadata: {...}, timestamp: ... }

// Listen to messages
const unsubscribe = StarBot.onMessage((event) => {
  console.log(`Message from ${event.from} to ${event.to}: ${event.message}`);
});

// Morph appearance (pure function)
const webAppearance = StarBot.morph('web');
// Returns: { id: 'star-web', theme: 'celestial', color: '#FFD700', ... }

// Start/stop
const handle = StarBot.start();
// ... later
handle.stop();
```

### The Twelve Tribe Bots

Each tribe bot represents one of the Twelve Tribes of Israel and has its own unique characteristics:

1. **ReubenBot** - "The Firstborn" - Represents strength
2. **SimeonBot** - "The Hearer" - Represents hearing and understanding
3. **LeviBot** - "The Joined" - Represents priesthood and service
4. **JudahBot** - "The Praised" - Represents leadership and praise
5. **DanBot** - "The Judge" - Represents judgment and justice
6. **NaphtaliBot** - "The Wrestler" - Represents wrestling and freedom
7. **GadBot** - "The Troop" - Represents fortune and military strength
8. **AsherBot** - "The Blessed" - Represents happiness and abundance
9. **IssacharBot** - "The Reward" - Represents wisdom and understanding of times
10. **ZebulunBot** - "The Dwelling" - Represents commerce and seafaring
11. **JosephBot** - "The Fruitful" - Represents fruitfulness and dreams
12. **BenjaminBot** - "The Beloved" - Represents beloved warrior spirit

**Common Tribe Bot API:**

All tribe bots share the same interface:

```javascript
import ReubenBot from './bots/ReubenBot.js';

// Metadata
ReubenBot.metadata.name;  // 'Reuben'
ReubenBot.metadata.title; // 'Reuben - The Firstborn'

// Morph (pure function, deterministic)
const appearance = ReubenBot.morph('web');
// Returns: { id: 'reuben-web', theme: 'earth', color: '#8B4513', icon: '🏔️' }

// Start/stop
const handle = ReubenBot.start();
console.log(handle.isRunning()); // true
handle.stop();
console.log(handle.isRunning()); // false
```

## Morphing Concept

The `morph()` function is a **pure, deterministic function** that returns different appearance configurations based on the target context:

- `morph('web')` - Optimized for web applications
- `morph('mobile')` - Optimized for mobile devices
- `morph('terminal')` - Optimized for terminal/CLI interfaces
- `morph('anything-else')` - Returns default appearance

**Characteristics:**
- No side effects
- Same input always produces same output
- Does not modify any state
- Returns a new object on each call

**Example:**

```javascript
// Always returns the same structure for the same input
const webLook = StarBot.morph('web');
const mobileLook = StarBot.morph('mobile');
const defaultLook = StarBot.morph('unknown');  // Falls back to default
```

## Safe Usage Examples

### Example 1: Import and Use StarBot

```javascript
import StarBot from './bots/StarBot.js';

// Safe import - no side effects occurred
console.log(StarBot.metadata.name); // 'Star'

// Start the bot
const handle = StarBot.start();

// Use the bot
const appearance = StarBot.morph('web');
console.log(appearance.id); // 'star-web'

// Clean stop
handle.stop();
```

### Example 2: Register and Communicate with Tribe Bots

```javascript
import StarBot from './bots/StarBot.js';
import ReubenBot from './bots/ReubenBot.js';
import JudahBot from './bots/JudahBot.js';

// Create bot registry
const bots = new Map();
bots.set('Reuben', ReubenBot);
bots.set('Judah', JudahBot);

// Register bots with Star
StarBot.registerBots(bots);

// Send message
const response = StarBot.sendTo('Reuben', 'Status check');
console.log(response.success); // true
console.log(response.botMetadata.name); // 'Reuben'
```

### Example 3: Listen to Bot Messages

```javascript
import StarBot from './bots/StarBot.js';

const handle = StarBot.start();

// Subscribe to messages
const unsubscribe = StarBot.onMessage((event) => {
  console.log(`[${event.from}] -> [${event.to}]: ${event.message}`);
});

// Send a message (listener will be notified)
StarBot.sendTo('Simeon', 'Hello');

// Cleanup
unsubscribe();
handle.stop();
```

### Example 4: Use All 12 Tribe Bots

```javascript
import StarBot from './bots/StarBot.js';
import ReubenBot from './bots/ReubenBot.js';
import SimeonBot from './bots/SimeonBot.js';
import LeviBot from './bots/LeviBot.js';
import JudahBot from './bots/JudahBot.js';
import DanBot from './bots/DanBot.js';
import NaphtaliBot from './bots/NaphtaliBot.js';
import GadBot from './bots/GadBot.js';
import AsherBot from './bots/AsherBot.js';
import IssacharBot from './bots/IssacharBot.js';
import ZebulunBot from './bots/ZebulunBot.js';
import JosephBot from './bots/JosephBot.js';
import BenjaminBot from './bots/BenjaminBot.js';

// Register all tribe bots
const tribeBots = new Map([
  ['Reuben', ReubenBot],
  ['Simeon', SimeonBot],
  ['Levi', LeviBot],
  ['Judah', JudahBot],
  ['Dan', DanBot],
  ['Naphtali', NaphtaliBot],
  ['Gad', GadBot],
  ['Asher', AsherBot],
  ['Issachar', IssacharBot],
  ['Zebulun', ZebulunBot],
  ['Joseph', JosephBot],
  ['Benjamin', BenjaminBot]
]);

StarBot.registerBots(tribeBots);

// Send messages to all
tribeBots.forEach((bot, name) => {
  const response = StarBot.sendTo(name, 'Greetings!');
  console.log(`${name}: ${response.success}`);
});
```

## Testing Guidance

All bots come with comprehensive vitest smoke tests. Tests verify:

1. **Import Safety**: Modules can be imported without side effects
2. **Metadata**: Each bot has proper metadata with expected name
3. **Start/Stop**: The `start()` function returns a handle with `stop()`
4. **Morph**: The `morph('web')` function returns an object with an `id` string
5. **Star Registration**: StarBot can register tribe bots
6. **Star Messaging**: StarBot can route messages synchronously

**Run tests:**

```bash
npm test tests/bots.spec.js
```

**Test Structure:**

```javascript
import { test, expect } from 'vitest';

test('ReubenBot is import-safe', async () => {
  const ReubenBot = (await import('./bots/ReubenBot.js')).default;
  expect(ReubenBot).toBeDefined();
  expect(ReubenBot.metadata.name).toBe('Reuben');
});
```

## Best Practices

1. **Always use `start()` and `stop()`**: Even though these bots are simple stubs, following the lifecycle pattern ensures future compatibility.

2. **Don't rely on import side effects**: The bots are designed to be import-safe. Don't expect any initialization to happen on import.

3. **Use `morph()` for context-specific rendering**: Instead of hard-coding appearances, use the `morph()` function to get appropriate configurations.

4. **Handle errors gracefully**: When using `StarBot.sendTo()`, always check the `success` flag in the response.

5. **Unsubscribe from listeners**: When done listening to messages, call the unsubscribe function returned by `onMessage()`.

## Security Notes

- **No network calls**: None of the bots make network requests
- **No secrets**: No API keys or sensitive data are stored in bot modules
- **No timers**: No `setTimeout`, `setInterval`, or other async operations
- **Import-safe**: All modules can be safely imported in test environments

## Future Extensions

The current bot system is designed as a foundation. Future enhancements could include:

- **Message handlers**: Allow tribe bots to respond to messages
- **State management**: Add optional state containers for bots
- **Event bus**: Expand the messaging system to a full event bus
- **Plugin system**: Allow third-party extensions
- **Persistence**: Add optional state persistence

However, all extensions should maintain the core principles:
- Import safety
- Synchronous operation (or clearly async where needed)
- Deterministic behavior
- No side effects on import

---

For more information, see the main [README.md](../README.md).
