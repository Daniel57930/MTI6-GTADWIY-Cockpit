/**
 * LunarCrush Scraping Connector
 * 
 * Scrapes social metrics and market intelligence from LunarCrush API
 * API Key from process.env.LUNARCRUSH_API_KEY
 */

const API_KEY = process.env.LUNARCRUSH_API_KEY;
const BASE_URL = "https://api.lunarcrush.com/v2";

/**
 * Scrape social metrics for a coin
 * @param {string} symbol - Coin symbol
 * @returns {Promise<object>} Social metrics
 */
export async function scrapeSocialMetrics(symbol) {
  const url = `${BASE_URL}?data=assets&key=${API_KEY}&symbol=${symbol}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`LunarCrush API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("LunarCrush social metrics scraping error:", error.message);
    return null;
  }
}

/**
 * Scrape market insights
 * @returns {Promise<object>} Market insights
 */
export async function scrapeMarketInsights() {
  const url = `${BASE_URL}?data=market&key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`LunarCrush API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("LunarCrush market insights scraping error:", error.message);
    return null;
  }
}

export default {
  scrapeSocialMetrics,
  scrapeMarketInsights
};
