import BotStatsLogger from "../Stats/BotStatsLogger";
import * as adapter from "./adapter";

// Lightweight Tradefeeds service with fallback to alternate provider.
// Reads API keys from env: REACT_APP_TRADEFEEDS_KEY and REACT_APP_ALTV_PROVIDER_KEY
export async function fetchTradefeedsIndicator({
  symbol = "BTCUSD",
  indicator = "relativestrength_index",
  period = 14,
  source = "tradefeeds" // "tradefeeds" or "alt"
} = {}) {
  const TRADEFEEDS_KEY = process.env.REACT_APP_TRADEFEEDS_KEY;
  const ALT_KEY = process.env.REACT_APP_ALTV_PROVIDER_KEY; // e.g., AlphaVantage/Finnhub

  const buildTradefeedsUrl = () => `https://data.tradefeeds.com/api/v1/technicalindicators?key=${TRADEFEEDS_KEY}&stocktickersymbol=${encodeURIComponent(symbol)}&technicalindicator=${encodeURIComponent(indicator)}&period=${period}`;

  // Example alternative provider URL (placeholder - adjust to provider's spec)
  const buildAltUrl = () => `https://api.altprovider.com/v1/indicators?apikey=${ALT_KEY}&symbol=${encodeURIComponent(symbol)}&indicator=${encodeURIComponent(indicator)}&period=${period}`;

  // Try the requested source first, otherwise try primary then fallback
  const tryOrderUrls = source === "alt" ? [buildAltUrl(), buildTradefeedsUrl()] : [buildTradefeedsUrl(), buildAltUrl()];

  const attempts = [];

  for (const url of tryOrderUrls) {
    try {
      BotStatsLogger.log({ type: "tradefeed-attempt", provider: url, status: "started" });
      const res = await fetch(url, { method: "GET" });
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch (e) { json = null; }

      if (!res.ok) {
        const err = { url, status: res.status, body: text };
        attempts.push(err);
        BotStatsLogger.log({ type: "tradefeed-attempt", provider: url, status: "http-error", error: err });
        continue;
      }

      // Normalize response into common shape: { timestamps: [], values: [] }
      const normalized = adapter.normalizeIndicatorResponse(url, json);
      if (normalized && normalized.values && normalized.values.length) {
        BotStatsLogger.log({ type: "tradefeed-attempt", provider: url, status: "success", result: { count: normalized.values.length } });
        return { ok: true, providerUrl: url, payload: normalized };
      } else {
        const err = { url, status: "no-data", body: json };
        attempts.push(err);
        BotStatsLogger.log({ type: "tradefeed-attempt", provider: url, status: "no-data", error: err });
      }
    } catch (err) {
      const errorObj = { url, status: "network/error", error: String(err) };
      attempts.push(errorObj);
      BotStatsLogger.log({ type: "tradefeed-attempt", provider: url, status: "error", error: errorObj });
      // Try next provider
    }
  }

  // If we reach here all providers failed
  BotStatsLogger.log({ type: "tradefeed-attempt", provider: "all", status: "failed", errors: attempts });
  return { ok: false, errors: attempts };
}
