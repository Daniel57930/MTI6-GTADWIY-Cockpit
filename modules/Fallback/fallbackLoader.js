/**
 * Fallback Loader for Override and Emotional Overlays
 * 
 * This module provides fallback logic when primary systems fail or need override.
 * Used by all 63 bot modules to ensure resilience and emotional state management.
 */

// Fallback strategies for different failure scenarios
const FALLBACK_STRATEGIES = {
  API_TIMEOUT: "retry_with_backoff",
  API_RATE_LIMIT: "queue_and_delay",
  API_AUTH_FAILURE: "use_backup_key",
  API_SERVICE_DOWN: "switch_provider",
  EMOTIONAL_OVERRIDE: "apply_overlay",
  STEALTH_MODE: "minimize_footprint"
};

/**
 * Load fallback strategy for a given failure scenario
 * @param {string} scenario - The failure scenario
 * @param {object} context - Additional context for the fallback
 * @returns {object} Fallback configuration
 */
export function loadFallback(scenario, context = {}) {
  const strategy = FALLBACK_STRATEGIES[scenario];
  
  if (!strategy) {
    console.warn(`No fallback strategy for scenario: ${scenario}`);
    return { strategy: "default", action: "log_and_continue" };
  }

  return {
    scenario,
    strategy,
    timestamp: new Date().toISOString(),
    context,
    actions: getActionsForStrategy(strategy, context)
  };
}

/**
 * Get specific actions for a fallback strategy
 * @param {string} strategy - The fallback strategy
 * @param {object} context - Additional context
 * @returns {array} List of actions to take
 */
function getActionsForStrategy(strategy, context) {
  const actionMap = {
    retry_with_backoff: [
      { type: "wait", duration: context.retryDelay || 1000 },
      { type: "retry", maxAttempts: context.maxRetries || 3 }
    ],
    queue_and_delay: [
      { type: "queue", priority: context.priority || "normal" },
      { type: "delay", duration: context.delayMs || 5000 }
    ],
    use_backup_key: [
      { type: "switch_key", keyIndex: (context.currentKeyIndex || 0) + 1 },
      { type: "retry", maxAttempts: 1 }
    ],
    switch_provider: [
      { type: "select_provider", providers: context.alternateProviders || [] },
      { type: "retry", maxAttempts: 2 }
    ],
    apply_overlay: [
      { type: "load_emotional_state", state: context.emotionalState || "neutral" },
      { type: "apply_override", level: context.overrideLevel || 1 }
    ],
    minimize_footprint: [
      { type: "reduce_frequency", factor: 0.5 },
      { type: "use_proxies", enabled: true }
    ]
  };

  return actionMap[strategy] || [{ type: "log", message: "No specific actions defined" }];
}

/**
 * Apply emotional overlay to bot behavior
 * @param {string} emotionalState - Current emotional state
 * @param {object} botConfig - Bot configuration
 * @returns {object} Modified bot configuration with emotional overlay
 */
export function applyEmotionalOverlay(emotionalState, botConfig) {
  const overlays = {
    aggressive: { 
      tradingSpeed: 1.5, 
      riskTolerance: 1.3, 
      confidenceThreshold: 0.6 
    },
    cautious: { 
      tradingSpeed: 0.7, 
      riskTolerance: 0.5, 
      confidenceThreshold: 0.85 
    },
    neutral: { 
      tradingSpeed: 1.0, 
      riskTolerance: 1.0, 
      confidenceThreshold: 0.75 
    },
    blessed: { 
      tradingSpeed: 1.2, 
      riskTolerance: 1.1, 
      confidenceThreshold: 0.7,
      divineFavor: true 
    }
  };

  const overlay = overlays[emotionalState] || overlays.neutral;
  
  return {
    ...botConfig,
    emotionalOverlay: overlay,
    emotionalState,
    overlayAppliedAt: new Date().toISOString()
  };
}

/**
 * Execute fallback actions
 * @param {array} actions - List of actions from fallback strategy
 * @param {object} context - Execution context
 * @returns {Promise} Resolution of all fallback actions
 */
export async function executeFallback(actions, context = {}) {
  const results = [];
  
  for (const action of actions) {
    try {
      const result = await executeAction(action, context);
      results.push({ action: action.type, success: true, result });
    } catch (error) {
      results.push({ action: action.type, success: false, error: error.message });
    }
  }
  
  return {
    executed: results,
    timestamp: new Date().toISOString(),
    success: results.every(r => r.success)
  };
}

/**
 * Execute a single fallback action
 * @param {object} action - The action to execute
 * @param {object} context - Execution context
 * @returns {Promise} Result of the action
 */
async function executeAction(action, context) {
  switch (action.type) {
    case "wait":
      await new Promise(resolve => setTimeout(resolve, action.duration));
      return { waited: action.duration };
    
    case "retry":
      return { retrySetup: true, maxAttempts: action.maxAttempts };
    
    case "queue":
      return { queued: true, priority: action.priority };
    
    case "delay":
      await new Promise(resolve => setTimeout(resolve, action.duration));
      return { delayed: action.duration };
    
    case "switch_key":
      return { keyIndex: action.keyIndex };
    
    case "select_provider": {
      const provider = action.providers[0] || "default";
      return { provider };
    }
    
    case "load_emotional_state":
      return { emotionalState: action.state };
    
    case "apply_override":
      return { overrideLevel: action.level };
    
    case "reduce_frequency":
      return { frequencyFactor: action.factor };
    
    case "use_proxies":
      return { proxiesEnabled: action.enabled };
    
    case "log":
      console.log(action.message);
      return { logged: true };
    
    default:
      return { type: action.type, executed: true };
  }
}

/**
 * Get fallback health status
 * @returns {object} Health status of fallback system
 */
export function getFallbackHealth() {
  return {
    status: "operational",
    strategies: Object.keys(FALLBACK_STRATEGIES).length,
    timestamp: new Date().toISOString()
  };
}