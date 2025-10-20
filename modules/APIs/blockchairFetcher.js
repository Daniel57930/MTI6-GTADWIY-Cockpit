export async function fetchBlockchairAddressInfo(address, chain = "ethereum") {
  try {
    const url = `https://api.blockchair.com/${chain}/dashboards/address/${address}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.data?.[address];
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}