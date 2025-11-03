import { ethers } from "ethers";
import * as adapter from "./UniswapAdapter";

// Minimal SwapService for Uniswap v3
// - Uses injected wallet (MetaMask / WalletConnect) for client-side signing
// - For server-side signing create a server endpoint that uses SWAP_SERVER_PRIVATE_KEY (NOT in repo)

const QUOTER_ADDRESS = process.env.REACT_APP_QUOTER_ADDRESS || "0x0000000000000000000000000000000000000000";
const SWAP_ROUTER_ADDRESS = process.env.REACT_APP_SWAP_ROUTER_ADDRESS || "0x0000000000000000000000000000000000000000";

const QuoterABI = [
  "function quoteExactInputSingle(address,address,uint24,uint256,uint160) external returns (uint256)"
];
const SwapRouterABI = [
  "function exactInputSingle(tuple(address tokenIn,address tokenOut,uint24 fee,address recipient,uint256 deadline,uint256 amountIn,uint256 amountOutMinimum,uint160 sqrtPriceLimitX96)) external payable returns (uint256 amountOut)"
];

export async function getProvider() {
  // Guard: ensure ethers library is available
  if (typeof ethers === "undefined") {
    throw new Error("ethers library not available - ensure it is imported and bundled correctly");
  }
  
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }
  const rpc = process.env.REACT_APP_RPC_URL;
  if (!rpc) {
    throw new Error("No injected wallet found and REACT_APP_RPC_URL environment variable is not set. Please install MetaMask or configure REACT_APP_RPC_URL in your .env file.");
  }
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
  // Guard: ensure ethers library is available
  if (typeof ethers === "undefined") {
    throw new Error("ethers library not available - ensure it is imported and bundled correctly");
  }
  if (!window?.ethereum) throw new Error("No injected wallet found (window.ethereum)");
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
    if (typeof window !== "undefined" && window.BotStatsLogger) {
      window.BotStatsLogger.log({ type: "swap", provider: "uniswap", txHash: receipt.transactionHash, status: "completed", params });
    }
    return { ok: true, receipt };
  } catch (err) {
    if (typeof window !== "undefined" && window.BotStatsLogger) {
      window.BotStatsLogger.log({ type: "swap", provider: "uniswap", status: "failed", error: String(err), params });
    }
    console.error("Swap failed:", err);
    return { ok: false, error: String(err) };
  }
}