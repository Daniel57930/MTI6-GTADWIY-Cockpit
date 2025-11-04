/**
 * envGuard.js
 * Central environment and browser detection helpers
 * Provides safe defaults and clearer error messages when environment assumptions are violated
 */

/**
 * Check if code is running in a browser environment
 * @returns {boolean}
 */
export function isBrowser() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}

/**
 * Check if localStorage is available (browser + not in private mode)
 * @returns {boolean}
 */
export function hasLocalStorage() {
  try {
    return isBrowser() && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

/**
 * Get an environment variable with optional default
 * Works in both Node.js (process.env) and Vite (import.meta.env)
 * @param {string} key - Environment variable name
 * @param {string} [defaultValue] - Default value if not set
 * @returns {string|undefined}
 */
export function getEnv(key, defaultValue) {
  // Vite environment variables (browser & build-time)
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  // Node.js environment variables (server-side)
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  return defaultValue;
}

/**
 * Get an API key from environment with standardized naming
 * @param {string} service - Service name (e.g., "openai", "togetherai")
 * @returns {string|undefined}
 */
export function getApiKey(service) {
  const upperService = service.toUpperCase().replace(/-/g, "_");
  return getEnv(`${upperService}_API_KEY`) || getEnv(`REACT_APP_${upperService}_API_KEY`);
}
