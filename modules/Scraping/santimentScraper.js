/**
 * Santiment Scraping Connector
 * 
 * Scrapes on-chain and social data from Santiment API
 * API Key from process.env.SANTIMENT_API_KEY
 */

const API_KEY = process.env.SANTIMENT_API_KEY;
const BASE_URL = "https://api.santiment.net/graphql";

/**
 * Scrape on-chain metrics
 * @param {string} slug - Project slug
 * @returns {Promise<object>} On-chain metrics
 */
export async function scrapeOnChainMetrics(slug) {
  const query = `
    query {
      getMetric(metric: "daily_active_addresses") {
        timeseriesData(
          slug: "${slug}"
          from: "utc_now-7d"
          to: "utc_now"
          interval: "1d"
        ) {
          datetime
          value
        }
      }
    }
  `;
  
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apikey ${API_KEY}`
      },
      body: JSON.stringify({ query })
    });
    
    if (!response.ok) throw new Error(`Santiment API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Santiment scraping error:", error.message);
    return null;
  }
}

export default {
  scrapeOnChainMetrics
};
