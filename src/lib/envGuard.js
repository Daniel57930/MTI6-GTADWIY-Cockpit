/**
 * Environment and Browser Guard Utilities
 * 
 * Provides safe helper functions for checking environment context,
 * browser availability, localStorage, and accessing environment variables.
 */

/**
 * Check if code is running in a browser environment
 * @returns {boolean} True if running in browser
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is accessible
 */
export function hasLocalStorage() {
  try {
    return isBrowser() && typeof window.localStorage !== 'undefined';
  } catch (e) {
    return false;
  }
}

/**
 * Get environment variable safely
 * @param {string} key - Environment variable name
 * @param {string} defaultValue - Default value if not found
 * @returns {string|undefined} Environment variable value or default
 */
export function getEnv(key, defaultValue = undefined) {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  return defaultValue;
}

/**
 * Get API key from environment with clear error handling
 * @param {string} provider - Provider name (e.g., 'openai', 'togetherai')
 * @returns {string|null} API key or null if not found
 */
export function getApiKey(provider) {
  const envKeyMap = {
    'openai': 'OPENAI_API_KEY',
    'togetherai': 'TOGETHERAI_API_KEY',
    'replicate': 'REPLICATE_API_KEY',
    'huggingface': 'HUGGINGFACE_API_KEY',
    'faceplusplus': 'FACEPLUSPLUS_API_KEY'
  };
  
  const envKey = envKeyMap[provider.toLowerCase()];
  if (!envKey) {
    console.warn(`Unknown API provider: ${provider}`);
    return null;
  }
  
  return getEnv(envKey) || null;
}
