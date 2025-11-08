// Simple Express server that performs safe fetches via Tor (SOCKS5).
// WARNING: Running this server requires a running Tor client listening on a SOCKS port (e.g., 9050).
// The server returns only sanitized metadata (title, text snippet) — do NOT return raw HTML with scripts.

import express from "express";
import got from "got";
import { SocksProxyAgent } from "socks-proxy-agent";

const app = express();
app.use(express.json());

const TOR_SOCKS = process.env.TOR_SOCKS || "socks5h://127.0.0.1:9050";
const agent = new SocksProxyAgent(TOR_SOCKS);

app.post("/api/tor/fetch", async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== "string") return res.status(400).json({ error: "invalid url" });

  try {
    const response = await got(url, { agent: { http: agent, https: agent }, timeout: 15000, retry: 0 });
    const text = response.body || "";
    const snippet = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").slice(0, 800);
    const titleMatch = text.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : "";
    return res.json({ title, snippet });
  } catch (err) {
    return res.status(502).json({ error: "fetch_failed", message: String(err.message) });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Tor proxy server listening on ${port}`));
