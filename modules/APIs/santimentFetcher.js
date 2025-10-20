// Free tier, no key required for some endpoints
export async function fetchSantimentPrice(slug) {
  try {
    const url = `https://api.santiment.net/graphql?query={getMetric(metric: \"price_usd\") { timeseriesData(slug: \"${slug}\") { value }}}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.data?.getMetric?.timeseriesData?.[0]?.value;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}