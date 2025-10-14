/**
 * Fallback Loader - Fallback Trigger Logic
 * Manages fallback mechanisms and emergency triggers
 * Part of MTI6-GTADWIY-Cockpit Trading Services
 */

class FallbackLoader {
  constructor() {
    this.fallbacks = [];
    this.triggers = new Map();
    this.activeFallbacks = new Set();
    
    this.triggerTypes = {
      THRESHOLD: 'threshold',
      TIMEOUT: 'timeout',
      ERROR: 'error',
      MANUAL: 'manual',
      SCHEDULED: 'scheduled'
    };

    this.fallbackActions = {
      PAUSE: 'pause',
      REDIRECT: 'redirect',
      EMERGENCY_EXIT: 'emergency_exit',
      BACKUP_ROUTE: 'backup_route',
      NOTIFY: 'notify'
    };
  }

  /**
   * Register a fallback trigger
   * @param {object} config - Trigger configuration
   * @returns {object} - Trigger details
   */
  registerFallback(config) {
    const {
      name,
      triggerType,
      condition,
      action,
      priority = 'normal',
      enabled = true,
      metadata = {}
    } = config;

    const fallback = {
      id: this.generateFallbackId(),
      name,
      triggerType,
      condition,
      action,
      priority,
      enabled,
      metadata,
      created: new Date().toISOString(),
      triggered: 0,
      lastTriggered: null
    };

    this.fallbacks.push(fallback);
    this.triggers.set(fallback.id, fallback);

    console.log(`[Fallback Loader] Registered fallback: ${name} (${triggerType})`);
    this.persistFallbacks();

    return fallback;
  }

  /**
   * Check and trigger fallbacks based on conditions
   * @param {object} context - Current context for evaluation
   */
  evaluateFallbacks(context) {
    const triggeredFallbacks = [];

    this.fallbacks.forEach(fallback => {
      if (!fallback.enabled || this.activeFallbacks.has(fallback.id)) {
        return;
      }

      const shouldTrigger = this.evaluateCondition(fallback, context);

      if (shouldTrigger) {
        this.triggerFallback(fallback.id, context);
        triggeredFallbacks.push(fallback);
      }
    });

    return triggeredFallbacks;
  }

  /**
   * Evaluate a fallback condition
   * @param {object} fallback - Fallback to evaluate
   * @param {object} context - Current context
   * @returns {boolean} - Whether condition is met
   */
  evaluateCondition(fallback, context) {
    const { triggerType, condition } = fallback;

    switch (triggerType) {
      case this.triggerTypes.THRESHOLD:
        return this.evaluateThreshold(condition, context);

      case this.triggerTypes.TIMEOUT:
        return this.evaluateTimeout(condition, context);

      case this.triggerTypes.ERROR:
        return this.evaluateError(condition, context);

      case this.triggerTypes.SCHEDULED:
        return this.evaluateSchedule(condition, context);

      default:
        return false;
    }
  }

  /**
   * Evaluate threshold condition
   */
  evaluateThreshold(condition, context) {
    const { metric, operator, value } = condition;
    const currentValue = context[metric];

    if (currentValue === undefined) return false;

    switch (operator) {
      case '>': return currentValue > value;
      case '<': return currentValue < value;
      case '>=': return currentValue >= value;
      case '<=': return currentValue <= value;
      case '==': return currentValue === value;
      default: return false;
    }
  }

  /**
   * Evaluate timeout condition
   */
  evaluateTimeout(condition, context) {
    const { startTime, duration } = condition;
    const elapsed = Date.now() - new Date(startTime).getTime();
    return elapsed >= duration;
  }

  /**
   * Evaluate error condition
   */
  evaluateError(condition, context) {
    const { errorType, errorCount } = condition;
    const currentErrors = context.errors || [];
    
    if (errorType) {
      const typeErrors = currentErrors.filter(e => e.type === errorType);
      return typeErrors.length >= (errorCount || 1);
    }

    return currentErrors.length >= (errorCount || 1);
  }

  /**
   * Evaluate schedule condition
   */
  evaluateSchedule(condition, context) {
    const { scheduledTime } = condition;
    const now = Date.now();
    const scheduled = new Date(scheduledTime).getTime();
    
    return now >= scheduled;
  }

  /**
   * Trigger a specific fallback
   * @param {string} fallbackId - Fallback identifier
   * @param {object} context - Trigger context
   */
  triggerFallback(fallbackId, context = {}) {
    const fallback = this.triggers.get(fallbackId);

    if (!fallback) {
      console.error(`[Fallback Loader] Fallback not found: ${fallbackId}`);
      return;
    }

    this.activeFallbacks.add(fallbackId);
    fallback.triggered++;
    fallback.lastTriggered = new Date().toISOString();

    console.log(`[Fallback Loader] Triggered: ${fallback.name} (${fallback.action})`);

    // Execute fallback action
    this.executeAction(fallback, context);

    // Log trigger event
    this.logTrigger(fallback, context);

    this.persistFallbacks();
  }

  /**
   * Execute fallback action
   * @param {object} fallback - Fallback to execute
   * @param {object} context - Execution context
   */
  executeAction(fallback, context) {
    const { action, metadata } = fallback;

    switch (action) {
      case this.fallbackActions.PAUSE:
        console.log(`[Fallback] PAUSE action triggered for ${fallback.name}`);
        // Implement pause logic
        break;

      case this.fallbackActions.REDIRECT:
        console.log(`[Fallback] REDIRECT action triggered for ${fallback.name}`);
        // Implement redirect logic
        break;

      case this.fallbackActions.EMERGENCY_EXIT:
        console.log(`[Fallback] EMERGENCY EXIT triggered for ${fallback.name}`);
        // Implement emergency exit logic
        break;

      case this.fallbackActions.BACKUP_ROUTE:
        console.log(`[Fallback] BACKUP ROUTE triggered for ${fallback.name}`);
        // Implement backup route logic
        break;

      case this.fallbackActions.NOTIFY:
        console.log(`[Fallback] NOTIFY action triggered for ${fallback.name}`);
        // Implement notification logic
        break;

      default:
        console.log(`[Fallback] Unknown action: ${action}`);
    }

    // Execute custom action if provided
    if (metadata.customAction && typeof metadata.customAction === 'function') {
      metadata.customAction(context);
    }
  }

  /**
   * Log trigger event
   */
  logTrigger(fallback, context) {
    const log = {
      fallbackId: fallback.id,
      fallbackName: fallback.name,
      timestamp: new Date().toISOString(),
      context
    };

    // Store in logs (would be persisted in production)
    console.log('[Fallback Trigger]', log);
  }

  /**
   * Reset a triggered fallback
   * @param {string} fallbackId - Fallback identifier
   */
  resetFallback(fallbackId) {
    this.activeFallbacks.delete(fallbackId);
    console.log(`[Fallback Loader] Reset fallback: ${fallbackId}`);
  }

  /**
   * Enable/disable a fallback
   */
  toggleFallback(fallbackId, enabled) {
    const fallback = this.triggers.get(fallbackId);
    
    if (fallback) {
      fallback.enabled = enabled;
      this.persistFallbacks();
      console.log(`[Fallback Loader] Fallback ${fallbackId} ${enabled ? 'enabled' : 'disabled'}`);
    }
  }

  /**
   * Generate unique fallback ID
   */
  generateFallbackId() {
    return `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all fallbacks
   */
  getFallbacks() {
    return this.fallbacks;
  }

  /**
   * Get active fallbacks
   */
  getActiveFallbacks() {
    return Array.from(this.activeFallbacks).map(id => this.triggers.get(id));
  }

  /**
   * Persist fallbacks to storage
   */
  persistFallbacks() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'trading_fallbacks',
          JSON.stringify(this.fallbacks)
        );
      }
    } catch (error) {
      console.error('[Fallback Loader] Storage error:', error);
    }
  }

  /**
   * Load fallbacks from storage
   */
  loadFallbacks() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('trading_fallbacks');
        if (stored) {
          this.fallbacks = JSON.parse(stored);
          
          // Rebuild triggers map
          this.fallbacks.forEach(fallback => {
            this.triggers.set(fallback.id, fallback);
          });
        }
      }
    } catch (error) {
      console.error('[Fallback Loader] Load error:', error);
    }
  }

  /**
   * Clear all fallbacks
   */
  clearFallbacks() {
    this.fallbacks = [];
    this.triggers.clear();
    this.activeFallbacks.clear();
    this.persistFallbacks();
    console.log('[Fallback Loader] All fallbacks cleared');
  }
}

// Export singleton instance
const fallbackLoader = new FallbackLoader();

// Initialize by loading fallbacks
fallbackLoader.loadFallbacks();

export { fallbackLoader, FallbackLoader };
export default fallbackLoader;
