/**
 * StarBot - Main Communicator
 * 
 * The central orchestrator for the 12-tribes bot system.
 * Import-safe, synchronous, deterministic, and side-effect free.
 */

const metadata = {
  name: 'Star',
  title: 'Star - Main Communicator',
  defaultAppearance: {
    id: 'star-default',
    theme: 'celestial',
    color: '#FFD700',
    icon: '⭐'
  },
  description: 'Central communicator and orchestrator for the 12-tribes bot system. Routes messages, manages bot registry, and coordinates tribe bot activities.'
};

// Internal state (closure-based, no global side effects)
let botRegistry = new Map();
let messageListeners = [];

/**
 * Register bot modules synchronously
 * @param {Map<string, object>} botMap - Map of bot name to bot module
 */
function registerBots(botMap) {
  if (!(botMap instanceof Map)) {
    throw new TypeError('botMap must be a Map instance');
  }
  
  botMap.forEach((botModule, name) => {
    if (!botModule || typeof botModule !== 'object') {
      throw new TypeError(`Bot module for ${name} must be an object`);
    }
    if (!botModule.metadata || !botModule.metadata.name) {
      throw new Error(`Bot module for ${name} must have metadata.name`);
    }
    botRegistry.set(name, botModule);
  });
}

/**
 * Send a message to a registered bot synchronously
 * @param {string} name - Bot name
 * @param {string} message - Message to send
 * @returns {object} Deterministic response
 */
function sendTo(name, message) {
  if (typeof name !== 'string' || typeof message !== 'string') {
    return {
      success: false,
      error: 'Invalid name or message type',
      timestamp: Date.now()
    };
  }

  const bot = botRegistry.get(name);
  if (!bot) {
    return {
      success: false,
      error: `Bot "${name}" not found in registry`,
      timestamp: Date.now()
    };
  }

  // Notify listeners
  messageListeners.forEach(listener => {
    try {
      listener({ from: 'Star', to: name, message });
    } catch (err) {
      // Suppress listener errors to maintain determinism
    }
  });

  // Return deterministic response
  return {
    success: true,
    to: name,
    message,
    botMetadata: bot.metadata,
    timestamp: Date.now()
  };
}

/**
 * Register a message listener (synchronous)
 * @param {Function} fn - Listener function
 * @returns {Function} Unsubscribe function
 */
function onMessage(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Listener must be a function');
  }
  
  messageListeners.push(fn);
  
  // Return unsubscribe function
  return () => {
    const index = messageListeners.indexOf(fn);
    if (index > -1) {
      messageListeners.splice(index, 1);
    }
  };
}

/**
 * Morph appearance based on target context (pure function)
 * @param {string} target - Target context (e.g., 'web', 'mobile', 'terminal')
 * @returns {object} Appearance object
 */
function morph(target) {
  const appearances = {
    web: {
      id: 'star-web',
      theme: 'celestial',
      color: '#FFD700',
      icon: '⭐',
      size: 'medium',
      animation: 'pulse'
    },
    mobile: {
      id: 'star-mobile',
      theme: 'compact',
      color: '#FFD700',
      icon: '⭐',
      size: 'small',
      animation: 'fade'
    },
    terminal: {
      id: 'star-terminal',
      theme: 'ascii',
      color: 'yellow',
      icon: '*',
      size: 'text',
      animation: 'none'
    },
    default: {
      id: 'star-default',
      theme: 'celestial',
      color: '#FFD700',
      icon: '⭐'
    }
  };

  return appearances[target] || appearances.default;
}

/**
 * Start the bot (synchronous control handle)
 * @returns {object} Control handle with stop()
 */
function start() {
  // No side effects - just return control handle
  let isRunning = true;
  
  return {
    stop: () => {
      isRunning = false;
      // Clear registry and listeners on stop
      botRegistry.clear();
      messageListeners = [];
    },
    isRunning: () => isRunning
  };
}

// Export as default object (import-safe)
export default {
  metadata,
  registerBots,
  sendTo,
  onMessage,
  morph,
  start
};
