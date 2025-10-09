# MTI6-GTADWIY Cockpit — Scaffold (Updated)

This scaffold is a Next.js + TypeScript starter for the MTI6‑GTADWIY Cockpit. It now includes additional stubs and helpers for:
- Market data: Finnhub (stub)
- AI: OpenAI wrapper (text / embeddings / chat)
- Payments: CashApp (custom "My CashApp" stub)
- Wallets: ethers-based helpers (connect, sign, balances)
- Existing: DEX and CFD API wrapper stubs (Uniswap, PancakeSwap, Quotex, IQ Option, Olymp Trade).
- UI features: override toggles, emotional sync (EdenAI/Tavus/Twinword), fallback loaders, stealth routing.
- Graphics references: Icons8, Lordicon, Templated.

Important: this scaffold contains stubs and example code only. Do not use in production until:
- You add API credentials and implement full authentication and error handling.
- You review legal and regulatory compliance for each trading/payment/platform integration.
- You secure secrets (use Vercel environment variables, never commit keys).
- For CashApp-like payment flows, ensure you use an approved, documented API or authorized gateway.

Environment
- Copy `.env.example` to `.env.local` and fill the keys.

Local dev
- npm install
- npm run dev

How to push these files into scaffold/initial (local)
- git checkout scaffold/initial
- git add .
- git commit -m "Scaffold: add Finnhub/OpenAI/CashApp/wallet stubs and env updates"
- git push origin scaffold/initial

If you prefer, I can push these prepared files to scaffold/initial and open a PR for review — confirm and I will push and open the PR.

Deploy to Vercel
1. Connect the GitHub repo to Vercel.
2. Add the environment variables in Vercel's dashboard (match .env.example).
3. Set build command: `npm run build`
4. Deploy.

Security & compliance notes
- Do not commit secrets. Use environment variables.
- Trading/payment APIs may require KYC, agreements, and compliance. Confirm that you have rights to integrate with each provider.
- For wallets and stealth routing, production MEV protection and private RPCs are recommended.
- For emotion data (audio/text), add consent and privacy flows.