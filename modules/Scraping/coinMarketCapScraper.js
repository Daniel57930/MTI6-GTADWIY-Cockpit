/**
 * CoinMarketCap Scraping Connector
 * 
 * Scrapes market data from CoinMarketCap API
 * API Key from process.env.COINMARKETCAP_API_KEY
 */

const API_KEY = process.env.COINMARKETCAP_API_KEY;
const BASE_URL = "https://pro-api.coinmarketcap.com/v1";

/**
 * Scrape latest listings
 * @param {number} limit - Number of coins to fetch
 * @returns {Promise<object>} Listings data
 */
export async function scrapeLatestListings(limit = 100) {
  const url = `${BASE_URL}/cryptocurrency/listings/latest?limit=${limit}`;
  const headers = API_KEY ? { "X-CMC_PRO_API_KEY": API_KEY } : {};
  
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`CoinMarketCap API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("CoinMarketCap scraping error:", error.message);
    return null;
  }
}

/**
 * Scrape coin metadata
 * @param {string} symbol - Coin symbol
 * @returns {Promise<object>} Metadata
 */
export async function scrapeMetadata(symbol) {
  const url = `${BASE_URL}/cryptocurrency/info?symbol=${symbol}`;
  const headers = API_KEY ? { "X-CMC_PRO_API_KEY": API_KEY } : {};
  
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`CoinMarketCap API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("CoinMarketCap metadata scraping error:", error.message);
    return null;
  }
}

export default {
  scrapeLatestListings,
  scrapeMetadata
};
