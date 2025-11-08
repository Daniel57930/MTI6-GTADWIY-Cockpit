import { ethers } from "ethers";
import * as adapter from "./UniswapAdapter";
import { getEnv, isBrowser } from "../../src/lib/envGuard.js";

// Minimal SwapService for Uniswap v3
// - Uses injected wallet (MetaMask / WalletConnect) for client-side signing
// - For server-side signing create a server endpoint that uses SWAP_SERVER_PRIVATE_KEY (NOT in repo)

const QUOTER_ADDRESS = getEnv("REACT_APP_QUOTER_ADDRESS", "0x0000000000000000000000000000000000000000");
const SWAP_ROUTER_ADDRESS = getEnv("REACT_APP_SWAP_ROUTER_ADDRESS", "0x0000000000000000000000000000000000000000");

const QuoterABI = [
  "function quoteExactInputSingle(address,address,uint24,uint256,uint160) external returns (uint256)"
];
const SwapRouterABI = [
  "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)"
];

export async function getProvider() {
  // Prefer injected provider in browser environments
  if (isBrowser() && typeof window.ethereum !== "undefined") {
    if (!ethers) throw new Error("ethers not available. Ensure the 'ethers' package is installed.");
    return new ethers.providers.Web3Provider(window.ethereum);
  }

  // Fallback to RPC provider (server-side or no wallet)
  const rpc = getEnv("REACT_APP_RPC_URL");
  if (!rpc) {
    throw new Error(
      "No provider available: neither an injected wallet (window.ethereum) was detected nor REACT_APP_RPC_URL is set. " +
      "Set REACT_APP_RPC_URL for server-side operation, or run in a browser with a wallet extension."
    );
  }
  if (!ethers) throw new Error("ethers not available. Ensure the 'ethers' package is installed.");
  return new ethers.providers.JsonRpcProvider(rpc);
}

export async function getQuoteSingle({ tokenIn, tokenOut, fee = 3000, amountIn }) {
  const provider = await getProvider();
  const quoter = new ethers.Contract(QUOTER_ADDRESS, QuoterABI, provider);
  try {
    const quoted = await quoter.quoteExactInputSingle(tokenIn, tokenOut, fee, amountIn, 0);
    return { ok: true, amountOut: quoted.toString() };
  } catch (err) {
    console.error("Quoter error:", err);
    return { ok: false, error: String(err) };
  }
}

export async function buildAndSendSwap({ tokenIn, tokenOut, fee = 3000, recipient, amountIn, amountOutMinimum = 0, deadline = Math.floor(Date.now() / 1000) + 60 * 20, sqrtPriceLimitX96 = 0 }) {
  if (!isBrowser() || !window?.ethereum) throw new Error("No injected wallet found (window.ethereum). Install MetaMask or use a WalletConnect provider.");
  if (!ethers) throw new Error("ethers not available. Ensure the 'ethers' package is installed.");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const swapRouter = new ethers.Contract(SWAP_ROUTER_ADDRESS, SwapRouterABI, signer);
  const params = {
    tokenIn,
    tokenOut,
    fee,
    recipient,
    deadline,
    amountIn,
    amountOutMinimum,
    sqrtPriceLimitX96
  };

  try {
    const tx = await swapRouter.exactInputSingle(params, { gasLimit: 800000 });
    const receipt = await tx.wait();
    if (isBrowser() && window.BotStatsLogger) {
      window.BotStatsLogger.log({ type: "swap", provider: "uniswap", txHash: receipt.transactionHash, status: "completed", params });
    }
    return { ok: true, receipt };
  } catch (err) {
    if (isBrowser() && window.BotStatsLogger) {
      window.BotStatsLogger.log({ type: "swap", provider: "uniswap", status: "failed", error: String(err), params });
    }
    console.error("Swap failed:", err);
    return { ok: false, error: String(err) };
  }
}
export default {
  getProvider,
  getQuoteSingle,
  buildAndSendSwap
};
