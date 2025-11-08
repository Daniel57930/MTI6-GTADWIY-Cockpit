import { useEffect, useState, useRef } from "react";

export default function useAddressMonitor(address, { pollInterval = 15000 } = {}) {
  const [data, setData] = useState({ balance: null, recentTxs: [] });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    async function fetchData() {
      if (!address) return;
      try {
        const res = await fetch(`/api/monitor/address/${encodeURIComponent(address)}`);
        if (!res.ok) throw new Error("monitor fetch failed");
        const j = await res.json();
        if (mounted.current) setData(j);
      } catch (err) {
        // ignore or set error state
      }
    }
    fetchData();
    const id = setInterval(fetchData, pollInterval);
    return () => { mounted.current = false; clearInterval(id); };
  }, [address, pollInterval]);

  return data;
}