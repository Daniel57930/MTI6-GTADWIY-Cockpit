import React, { useState, useEffect } from "react";

// Dummy earnings scraper logic; replace with real API/web logic
const SOURCES = [
  { name: "Yahoo Finance", url: "https://finance.yahoo.com" },
  { name: "Bloomberg", url: "https://bloomberg.com" },
  { name: "CoinMarketCap", url: "https://coinmarketcap.com" },
  { name: "Google News", url: "https://news.google.com" }
];

export default function BotScraper({ bot, onLogEarning }) {
  const [scraping, setScraping] = useState(false);

  useEffect(() => {
    if (!scraping) return;
    // Simulate scraping
    setTimeout(() => {
      const earning = {
        source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
        amount: (Math.random() * 1000).toFixed(2),
        asset: ["BTC", "ETH", "AAPL", "TSLA", "SOL", "DAI"][Math.floor(Math.random() * 6)],
        timestamp: new Date().toISOString(),
        bot: bot.name
      };
      onLogEarning && onLogEarning(earning);
      setScraping(false);
    }, 1500);
  }, [scraping, bot, onLogEarning]);

  return (
    <div style={{ marginTop: 6 }}>
      <button
        style={{
          background: "#39f",
          color: "#fff",
          borderRadius: 8,
          padding: "5px 12px",
          fontWeight: "bold"
        }}
        onClick={() => setScraping(true)}
        disabled={scraping}
      >
        Scrape Earnings
      </button>
      {scraping && <span style={{ marginLeft: 10, color: "#32c9ff" }}>Scraping...</span>}
    </div>
  );
}
