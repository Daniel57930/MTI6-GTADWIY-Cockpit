export async function fetchBinancePrice(symbol) {
  try {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.price;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}