/**
 * Etherscan Scraping Connector
 * 
 * Scrapes blockchain data from Etherscan API
 * API Key from process.env.ETHERSCAN_API_KEY
 */

const API_KEY = process.env.ETHERSCAN_API_KEY;
const BASE_URL = "https://api.etherscan.io/api";

/**
 * Scrape ETH balance for an address
 * @param {string} address - Ethereum address
 * @returns {Promise<string>} Balance in wei
 */
export async function scrapeBalance(address) {
  const url = `${BASE_URL}?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Etherscan API error: ${response.status}`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Etherscan balance scraping error:", error.message);
    return null;
  }
}

/**
 * Scrape transaction history
 * @param {string} address - Ethereum address
 * @returns {Promise<array>} Transaction list
 */
export async function scrapeTransactions(address, page = 1, offset = 10) {
  const url = `${BASE_URL}?module=account&action=txlist&address=${address}&page=${page}&offset=${offset}&sort=desc&apikey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Etherscan API error: ${response.status}`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Etherscan transaction scraping error:", error.message);
    return null;
  }
}

export default {
  scrapeBalance,
  scrapeTransactions
};
