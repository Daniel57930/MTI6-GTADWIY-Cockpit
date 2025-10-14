/**
 * Milestone Tracker - Milestone Logging Logic
 * Tracks and logs significant events and achievements
 * Part of MTI6-GTADWIY-Cockpit
 */

class MilestoneTracker {
  constructor() {
    this.milestones = [];
    this.categories = {
      SPIRITUAL: 'spiritual',
      TECHNICAL: 'technical',
      FINANCIAL: 'financial',
      PERSONAL: 'personal',
      SOVEREIGNTY: 'sovereignty'
    };
  }

  /**
   * Log a new milestone
   * @param {string} title - Milestone title
   * @param {string} category - Milestone category
   * @param {string} description - Detailed description
   * @param {object} metadata - Additional metadata
   */
  logMilestone(title, category, description = '', metadata = {}) {
    const milestone = {
      id: this.generateId(),
      title,
      category,
      description,
      timestamp: new Date().toISOString(),
      metadata,
      acknowledged: false
    };

    this.milestones.push(milestone);
    this.persistMilestone(milestone);
    
    console.log(`[Milestone Logged] ${category.toUpperCase()}: ${title}`);
    
    return milestone;
  }

  /**
   * Generate unique ID for milestone
   */
  generateId() {
    return `milestone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Persist milestone to storage
   */
  persistMilestone(milestone) {
    try {
      const stored = this.getMilestones();
      stored.push(milestone);
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mti6_milestones', JSON.stringify(stored));
      }
    } catch (error) {
      console.error('[Milestone Tracker] Storage error:', error);
    }
  }

  /**
   * Retrieve all milestones
   */
  getMilestones(category = null) {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('mti6_milestones');
        const milestones = stored ? JSON.parse(stored) : this.milestones;
        
        if (category) {
          return milestones.filter(m => m.category === category);
        }
        
        return milestones;
      }
    } catch (error) {
      console.error('[Milestone Tracker] Retrieval error:', error);
    }
    
    return category ? this.milestones.filter(m => m.category === category) : this.milestones;
  }

  /**
   * Acknowledge a milestone
   */
  acknowledgeMilestone(milestoneId) {
    const milestone = this.milestones.find(m => m.id === milestoneId);
    
    if (milestone) {
      milestone.acknowledged = true;
      milestone.acknowledgedAt = new Date().toISOString();
      this.persistMilestone(milestone);
      
      console.log(`[Milestone Acknowledged] ${milestone.title}`);
      return true;
    }
    
    return false;
  }

  /**
   * Get milestone statistics
   */
  getStats() {
    const stats = {
      total: this.milestones.length,
      byCategory: {},
      acknowledged: this.milestones.filter(m => m.acknowledged).length,
      recent: this.milestones.slice(-5)
    };

    Object.values(this.categories).forEach(category => {
      stats.byCategory[category] = this.milestones.filter(
        m => m.category === category
      ).length;
    });

    return stats;
  }

  /**
   * Clear all milestones (use with caution)
   */
  clearMilestones() {
    this.milestones = [];
    
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('mti6_milestones');
    }
    
    console.log('[Milestone Tracker] All milestones cleared');
  }
}

// Export singleton instance
export const milestoneTracker = new MilestoneTracker();
export default milestoneTracker;
