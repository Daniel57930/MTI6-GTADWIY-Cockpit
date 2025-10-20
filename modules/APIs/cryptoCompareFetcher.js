import dotenv from "dotenv";
dotenv.config();

const CRYPTOCOMPARE_API_KEY = process.env.CRYPTOCOMPARE_API_KEY;
export async function fetchCryptoComparePrice(symbol, currency = "USD") {
  try {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${currency}`;
    const headers = CRYPTOCOMPARE_API_KEY ? { authorization: `Apikey ${CRYPTOCOMPARE_API_KEY}` } : {};
    const resp = await fetch(url, { headers });
    const data = await resp.json();
    return data[currency];
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}