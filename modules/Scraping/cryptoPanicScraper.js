/**
 * CryptoPanic Scraping Connector
 * 
 * Scrapes cryptocurrency news from CryptoPanic API
 * API Key from process.env.CRYPTOPANIC_API_KEY
 */

const API_KEY = process.env.CRYPTOPANIC_API_KEY;
const BASE_URL = "https://cryptopanic.com/api/v1";

/**
 * Scrape latest news
 * @param {string} filter - Filter type (rising, hot, bullish, bearish)
 * @returns {Promise<object>} News data
 */
export async function scrapeNews(filter = "hot") {
  const url = `${BASE_URL}/posts/?auth_token=${API_KEY}&filter=${filter}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`CryptoPanic API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("CryptoPanic news scraping error:", error.message);
    return null;
  }
}

export default {
  scrapeNews
};
