/**
 * CoinGecko Scraping Connector
 * 
 * Scrapes market data from CoinGecko API
 * API Key from process.env.COINGECKO_API_KEY
 */

const API_KEY = process.env.COINGECKO_API_KEY;
const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Scrape price data for multiple coins
 * @param {array} coinIds - Array of CoinGecko coin IDs
 * @returns {Promise<object>} Price data
 */
export async function scrapeCoinPrices(coinIds) {
  const ids = coinIds.join(',');
  const url = `${BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
  const headers = API_KEY ? { "x-cg-demo-api-key": API_KEY } : {};
  
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("CoinGecko scraping error:", error.message);
    return null;
  }
}

/**
 * Scrape trending coins
 * @returns {Promise<object>} Trending coins data
 */
export async function scrapeTrending() {
  const url = `${BASE_URL}/search/trending`;
  const headers = API_KEY ? { "x-cg-demo-api-key": API_KEY } : {};
  
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`CoinGecko API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("CoinGecko trending scraping error:", error.message);
    return null;
  }
}

export default {
  scrapeCoinPrices,
  scrapeTrending
};
