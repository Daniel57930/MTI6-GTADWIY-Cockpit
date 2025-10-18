import React, { useEffect, useState } from "react";
import { fetchTradefeedsIndicator } from "./TradefeedsService";

export default function TradefeedsLoader({
  initialSymbol = "BTCUSD",
  initialIndicator = "relativestrength_index",
  initialPeriod = 14
}) {
  const [symbol, setSymbol] = useState(initialSymbol);
  const [indicator, setIndicator] = useState(initialIndicator);
  const [period, setPeriod] = useState(initialPeriod);
  const [provider, setProvider] = useState("tradefeeds");
  const [status, setStatus] = useState("idle"); // idle | loading | success | failed
  const [data, setData] = useState(null);
  const [log, setLog] = useState([]);

  const pushLog = (entry) => setLog((s) => [entry, ...s].slice(0, 200));

  const runFetch = async () => {
    setStatus("loading");
    pushLog({ ts: Date.now(), msg: `Fetching ${indicator} for ${symbol} from ${provider}` });
    try {
      const result = await fetchTradefeedsIndicator({ symbol, indicator, period, source: provider });
      if (result.ok) {
        setData(result.payload);
        setStatus("success");
        pushLog({ ts: Date.now(), msg: "Success", providerUrl: result.providerUrl });
        if (typeof window !== "undefined" && window.BotStatsLogger) {
          window.BotStatsLogger.log({ type: "tradefeed", provider: result.providerUrl, status: "success" });
        }
      } else {
        setStatus("failed");
        pushLog({ ts: Date.now(), msg: "All providers failed", errors: result.errors });
        if (typeof window !== "undefined" && window.BotStatsLogger) {
          window.BotStatsLogger.log({ type: "tradefeed", status: "failed", errors: result.errors });
        }
      }
    } catch (err) {
      setStatus("failed");
      pushLog({ ts: Date.now(), msg: "Unhandled error", error: String(err) });
    }
  };

  useEffect(() => { runFetch(); }, []);

  return (
    <div className="p-4 bg-slate-900 rounded-lg text-white w-full max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-lg">Tradefeeds Diagnostic</div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${provider === "tradefeeds" ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setProvider("tradefeeds")}
          >
            Tradefeeds
          </button>
          <button
            className={`px-3 py-1 rounded ${provider === "alt" ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setProvider("alt")}
          >
            Alt Provider
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <input className="p-2 bg-gray-800 rounded" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        <input className="p-2 bg-gray-800 rounded" value={indicator} onChange={(e) => setIndicator(e.target.value)} />
      </div>

      <div className="flex gap-2 mb-3">
        <button className="bg-green-500 px-3 py-1 rounded" onClick={runFetch}>Run</button>
        <button
          className="bg-yellow-500 px-3 py-1 rounded"
          onClick={() => { setData(null); setStatus("idle"); pushLog({ ts: Date.now(), msg: "Cleared data by user" }); }}
        >
          Clear
        </button>
      </div>

      <div className="mb-3">
        <div className="text-sm text-gray-300">Status: <span className={`font-bold ${status === "success" ? "text-green-400" : status === "loading" ? "text-blue-300" : "text-red-400"}`}>{status}</span></div>
      </div>

      <div className="mb-3">
        {status === "loading" && <div className="text-blue-300">Loading…</div>}
        {status === "failed" && <pre className="text-sm text-red-300">{JSON.stringify(log[0] || {}, null, 2)}</pre>}
        {status === "success" && <pre className="text-sm text-green-300 max-h-48 overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
      </div>

      <div className="mt-3">
        <div className="text-xs text-gray-400 mb-1">Recent logs</div>
        <ul className="text-xs text-gray-300 max-h-40 overflow-auto">
          {log.map((l, i) => (
            <li key={i} className="mb-1 border-b border-slate-700 pb-1">
              <div className="text-[10px] text-slate-400">{new Date(l.ts).toLocaleString()}</div>
              <div>{l.msg}</div>
              {l.providerUrl && <div className="text-[11px] text-slate-400">{l.providerUrl}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}