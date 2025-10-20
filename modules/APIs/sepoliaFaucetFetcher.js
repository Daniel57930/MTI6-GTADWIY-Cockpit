export async function fetchSepoliaFaucet(address) {
  try {
    const url = `https://faucet.sepolia.dev/claim?address=${address}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}