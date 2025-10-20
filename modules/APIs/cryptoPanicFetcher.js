import dotenv from "dotenv";
dotenv.config();

const CRYPTOPANIC_API_KEY = process.env.CRYPTOPANIC_API_KEY;
export async function fetchCryptoPanicNews() {
  try {
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTOPANIC_API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.results;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}