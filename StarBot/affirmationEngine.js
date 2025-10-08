/**
 * Affirmation Engine - Emotional State-Based Affirmations
 * Core spiritual guidance module for StarBot
 * Part of MTI6-GTADWIY-Cockpit
 */

class AffirmationEngine {
  constructor() {
    this.emotionalStates = {
      PEACE: 'peace',
      STRENGTH: 'strength',
      CLARITY: 'clarity',
      SOVEREIGNTY: 'sovereignty',
      GRATITUDE: 'gratitude',
      HEALING: 'healing',
      WISDOM: 'wisdom',
      PROTECTION: 'protection'
    };

    this.affirmations = {
      peace: [
        "I am centered in divine peace that surpasses all understanding",
        "Peace flows through me like a river of living water",
        "I rest in sovereign stillness, unmoved by external chaos",
        "The peace of God guards my heart and mind",
        "I am an anchor of peace in every situation"
      ],
      strength: [
        "I am fortified by unwavering strength from the Most High",
        "My resolve is unshakeable, rooted in eternal truth",
        "Strength guides my every decision and action",
        "I can do all things through Christ who strengthens me",
        "Divine power flows through my weakness"
      ],
      clarity: [
        "Clarity illuminates my path like the noonday sun",
        "I see with divine understanding and spiritual discernment",
        "Truth reveals itself to me in perfect timing",
        "My vision is unclouded, my purpose is clear",
        "Wisdom and clarity are my daily companions"
      ],
      sovereignty: [
        "I walk in complete sovereignty under divine authority",
        "My authority is divine and absolute in my domain",
        "I govern my territory with wisdom and justice",
        "No weapon formed against my sovereignty shall prosper",
        "I am seated in heavenly places, far above principalities"
      ],
      gratitude: [
        "I overflow with gratitude for every breath and blessing",
        "Every moment is a gift, every challenge an opportunity",
        "Thankfulness fills my spirit and transforms my perspective",
        "I am grateful for the journey and the destination",
        "Gratitude unlocks the fullness of life"
      ],
      healing: [
        "Healing flows through every fiber of my being",
        "I am restored, renewed, and made whole",
        "By His stripes I am healed, in body and spirit",
        "Divine restoration is my portion",
        "I am being healed, layer by layer, moment by moment"
      ],
      wisdom: [
        "Wisdom guides my steps and illuminates my decisions",
        "I have the mind of Christ and divine understanding",
        "Wisdom speaks to me through Scripture and Spirit",
        "I discern truth from deception with perfect clarity",
        "Divine wisdom is freely given to me without reproach"
      ],
      protection: [
        "I am surrounded by divine protection on every side",
        "No weapon formed against me shall prosper",
        "Angels encamp around me and my household",
        "I dwell in the secret place of the Most High",
        "The Lord is my shield, my fortress, my deliverer"
      ]
    };

    this.currentState = this.emotionalStates.PEACE;
    this.affirmationHistory = [];
  }

  /**
   * Get affirmation based on emotional state
   * @param {string} state - Emotional state
   * @returns {string} - Selected affirmation
   */
  getAffirmation(state = null) {
    const targetState = state || this.currentState;
    const stateAffirmations = this.affirmations[targetState] || this.affirmations.peace;
    
    // Select random affirmation
    const affirmation = stateAffirmations[
      Math.floor(Math.random() * stateAffirmations.length)
    ];

    // Log to history
    this.logAffirmation(targetState, affirmation);

    return affirmation;
  }

  /**
   * Set current emotional state
   * @param {string} state - New emotional state
   */
  setState(state) {
    if (this.affirmations[state]) {
      this.currentState = state;
      console.log(`[Affirmation Engine] State changed to: ${state}`);
      return true;
    }
    console.warn(`[Affirmation Engine] Invalid state: ${state}`);
    return false;
  }

  /**
   * Log affirmation to history
   * @param {string} state - Emotional state
   * @param {string} affirmation - Affirmation text
   */
  logAffirmation(state, affirmation) {
    const entry = {
      timestamp: new Date().toISOString(),
      state,
      affirmation
    };

    this.affirmationHistory.push(entry);

    // Keep only last 100 entries
    if (this.affirmationHistory.length > 100) {
      this.affirmationHistory.shift();
    }

    // Persist to storage if available
    this.persistHistory();
  }

  /**
   * Persist history to storage
   */
  persistHistory() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'starbot_affirmation_history',
          JSON.stringify(this.affirmationHistory)
        );
      }
    } catch (error) {
      console.error('[Affirmation Engine] Storage error:', error);
    }
  }

  /**
   * Load history from storage
   */
  loadHistory() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('starbot_affirmation_history');
        if (stored) {
          this.affirmationHistory = JSON.parse(stored);
        }
      }
    } catch (error) {
      console.error('[Affirmation Engine] Load error:', error);
    }
  }

  /**
   * Get affirmation history
   * @param {number} limit - Number of entries to return
   * @returns {Array} - Affirmation history
   */
  getHistory(limit = 10) {
    return this.affirmationHistory.slice(-limit);
  }

  /**
   * Get daily affirmation based on current day
   * @returns {string} - Daily affirmation
   */
  getDailyAffirmation() {
    const day = new Date().getDay();
    const states = Object.values(this.emotionalStates);
    const dailyState = states[day % states.length];
    
    return this.getAffirmation(dailyState);
  }

  /**
   * Get multiple affirmations for meditation
   * @param {string} state - Emotional state
   * @param {number} count - Number of affirmations
   * @returns {Array} - Array of affirmations
   */
  getMeditationSet(state = null, count = 3) {
    const targetState = state || this.currentState;
    const stateAffirmations = this.affirmations[targetState] || this.affirmations.peace;
    
    // Shuffle and take requested count
    const shuffled = [...stateAffirmations].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, stateAffirmations.length));
  }

  /**
   * Clear affirmation history
   */
  clearHistory() {
    this.affirmationHistory = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('starbot_affirmation_history');
    }
    console.log('[Affirmation Engine] History cleared');
  }
}

// Export singleton instance
const affirmationEngine = new AffirmationEngine();

// Initialize by loading history
affirmationEngine.loadHistory();

export { affirmationEngine, AffirmationEngine };
export default affirmationEngine;
