/**
 * Example Usage - MTI6-GTADWIY-Cockpit
 * Demonstrates how to use the core modules
 */

// ============================================================================
// Import Modules
// ============================================================================

// Web modules
import OverridePanel from './apps/web/overridePanel.jsx';
import EmotionalOverlay from './apps/web/emotionalOverlay.jsx';
import GTAdwiyTerrain from './apps/web/GTAdwiyTerrain.jsx';
import milestoneTracker from './apps/web/milestoneTracker.js';

// StarBot modules
import affirmationEngine from './StarBot/affirmationEngine.js';
import prophecySync from './StarBot/prophecySync.js';

// Trading services
import stealthRouting from './services/trading/stealthRouting.js';
import fallbackLoader from './services/trading/fallbackLoader.js';
import withdrawalTracker from './services/trading/withdrawalTracker.js';

// ============================================================================
// Example 1: Log System Initialization Milestone
// ============================================================================

console.log('=== Example 1: Milestone Tracking ===');

const initMilestone = milestoneTracker.logMilestone(
  'Cockpit Initialization',
  milestoneTracker.categories.TECHNICAL,
  'MTI6-GTADWIY-Cockpit successfully initialized',
  { version: '1.0.0', timestamp: new Date().toISOString() }
);

console.log('Milestone logged:', initMilestone.id);

// ============================================================================
// Example 2: Get Daily Affirmation
// ============================================================================

console.log('\n=== Example 2: Affirmation Engine ===');

const dailyAffirmation = affirmationEngine.getDailyAffirmation();
console.log('Daily Affirmation:', dailyAffirmation);

// Change to sovereignty state
affirmationEngine.setState('sovereignty');
const sovereigntyAffirmation = affirmationEngine.getAffirmation();
console.log('Sovereignty Affirmation:', sovereigntyAffirmation);

// Get meditation set
const meditationSet = affirmationEngine.getMeditationSet('peace', 3);
console.log('Peace Meditation Set:', meditationSet);

// ============================================================================
// Example 3: Get Daily Scripture
// ============================================================================

console.log('\n=== Example 3: Prophecy Sync ===');

const dailyScripture = prophecySync.getDailyScripture();
console.log('Daily Scripture:', dailyScripture.ref);
console.log('Text:', dailyScripture.text);

// Search scriptures
const strengthScriptures = prophecySync.searchScriptures('strength');
console.log('Scriptures about strength:', strengthScriptures.length);

// ============================================================================
// Example 4: Create Stealth Route
// ============================================================================

console.log('\n=== Example 4: Stealth Routing ===');

const route = stealthRouting.createRoute({
  source: 'wallet_alpha',
  destination: 'wallet_omega',
  amount: 5000,
  strategy: stealthRouting.routingStrategies.FRAGMENTED,
  priority: 'high',
  metadata: { purpose: 'asset reallocation' }
});

console.log('Route created:', route.id);
console.log('Strategy:', route.strategy);
console.log('Segments:', route.segments.length);

// Check route status
const status = stealthRouting.getRouteStatus(route.id);
console.log('Route status:', status);

// Execute route (async)
stealthRouting.executeRoute(route.id)
  .then((completedRoute) => {
    console.log('Route completed:', completedRoute.id);
    
    // Log milestone
    milestoneTracker.logMilestone(
      'Route Completed',
      milestoneTracker.categories.FINANCIAL,
      `Successfully routed ${completedRoute.amount} using ${completedRoute.strategy} strategy`,
      { routeId: completedRoute.id }
    );
  })
  .catch((error) => {
    console.error('Route failed:', error);
  });

// ============================================================================
// Example 5: Register Fallback Trigger
// ============================================================================

console.log('\n=== Example 5: Fallback Loader ===');

const fallback = fallbackLoader.registerFallback({
  name: 'Low Balance Alert',
  triggerType: fallbackLoader.triggerTypes.THRESHOLD,
  condition: {
    metric: 'balance',
    operator: '<',
    value: 1000
  },
  action: fallbackLoader.fallbackActions.NOTIFY,
  priority: 'high',
  metadata: {
    message: 'Balance below threshold'
  }
});

console.log('Fallback registered:', fallback.id);

// Evaluate fallbacks with current context
const context = {
  balance: 500,
  errors: []
};

const triggered = fallbackLoader.evaluateFallbacks(context);
console.log('Triggered fallbacks:', triggered.length);

// ============================================================================
// Example 6: Log Withdrawal
// ============================================================================

console.log('\n=== Example 6: Withdrawal Tracker ===');

const withdrawal = withdrawalTracker.logWithdrawal({
  amount: 2500,
  destination: 'external_wallet_xyz',
  type: withdrawalTracker.withdrawalTypes.STANDARD,
  priority: 'normal',
  metadata: { reason: 'monthly distribution' }
});

console.log('Withdrawal logged:', withdrawal.id);
console.log('Status:', withdrawal.status);

// Process withdrawal (async)
withdrawalTracker.processWithdrawal(withdrawal.id)
  .then((processed) => {
    console.log('Withdrawal processed:', processed.id);
    console.log('Transaction hash:', processed.statusHistory[2].metadata.transactionHash);
    
    // Log milestone
    milestoneTracker.logMilestone(
      'Withdrawal Processed',
      milestoneTracker.categories.FINANCIAL,
      `Successfully withdrew ${processed.amount} to ${processed.destination}`,
      { withdrawalId: processed.id }
    );
  })
  .catch((error) => {
    console.error('Withdrawal failed:', error);
  });

// ============================================================================
// Example 7: Get Statistics
// ============================================================================

console.log('\n=== Example 7: Statistics ===');

// Milestone statistics
const milestoneStats = milestoneTracker.getStats();
console.log('Total Milestones:', milestoneStats.total);
console.log('By Category:', milestoneStats.byCategory);

// Withdrawal statistics
const withdrawalStats = withdrawalTracker.getStats();
console.log('Total Withdrawals:', withdrawalStats.total);
console.log('Completed Amount:', withdrawalStats.completedAmount);
console.log('Pending Amount:', withdrawalStats.pendingAmount);

// Affirmation history
const affirmationHistory = affirmationEngine.getHistory(5);
console.log('Recent Affirmations:', affirmationHistory.length);

// Scripture history
const scriptureHistory = prophecySync.getHistory(5);
console.log('Recent Scriptures:', scriptureHistory.length);

// ============================================================================
// Example 8: React Component Usage
// ============================================================================

console.log('\n=== Example 8: React Components ===');

/*
// In your React app:

import React from 'react';
import OverridePanel from './apps/web/overridePanel.jsx';
import EmotionalOverlay from './apps/web/emotionalOverlay.jsx';
import GTAdwiyTerrain from './apps/web/GTAdwiyTerrain.jsx';
import './apps/web/lightingSync.css';

function App() {
  return (
    <div className="mti6-cockpit">
      <header>
        <h1>MTI6-GTADWIY Cockpit</h1>
      </header>
      
      <main>
        <OverridePanel />
        <GTAdwiyTerrain />
      </main>
      
      <EmotionalOverlay />
    </div>
  );
}

export default App;
*/

console.log('See inline comments for React component usage');

// ============================================================================
// Example 9: Cleanup
// ============================================================================

console.log('\n=== Example 9: Cleanup Operations ===');

// Clear completed routes (optional)
// stealthRouting.clearCompleted();

// Clear completed withdrawals (optional)
// withdrawalTracker.clearCompleted();

// Clear affirmation history (use with caution)
// affirmationEngine.clearHistory();

// Clear prophecy log (use with caution)
// prophecySync.clearLog();

console.log('Cleanup functions available (commented out for safety)');

// ============================================================================

console.log('\n=== Examples Complete ===');
console.log('All modules demonstrated successfully!');
