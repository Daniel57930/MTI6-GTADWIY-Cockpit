/**
 * Withdrawal Tracker - Withdrawal Logging Logic
 * Tracks and logs all withdrawal operations
 * Part of MTI6-GTADWIY-Cockpit Trading Services
 */

class WithdrawalTracker {
  constructor() {
    this.withdrawals = [];
    this.pendingWithdrawals = new Map();
    
    this.statuses = {
      PENDING: 'pending',
      PROCESSING: 'processing',
      COMPLETED: 'completed',
      FAILED: 'failed',
      CANCELLED: 'cancelled'
    };

    this.withdrawalTypes = {
      STANDARD: 'standard',
      URGENT: 'urgent',
      SCHEDULED: 'scheduled',
      PARTIAL: 'partial'
    };
  }

  /**
   * Log a new withdrawal
   * @param {object} config - Withdrawal configuration
   * @returns {object} - Withdrawal details
   */
  logWithdrawal(config) {
    const {
      amount,
      destination,
      type = this.withdrawalTypes.STANDARD,
      priority = 'normal',
      scheduledFor = null,
      metadata = {}
    } = config;

    const withdrawal = {
      id: this.generateWithdrawalId(),
      amount,
      destination,
      type,
      priority,
      status: this.statuses.PENDING,
      scheduledFor,
      created: new Date().toISOString(),
      metadata,
      statusHistory: [
        {
          status: this.statuses.PENDING,
          timestamp: new Date().toISOString()
        }
      ]
    };

    this.withdrawals.push(withdrawal);
    this.pendingWithdrawals.set(withdrawal.id, withdrawal);

    console.log(`[Withdrawal Tracker] New withdrawal: ${withdrawal.id} (${amount})`);
    this.persistWithdrawals();

    return withdrawal;
  }

  /**
   * Update withdrawal status
   * @param {string} withdrawalId - Withdrawal identifier
   * @param {string} newStatus - New status
   * @param {object} metadata - Additional metadata
   */
  updateStatus(withdrawalId, newStatus, metadata = {}) {
    const withdrawal = this.pendingWithdrawals.get(withdrawalId) ||
                       this.withdrawals.find(w => w.id === withdrawalId);

    if (!withdrawal) {
      console.error(`[Withdrawal Tracker] Withdrawal not found: ${withdrawalId}`);
      return null;
    }

    withdrawal.status = newStatus;
    withdrawal.statusHistory.push({
      status: newStatus,
      timestamp: new Date().toISOString(),
      metadata
    });

    if (newStatus === this.statuses.PROCESSING) {
      withdrawal.processingStarted = new Date().toISOString();
    }

    if (newStatus === this.statuses.COMPLETED) {
      withdrawal.completedAt = new Date().toISOString();
      this.pendingWithdrawals.delete(withdrawalId);
    }

    if (newStatus === this.statuses.FAILED || newStatus === this.statuses.CANCELLED) {
      withdrawal.closedAt = new Date().toISOString();
      this.pendingWithdrawals.delete(withdrawalId);
    }

    console.log(`[Withdrawal Tracker] Status updated: ${withdrawalId} -> ${newStatus}`);
    this.persistWithdrawals();

    return withdrawal;
  }

  /**
   * Process a pending withdrawal
   * @param {string} withdrawalId - Withdrawal identifier
   * @returns {Promise} - Processing promise
   */
  async processWithdrawal(withdrawalId) {
    const withdrawal = this.pendingWithdrawals.get(withdrawalId);

    if (!withdrawal) {
      throw new Error(`Withdrawal not found or already processed: ${withdrawalId}`);
    }

    if (withdrawal.status !== this.statuses.PENDING) {
      throw new Error(`Withdrawal not in pending state: ${withdrawalId}`);
    }

    this.updateStatus(withdrawalId, this.statuses.PROCESSING);

    try {
      // Simulate processing
      await this.executeWithdrawal(withdrawal);

      this.updateStatus(withdrawalId, this.statuses.COMPLETED, {
        processedAmount: withdrawal.amount,
        transactionHash: this.generateTransactionHash()
      });

      return withdrawal;
    } catch (error) {
      this.updateStatus(withdrawalId, this.statuses.FAILED, {
        error: error.message
      });

      throw error;
    }
  }

  /**
   * Execute withdrawal (placeholder for actual logic)
   * @param {object} withdrawal - Withdrawal to execute
   * @returns {Promise} - Execution promise
   */
  async executeWithdrawal(withdrawal) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(
      `[Withdrawal Tracker] Executing: ${withdrawal.id} (${withdrawal.amount} to ${withdrawal.destination})`
    );

    // In production, this would execute actual withdrawal logic
    return {
      success: true,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Cancel a pending withdrawal
   * @param {string} withdrawalId - Withdrawal identifier
   * @returns {boolean} - Success status
   */
  cancelWithdrawal(withdrawalId) {
    const withdrawal = this.pendingWithdrawals.get(withdrawalId);

    if (!withdrawal) {
      return false;
    }

    if (withdrawal.status === this.statuses.PENDING) {
      this.updateStatus(withdrawalId, this.statuses.CANCELLED);
      console.log(`[Withdrawal Tracker] Cancelled: ${withdrawalId}`);
      return true;
    }

    return false;
  }

  /**
   * Get withdrawal by ID
   * @param {string} withdrawalId - Withdrawal identifier
   * @returns {object} - Withdrawal details
   */
  getWithdrawal(withdrawalId) {
    return this.withdrawals.find(w => w.id === withdrawalId) || null;
  }

  /**
   * Get all withdrawals
   * @param {object} filters - Filter options
   * @returns {Array} - Filtered withdrawals
   */
  getWithdrawals(filters = {}) {
    let results = [...this.withdrawals];

    if (filters.status) {
      results = results.filter(w => w.status === filters.status);
    }

    if (filters.type) {
      results = results.filter(w => w.type === filters.type);
    }

    if (filters.startDate) {
      results = results.filter(w => new Date(w.created) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      results = results.filter(w => new Date(w.created) <= new Date(filters.endDate));
    }

    return results;
  }

  /**
   * Get withdrawal statistics
   * @returns {object} - Statistics
   */
  getStats() {
    const stats = {
      total: this.withdrawals.length,
      byStatus: {},
      byType: {},
      totalAmount: 0,
      completedAmount: 0,
      pendingAmount: 0
    };

    Object.values(this.statuses).forEach(status => {
      stats.byStatus[status] = this.withdrawals.filter(
        w => w.status === status
      ).length;
    });

    Object.values(this.withdrawalTypes).forEach(type => {
      stats.byType[type] = this.withdrawals.filter(
        w => w.type === type
      ).length;
    });

    this.withdrawals.forEach(w => {
      stats.totalAmount += w.amount;
      
      if (w.status === this.statuses.COMPLETED) {
        stats.completedAmount += w.amount;
      }
      
      if (w.status === this.statuses.PENDING || w.status === this.statuses.PROCESSING) {
        stats.pendingAmount += w.amount;
      }
    });

    return stats;
  }

  /**
   * Generate unique withdrawal ID
   */
  generateWithdrawalId() {
    return `withdrawal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate transaction hash (placeholder)
   */
  generateTransactionHash() {
    return `0x${Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;
  }

  /**
   * Persist withdrawals to storage
   */
  persistWithdrawals() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'trading_withdrawals',
          JSON.stringify(this.withdrawals)
        );
      }
    } catch (error) {
      console.error('[Withdrawal Tracker] Storage error:', error);
    }
  }

  /**
   * Load withdrawals from storage
   */
  loadWithdrawals() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('trading_withdrawals');
        if (stored) {
          this.withdrawals = JSON.parse(stored);
          
          // Rebuild pending withdrawals map
          this.withdrawals.forEach(withdrawal => {
            if (
              withdrawal.status === this.statuses.PENDING ||
              withdrawal.status === this.statuses.PROCESSING
            ) {
              this.pendingWithdrawals.set(withdrawal.id, withdrawal);
            }
          });
        }
      }
    } catch (error) {
      console.error('[Withdrawal Tracker] Load error:', error);
    }
  }

  /**
   * Clear completed withdrawals
   */
  clearCompleted() {
    this.withdrawals = this.withdrawals.filter(
      w => w.status !== this.statuses.COMPLETED
    );
    this.persistWithdrawals();
    console.log('[Withdrawal Tracker] Completed withdrawals cleared');
  }
}

// Export singleton instance
const withdrawalTracker = new WithdrawalTracker();

// Initialize by loading withdrawals
withdrawalTracker.loadWithdrawals();

export { withdrawalTracker, WithdrawalTracker };
export default withdrawalTracker;
