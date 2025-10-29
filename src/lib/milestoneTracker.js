// A lightweight milestone tracker that persists progress to localStorage
// and exposes a simple event API for UI components.

const STORAGE_KEY = 'mti6.milestoneTracker.v1';

export default class MilestoneTracker {
  constructor(initial = {}) {
    this._data = { milestones: {}, ...initial };
    this._listeners = new Set();
    this._load();
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this._data = JSON.parse(raw);
    } catch (err) {
    }
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
    } catch (err) {
    }
  }

  onChange(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  }

  _emit() {
    for (const fn of Array.from(this._listeners)) {
      try { fn(this._data); } catch (e) { }
    }
  }

  addMilestone(id, { title = '', target = 1 } = {}) {
    if (!id) throw new Error('id required');
    this._data.milestones[id] = { id, title, progress: 0, target };
    this._save();
    this._emit();
    return this._data.milestones[id];
  }

  setProgress(id, value) {
    const m = this._data.milestones[id];
    if (!m) return null;
    m.progress = Math.max(0, Math.min(m.target, value));
    this._save();
    this._emit();
    return m;
  }

  increment(id, by = 1) {
    const m = this._data.milestones[id];
    if (!m) return null;
    return this.setProgress(id, m.progress + by);
  }

  complete(id) {
    const m = this._data.milestones[id];
    if (!m) return null;
    m.progress = m.target;
    this._save();
    this._emit();
    return m;
  }

  get(id) {
    return this._data.milestones[id] || null;
  }

  list() {
    return Object.values(this._data.milestones);
  }

  reset() {
    this._data = { milestones: {} };
    this._save();
    this._emit();
  }
}