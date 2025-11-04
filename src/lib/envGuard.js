/**
 * Environment Guard Utilities
 * 
 * Defensive helpers for browser/server detection and environment variables.
 * Prevents runtime errors when accessing window, localStorage, or missing env vars.
 */

/**
 * Check if code is running in a browser environment
 * @returns {boolean}
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Check if localStorage is available
 * @returns {boolean}
 */
export function hasLocalStorage() {
  try {
    return isBrowser() && typeof window.localStorage !== 'undefined';
  } catch (e) {
    return false;
  }
}

/**
 * Safely get environment variable
 * @param {string} key - Environment variable name (without prefix)
 * @param {string} defaultValue - Default value if not found
 * @returns {string|undefined}
 */
export function getEnv(key, defaultValue = undefined) {
  // Check process.env with common prefixes
  if (typeof process !== 'undefined' && process.env) {
    // Try with REACT_APP_ prefix (Create React App / Vite convention)
    const reactAppKey = `REACT_APP_${key}`;
    if (process.env[reactAppKey]) {
      return process.env[reactAppKey];
    }
    // Try with VITE_ prefix (Vite convention)
    const viteKey = `VITE_${key}`;
    if (process.env[viteKey]) {
      return process.env[viteKey];
    }
    // Try exact key
    if (process.env[key]) {
      return process.env[key];
    }
  }
  
  // Check import.meta.env (Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const reactAppKey = `REACT_APP_${key}`;
    if (import.meta.env[reactAppKey]) {
      return import.meta.env[reactAppKey];
    }
    const viteKey = `VITE_${key}`;
    if (import.meta.env[viteKey]) {
      return import.meta.env[viteKey];
    }
    if (import.meta.env[key]) {
      return import.meta.env[key];
    }
  }
  
  return defaultValue;
}

/**
 * Get API key for a specific service
 * @param {string} service - Service name (e.g., 'openai', 'togetherai')
 * @returns {string|undefined}
 */
export function getApiKey(service) {
  const serviceUpper = service.toUpperCase();
  const key = getEnv(`${serviceUpper}_API_KEY`);
  return key;
}
