import dotenv from "dotenv";
dotenv.config();

const NOMICS_API_KEY = process.env.NOMICS_API_KEY;
export async function fetchNomicsPrice(symbol) {
  try {
    const url = `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_API_KEY}&ids=${symbol}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data[0]?.price;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}