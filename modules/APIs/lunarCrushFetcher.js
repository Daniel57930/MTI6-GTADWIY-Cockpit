import dotenv from "dotenv";
dotenv.config();

const LUNARCRUSH_API_KEY = process.env.LUNARCRUSH_API_KEY;
export async function fetchLunarCrushSocialScore(symbol) {
  try {
    const url = `https://api.lunarcrush.com/v2?data=assets&key=${LUNARCRUSH_API_KEY}&symbol=${symbol}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.data?.[0]?.galaxy_score;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}