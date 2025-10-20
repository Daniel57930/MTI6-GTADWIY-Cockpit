import dotenv from "dotenv";
dotenv.config();

const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
export async function fetchCoinGeckoPrice(assetId) {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${assetId}&vs_currencies=usd`;
    const headers = COINGECKO_API_KEY ? { "x-cg-demo-api-key": COINGECKO_API_KEY } : {};
    const resp = await fetch(url, { headers });
    const data = await resp.json();
    return data[assetId]?.usd;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}