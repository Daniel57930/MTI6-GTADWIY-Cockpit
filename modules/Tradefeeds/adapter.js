// Adapter to normalize different provider responses into a unified schema
// The returned shape should be: { symbol, indicator, timestamps: [], values: [] }

export function normalizeIndicatorResponse(url, json) {
  if (!json) return null;

  // Heuristics for Tradefeeds: they often return an object with 'data' or 'values'
  if (json.data && Array.isArray(json.data)) {
    // Example: { data: [{timestamp: 163..., value: 45.3}, ...] }
    const timestamps = [];
    const values = [];
    for (const row of json.data) {
      if (row.timestamp !== undefined && row.value !== undefined) {
        timestamps.push(row.timestamp);
        values.push(Number(row.value));
      } else if (row.t !== undefined && row.v !== undefined) {
        timestamps.push(row.t);
        values.push(Number(row.v));
      }
    }
    if (values.length) return { symbol: json.symbol || "", indicator: json.indicator || "", timestamps, values };
  }

  // Heuristics for alternative providers which might return { values: [..], timestamps: [..] }
  if (Array.isArray(json.values) && Array.isArray(json.timestamps)) {
    return { symbol: json.symbol || "", indicator: json.indicator || "", timestamps: json.timestamps, values: json.values.map(Number) };
  }

  // Another common form: { TechnicalAnalysis: { RSI: { "2021-09-01": { RSI: "45.3" }, ... } } } (AlphaVantage-like)
  if (json.TechnicalAnalysis) {
    const key = Object.keys(json.TechnicalAnalysis)[0];
    if (key) {
      const entries = Object.entries(json.TechnicalAnalysis[key]);
      const timestamps = [];
      const values = [];
      for (const [ts, obj] of entries) {
        const val = Object.values(obj)[0];
        timestamps.push(ts);
        values.push(Number(val));
      }
      if (values.length) return { symbol: json.symbol || "", indicator: key, timestamps, values };
    }
  }

  // Fallback attempt: try to extract numeric values from any array in the payload
  const allNumbers = [];
  JSON.stringify(json).replace(/[-]?[0-9]*\.?[0-9]+/g, (m) => { allNumbers.push(Number(m)); return m; });
  if (allNumbers.length) {
    return { symbol: "", indicator: "unknown", timestamps: [], values: allNumbers };
  }

  return null;
}
