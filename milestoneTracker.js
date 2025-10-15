// Milestone tracking utilities for Star sync

const milestones = [];
let starSyncActive = false;

export function logMilestone(name, details = {}) {
  const entry = {
    name,
    details,
    timestamp: new Date().toISOString(),
    star: starSyncActive
  };

  milestones.push(entry);
  return entry;
}

export function activateStarSync() {
  starSyncActive = true;
}

export function deactivateStarSync() {
  starSyncActive = false;
}

export function getMilestones() {
  return [...milestones];
}

export function isStarSyncActive() {
  return starSyncActive;
}
