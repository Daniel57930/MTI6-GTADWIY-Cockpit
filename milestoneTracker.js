/**
 * Milestone Tracker
 * - Star💥 sync logic for cockpit milestones
 */

const milestones = [];
let starSyncActive = false;

function logMilestone(name, details = {}) {
  const entry = {
    name,
    details,
    timestamp: new Date().toISOString(),
    star: starSyncActive
  };
  milestones.push(entry);
  // You can sync to Star💥 here (API placeholder)
}

function activateStarSync() {
  starSyncActive = true;
}

function deactivateStarSync() {
  starSyncActive = false;
}

module.exports = {
  logMilestone,
  activateStarSync,
  deactivateStarSync,
  getMilestones: () => milestones,
  isStarSyncActive: () => starSyncActive
};