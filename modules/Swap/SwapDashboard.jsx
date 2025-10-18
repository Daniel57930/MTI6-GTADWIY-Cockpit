import React, { useState } from "react";
import { getProvider, getQuoteSingle, buildAndSendSwap } from "../Uniswap/SwapService";
import { parseAmount, formatAmount } from "../Uniswap/UniswapAdapter";

export default function SwapDashboard({ defaultTokenIn = "", defaultTokenOut = "" }) {
  const [tokenIn, setTokenIn] = useState(defaultTokenIn);
  const [tokenOut, setTokenOut] = useState(defaultTokenOut);
  const [amountInHuman, setAmountInHuman] = useState("0.1");
  const [fee, setFee] = useState(3000);
  const [status, setStatus] = useState("idle");
  const [quote, setQuote] = useState(null);
  const [slippage, setSlippage] = useState(0.5);

  const connectWallet = async () => {
    try {
      await getProvider();
      setStatus("wallet-connected");
    } catch (err) {
      setStatus("no-wallet");
    }
  };

  const handleGetQuote = async () => {
    setStatus("quoting");
    const amountIn = parseAmount(amountInHuman, 18);
    const res = await getQuoteSingle({ tokenIn, tokenOut, fee, amountIn });
    if (res.ok) {
      setQuote(res);
      setStatus("quoted");
    } else {
      setQuote(null);
      setStatus("quote-failed");
      console.error(res.error);
    }
  };

  const handleSwap = async () => {
    setStatus("swapping");
    const amountIn = parseAmount(amountInHuman, 18);
    const amountOutMinimum = quote?.amountOut ? Math.floor(Number(quote.amountOut) * (1 - slippage / 100)).toString() : 0;
    try {
      const recipient = (await (await getProvider()).getSigner().getAddress());
      const res = await buildAndSendSwap({ tokenIn, tokenOut, fee, recipient, amountIn, amountOutMinimum });
      if (res.ok) {
        setStatus("swap-success");
      } else {
        setStatus("swap-failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("swap-error");
    }
  };

  return (
    <div className="p-6 bg-slate-900 rounded-lg max-w-2xl text-white">
      <h3 className="text-xl font-bold mb-4">Swap Dashboard (Uniswap v3)</h3>
      <div className="grid grid-cols-1 gap-3">
        <input className="p-2 bg-gray-800 rounded" placeholder="Token In address" value={tokenIn} onChange={(e) => setTokenIn(e.target.value)} />
        <input className="p-2 bg-gray-800 rounded" placeholder="Token Out address" value={tokenOut} onChange={(e) => setTokenOut(e.target.value)} />
        <div className="flex gap-2">
          <input className="p-2 bg-gray-800 rounded flex-1" value={amountInHuman} onChange={(e) => setAmountInHuman(e.target.value)} />
          <select value={fee} onChange={(e) => setFee(Number(e.target.value))} className="bg-gray-800 p-2 rounded">
            <option value={500}>0.05% (500)</option>
            <option value={3000}>0.3% (3000)</option>
            <option value={10000}>1% (10000)</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button className="bg-blue-500 px-4 py-2 rounded" onClick={connectWallet}>Connect Wallet</button>
          <button className="bg-green-500 px-4 py-2 rounded" onClick={handleGetQuote}>Get Quote</button>
          <button className="bg-yellow-500 px-4 py-2 rounded" onClick={handleSwap}>Swap</button>
        </div>

        <div>
          <div>Status: <span className="font-bold">{status}</span></div>
          {quote && <pre className="mt-2 text-sm text-green-200">Quote amountOut: {formatAmount(quote.amountOut || "0", 18)}</pre>}
        </div>
      </div>
    </div>
  );
}