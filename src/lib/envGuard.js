// Small environment & browser guard helpers used across modules.
// Keep this file minimal and dependency-free.

export function isBrowser() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}

export function hasLocalStorage() {
  try {
    return isBrowser() && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

/**
 * Read an environment variable with optional fallback.
 * Works in Node and common bundlers where process.env is available.
 */
export function getEnv(key, fallback = undefined) {
  try {
    const val = (typeof process !== "undefined" && process.env) ? process.env[key] : undefined;
    if (typeof val === "undefined" || val === "") return fallback;
    return val;
  } catch {
    return fallback;
  }
}

/**
 * Access API key by logical name.
 * Recognized names: "openai", "togetherai", "coingecko", "santiment"
 * Falls back to treating 'name' as an env var key.
 */
export function getApiKey(name) {
  const mapping = {
    openai: "OPENAI_API_KEY",
    togetherai: "TOGETHERAI_API_KEY",
    coingecko: "COINGECKO_API_KEY",
    santiment: "SANTIMENT_API_KEY"
  };
  const envKey = mapping[name] || name;
  return getEnv(envKey, null);
}