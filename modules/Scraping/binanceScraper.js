/**
 * Binance Scraping Connector
 * 
 * Scrapes market data from Binance Public API
 * No API key required for public endpoints
 */

const BASE_URL = "https://api.binance.com/api/v3";

/**
 * Scrape ticker price for a symbol
 * @param {string} symbol - Trading pair symbol (e.g., BTCUSDT)
 * @returns {Promise<object>} Price data
 */
export async function scrapeTickerPrice(symbol) {
  const url = `${BASE_URL}/ticker/price?symbol=${symbol}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Binance API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Binance ticker scraping error:", error.message);
    return null;
  }
}

/**
 * Scrape 24hr ticker data
 * @param {string} symbol - Trading pair symbol
 * @returns {Promise<object>} 24hr data
 */
export async function scrape24hrTicker(symbol) {
  const url = `${BASE_URL}/ticker/24hr?symbol=${symbol}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Binance API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Binance 24hr scraping error:", error.message);
    return null;
  }
}

/**
 * Scrape order book depth
 * @param {string} symbol - Trading pair symbol
 * @param {number} limit - Depth limit
 * @returns {Promise<object>} Order book data
 */
export async function scrapeOrderBook(symbol, limit = 100) {
  const url = `${BASE_URL}/depth?symbol=${symbol}&limit=${limit}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Binance API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Binance order book scraping error:", error.message);
    return null;
  }
}

export default {
  scrapeTickerPrice,
  scrape24hrTicker,
  scrapeOrderBook
};
