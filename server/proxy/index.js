const express = require("express");
const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const cors = require("cors");
const adapter = require("../../modules/Tradefeeds/adapter");

const app = express();
app.use(cors());
app.use(express.json());

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // 60s default TTL
const PORT = process.env.PORT || 4000;

// env keys (server-side)
const TRADEFEEDS_KEY = process.env.TRADEFEEDS_KEY;
const ALT_PROVIDER_KEY = process.env.ALT_PROVIDER_KEY;

// simple in-memory log store
const logs = [];
function pushLog(entry) {
  logs.push({ ts: new Date().toISOString(), ...entry });
  if (logs.length > 5000) logs.shift();
}

// Build provider URLs (placeholders; replace ALT provider with real endpoint)
function buildTradefeedsUrl({ symbol, indicator, period }) {
  return `https://data.tradefeeds.com/api/v1/technicalindicators?key=${TRADEFEEDS_KEY}&stocktickersymbol=${encodeURIComponent(symbol)}&technicalindicator=${encodeURIComponent(indicator)}&period=${period}`;
}
function buildAltUrl({ symbol, indicator, period }) {
  // Replace below with the real alternate provider URL and query params
  return `https://api.altprovider.com/v1/indicators?apikey=${ALT_PROVIDER_KEY}&symbol=${encodeURIComponent(symbol)}&indicator=${encodeURIComponent(indicator)}&period=${period}`;
}

// Endpoint: GET /api/indicator
// query: symbol, indicator, period, source (optional: 'tradefeeds'|'alt')
app.get("/api/indicator", async (req, res) => {
  const { symbol = "BTCUSD", indicator = "relativestrength_index", period = 14, source } = req.query;

  if (!TRADEFEEDS_KEY) {
    return res.status(500).json({ ok: false, error: "Server missing TRADEFEEDS_KEY env var" });
  }

  const cacheKey = `indicator:${symbol}:${indicator}:${period}:${source || "auto"}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    pushLog({ type: "cache-hit", key: cacheKey, symbol, indicator });
    return res.json({ ok: true, provider: cached.provider, payload: cached.payload, cached: true });
  }

  const urls = source === "alt" ? [buildAltUrl({ symbol, indicator, period }), buildTradefeedsUrl({ symbol, indicator, period })] : [buildTradefeedsUrl({ symbol, indicator, period }), buildAltUrl({ symbol, indicator, period })];

  const attempts = [];
  for (const url of urls) {
    try {
      pushLog({ type: "attempt", provider: url });
      const r = await fetch(url, { method: "GET", timeout: 15000 });
      const text = await r.text();
      if (!r.ok) {
        attempts.push({ url, status: r.status, body: text });
        pushLog({ type: "http-error", provider: url, status: r.status });
        continue;
      }
      let json;
      try { json = JSON.parse(text); } catch (e) { json = null; }
      const normalized = adapter.normalizeIndicatorResponse(url, json);
      if (normalized && Array.isArray(normalized.values) && normalized.values.length) {
        cache.set(cacheKey, { provider: url, payload: normalized }, 60); // cache 60s
        pushLog({ type: "success", provider: url, count: normalized.values.length });
        return res.json({ ok: true, provider: url, payload: normalized });
      } else {
        attempts.push({ url, status: "no-data", body: json || text });
        pushLog({ type: "no-data", provider: url });
      }
    } catch (err) {
      attempts.push({ url, status: "error", error: String(err) });
      pushLog({ type: "error", provider: url, error: String(err) });
    }
  }

  pushLog({ type: "all-failed", attempts });
  return res.status(502).json({ ok: false, errors: attempts });
});

// Basic logging endpoints
app.post("/api/logs", (req, res) => {
  const payload = req.body || {};
  pushLog({ type: "client-log", payload });
  return res.json({ ok: true });
});
app.get("/api/logs", (req, res) => {
  return res.json({ ok: true, logs: logs.slice(-500).reverse() });
});

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Tradefeeds proxy running on port ${PORT}`);
});