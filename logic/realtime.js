/**
 * Real-time Logic - Handle real-time data streams and updates
 */

const activeStreams = new Map();
const subscribers = new Map();

/**
 * Create a real-time data stream
 */
export function createStream(streamId, source, options = {}) {
  const {
    interval = 1000,
    transform = (data) => data
  } = options;

  console.log(`[Realtime] Creating stream: ${streamId} from ${source}`);

  const stream = {
    id: streamId,
    source,
    interval,
    transform,
    active: false,
    lastUpdate: null,
    intervalId: null
  };

  activeStreams.set(streamId, stream);
  return stream;
}

/**
 * Start a real-time stream
 */
export function startStream(streamId) {
  const stream = activeStreams.get(streamId);
  
  if (!stream) {
    console.warn(`[Realtime] Stream not found: ${streamId}`);
    return false;
  }

  if (stream.active) {
    console.warn(`[Realtime] Stream already active: ${streamId}`);
    return false;
  }

  console.log(`[Realtime] Starting stream: ${streamId}`);
  stream.active = true;

  stream.intervalId = setInterval(() => {
    // Simulate data fetch
    const data = {
      timestamp: Date.now(),
      value: Math.random() * 100,
      source: stream.source
    };

    const transformed = stream.transform(data);
    stream.lastUpdate = transformed;

    // Notify subscribers
    notifySubscribers(streamId, transformed);
  }, stream.interval);

  return true;
}

/**
 * Stop a real-time stream
 */
export function stopStream(streamId) {
  const stream = activeStreams.get(streamId);
  
  if (!stream) {
    console.warn(`[Realtime] Stream not found: ${streamId}`);
    return false;
  }

  console.log(`[Realtime] Stopping stream: ${streamId}`);
  
  if (stream.intervalId) {
    clearInterval(stream.intervalId);
    stream.intervalId = null;
  }

  stream.active = false;
  return true;
}

/**
 * Subscribe to a stream
 */
export function subscribe(streamId, callback) {
  if (!subscribers.has(streamId)) {
    subscribers.set(streamId, []);
  }

  const subs = subscribers.get(streamId);
  subs.push(callback);

  console.log(`[Realtime] Subscribed to stream: ${streamId} (${subs.length} subscribers)`);

  // Return unsubscribe function
  return () => {
    const index = subs.indexOf(callback);
    if (index > -1) {
      subs.splice(index, 1);
    }
  };
}

/**
 * Notify all subscribers of a stream
 */
function notifySubscribers(streamId, data) {
  const subs = subscribers.get(streamId);
  if (subs && subs.length > 0) {
    subs.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`[Realtime] Subscriber error for ${streamId}:`, error);
      }
    });
  }
}

/**
 * Get active streams
 */
export function getActiveStreams() {
  const active = [];
  activeStreams.forEach((stream, id) => {
    if (stream.active) {
      active.push({
        id,
        source: stream.source,
        lastUpdate: stream.lastUpdate
      });
    }
  });
  return active;
}

/**
 * Cleanup all streams
 */
export function cleanup() {
  console.log('[Realtime] Cleaning up all streams');
  activeStreams.forEach((stream, id) => {
    stopStream(id);
  });
  activeStreams.clear();
  subscribers.clear();
}

export default {
  createStream,
  startStream,
  stopStream,
  subscribe,
  getActiveStreams,
  cleanup
};
