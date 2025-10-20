import dotenv from "dotenv";
dotenv.config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
export async function fetchEtherscanTxCount(address) {
  try {
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.result;
  } catch (e) {
    // fallback loader, override trigger, or alert bot
    return null;
  }
}