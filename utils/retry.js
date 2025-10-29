/**
 * Generic retry helper with exponential backoff.
 *
 * Usage:
 *  const result = await retry(() => fetch(url), { retries: 4, delay: 500 });
 */
export async function retry(fn, options = {}) {
  const { retries = 3, delay = 500, factor = 2, onRetry = null } = options;

  function sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  let attempt = 0;
  let currentDelay = delay;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      attempt += 1;
      if (attempt > retries) {
        // rethrow last error
        throw err;
      }
      if (typeof onRetry === 'function') {
        try { onRetry({ attempt, error: err, nextDelay: currentDelay }); } catch (e) { /* ignore */ }
      }
      await sleep(currentDelay);
      currentDelay = Math.round(currentDelay * factor);
    }
  }
}
