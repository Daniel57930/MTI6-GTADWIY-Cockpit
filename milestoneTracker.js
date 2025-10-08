/**
 * Milestone Tracker
 * Handles milestone logging, persistence, and retrieval for the cockpit system
 */

class MilestoneTracker {
  constructor(config = {}) {
    this.milestones = [];
    this.maxHistory = config.maxHistory || 100;
    this.autoSave = config.autoSave !== false;
    this.storageKey = config.storageKey || 'gtadwiy_milestones';
    this.listeners = [];
    this.isInitialized = false;
    this.loading = false;
    this.error = null;

    // Auto-initialize if in browser environment
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  /**
   * Initialize the tracker by loading saved milestones
   * @returns {Promise<void>}
   */
  async initialize() {
    if (this.isInitialized || this.loading) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      await this.loadFromStorage();
      this.isInitialized = true;
    } catch (err) {
      this.error = err.message;
      console.error('Failed to initialize MilestoneTracker:', err);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Load milestones from storage (fallback to empty array)
   * @returns {Promise<void>}
   */
  async loadFromStorage() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        // Fallback for non-browser environments
        this.milestones = [];
        return;
      }

      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.milestones = Array.isArray(parsed) ? parsed : [];
      } else {
        this.milestones = [];
      }
    } catch (err) {
      console.warn('Failed to load milestones from storage, using empty array:', err);
      this.milestones = [];
    }
  }

  /**
   * Save milestones to storage with fallback
   * @returns {Promise<boolean>}
   */
  async saveToStorage() {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        // Fallback: just keep in memory
        return false;
      }

      localStorage.setItem(this.storageKey, JSON.stringify(this.milestones));
      return true;
    } catch (err) {
      console.warn('Failed to save milestones to storage:', err);
      return false;
    }
  }

  /**
   * Add a new milestone
   * @param {Object} milestone - Milestone data
   * @param {string} milestone.title - Title of the milestone
   * @param {string} [milestone.description] - Description
   * @param {string} [milestone.type] - Type (e.g., 'achievement', 'goal', 'checkpoint')
   * @param {Object} [milestone.metadata] - Additional metadata
   * @returns {Promise<Object>} The created milestone
   */
  async addMilestone({ title, description = '', type = 'checkpoint', metadata = {} }) {
    if (!title || typeof title !== 'string') {
      throw new Error('Milestone title is required and must be a string');
    }

    const milestone = {
      id: this.generateId(),
      title,
      description,
      type,
      metadata,
      timestamp: Date.now(),
      completed: false
    };

    this.milestones.push(milestone);

    // Trim history if needed
    if (this.milestones.length > this.maxHistory) {
      this.milestones = this.milestones.slice(-this.maxHistory);
    }

    // Save and notify
    if (this.autoSave) {
      await this.saveToStorage();
    }
    this.notifyListeners('add', milestone);

    return milestone;
  }

  /**
   * Update an existing milestone
   * @param {string} id - Milestone ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object|null>} Updated milestone or null if not found
   */
  async updateMilestone(id, updates) {
    const index = this.milestones.findIndex(m => m.id === id);
    if (index === -1) {
      return null;
    }

    const milestone = this.milestones[index];
    this.milestones[index] = { ...milestone, ...updates, id, timestamp: milestone.timestamp };

    if (this.autoSave) {
      await this.saveToStorage();
    }
    this.notifyListeners('update', this.milestones[index]);

    return this.milestones[index];
  }

  /**
   * Mark a milestone as completed
   * @param {string} id - Milestone ID
   * @returns {Promise<Object|null>}
   */
  async completeMilestone(id) {
    return this.updateMilestone(id, { completed: true, completedAt: Date.now() });
  }

  /**
   * Delete a milestone
   * @param {string} id - Milestone ID
   * @returns {Promise<boolean>}
   */
  async deleteMilestone(id) {
    const index = this.milestones.findIndex(m => m.id === id);
    if (index === -1) {
      return false;
    }

    const deleted = this.milestones.splice(index, 1)[0];
    
    if (this.autoSave) {
      await this.saveToStorage();
    }
    this.notifyListeners('delete', deleted);

    return true;
  }

  /**
   * Get all milestones with optional filtering
   * @param {Object} [filter] - Filter options
   * @param {string} [filter.type] - Filter by type
   * @param {boolean} [filter.completed] - Filter by completion status
   * @returns {Array<Object>}
   */
  getMilestones(filter = {}) {
    let filtered = [...this.milestones];

    if (filter.type) {
      filtered = filtered.filter(m => m.type === filter.type);
    }

    if (typeof filter.completed === 'boolean') {
      filtered = filtered.filter(m => m.completed === filter.completed);
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Get a specific milestone by ID
   * @param {string} id - Milestone ID
   * @returns {Object|null}
   */
  getMilestone(id) {
    return this.milestones.find(m => m.id === id) || null;
  }

  /**
   * Get milestone statistics
   * @returns {Object}
   */
  getStats() {
    const total = this.milestones.length;
    const completed = this.milestones.filter(m => m.completed).length;
    const byType = this.milestones.reduce((acc, m) => {
      acc[m.type] = (acc[m.type] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      completed,
      pending: total - completed,
      completionRate: total > 0 ? (completed / total * 100).toFixed(2) : 0,
      byType
    };
  }

  /**
   * Clear all milestones
   * @returns {Promise<void>}
   */
  async clearAll() {
    this.milestones = [];
    if (this.autoSave) {
      await this.saveToStorage();
    }
    this.notifyListeners('clear', null);
  }

  /**
   * Export milestones to JSON string
   * @returns {string}
   */
  exportToJSON() {
    return JSON.stringify(this.milestones, null, 2);
  }

  /**
   * Import milestones from JSON string
   * @param {string} jsonString - JSON string of milestones
   * @returns {Promise<boolean>}
   */
  async importFromJSON(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      if (!Array.isArray(imported)) {
        throw new Error('Invalid format: expected an array of milestones');
      }

      this.milestones = imported;
      if (this.autoSave) {
        await this.saveToStorage();
      }
      this.notifyListeners('import', null);
      return true;
    } catch (err) {
      console.error('Failed to import milestones:', err);
      return false;
    }
  }

  /**
   * Subscribe to milestone changes
   * @param {Function} callback - Callback function (action, milestone) => {}
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners of changes
   * @private
   */
  notifyListeners(action, milestone) {
    this.listeners.forEach(callback => {
      try {
        callback(action, milestone);
      } catch (err) {
        console.error('Error in milestone listener:', err);
      }
    });
  }

  /**
   * Generate a unique ID for milestones
   * @private
   */
  generateId() {
    return `milestone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get loading status
   * @returns {boolean}
   */
  isLoading() {
    return this.loading;
  }

  /**
   * Get error status
   * @returns {string|null}
   */
  getError() {
    return this.error;
  }

  /**
   * Get initialization status
   * @returns {boolean}
   */
  isReady() {
    return this.isInitialized && !this.loading && !this.error;
  }
}

// Export for use in Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MilestoneTracker;
}

// Export default for ES6 modules
export default MilestoneTracker;
