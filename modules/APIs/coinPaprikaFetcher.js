export async function fetchCoinPaprikaPrice(coinId) {
  try {
    const url = `https://api.coinpaprika.com/v1/tickers/${coinId}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.quotes?.USD?.price;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}