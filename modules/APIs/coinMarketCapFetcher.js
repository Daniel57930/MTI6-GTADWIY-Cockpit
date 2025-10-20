import dotenv from "dotenv";
dotenv.config();

const CMC_API_KEY = process.env.CMC_API_KEY;
export async function fetchCMCPrice(symbol) {
  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`;
    const headers = { "X-CMC_PRO_API_KEY": CMC_API_KEY };
    const resp = await fetch(url, { headers });
    const data = await resp.json();
    return data.data[symbol]?.quote?.USD?.price;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}