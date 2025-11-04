/**
 * Environment and Browser Guard Utilities
 * 
 * Centralized helper functions to safely check environment and browser context
 * to prevent runtime errors when accessing browser-only APIs or environment variables.
 */

/**
 * Check if code is running in a browser environment
 * @returns {boolean} True if in browser, false otherwise
 */
export function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available, false otherwise
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
 * @param {string} key - Environment variable name
 * @param {string} defaultValue - Default value if not found
 * @returns {string|undefined} Environment variable value
 */
export function getEnv(key, defaultValue = undefined) {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // In browser with Vite, env vars are in import.meta.env
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  return defaultValue;
}

/**
 * Get API key from environment with standardized naming
 * @param {string} service - Service name (e.g., 'openai', 'togetherai')
 * @returns {string|undefined} API key value
 */
export function getApiKey(service) {
  const upperService = service.toUpperCase();
  // Try common environment variable patterns
  const possibleKeys = [
    `${upperService}_API_KEY`,
    `REACT_APP_${upperService}_API_KEY`,
    `VITE_${upperService}_API_KEY`
  ];
  
  for (const key of possibleKeys) {
    const value = getEnv(key);
    if (value) return value;
  }
  
  return undefined;
}
