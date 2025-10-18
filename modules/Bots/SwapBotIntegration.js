// Simple bot integration hooks for swap actions. Bots can call these helpers to trigger swaps and log signals.
import { getQuoteSingle, buildAndSendSwap } from "../Uniswap/SwapService";
import BotStatsLogger from "../Stats/BotStatsLogger";

export async function botQuote(symbols) {
  try {
    const [tokenIn, tokenOut] = symbols;
    const res = await getQuoteSingle({ tokenIn, tokenOut, amountIn: "1000000000000000000" });
    BotStatsLogger.log({ type: "bot-quote", symbols, result: res });
    return res;
  } catch (err) {
    BotStatsLogger.log({ type: "bot-quote-error", symbols, error: String(err) });
    return { ok: false, error: String(err) };
  }
}

export async function botSwap({ tokenIn, tokenOut, amountIn, recipient }) {
  try {
    const res = await buildAndSendSwap({ tokenIn, tokenOut, amountIn, recipient });
    BotStatsLogger.log({ type: "bot-swap", tokenIn, tokenOut, result: res });
    return res;
  } catch (err) {
    BotStatsLogger.log({ type: "bot-swap-error", tokenIn, tokenOut, error: String(err) });
    return { ok: false, error: String(err) };
  }
}
