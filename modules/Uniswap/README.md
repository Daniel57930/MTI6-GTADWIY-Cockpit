# Uniswap Swap Dashboard (scaffold)

This module provides a simple Uniswap v3 swap scaffold for the cockpit:
- SwapService.js — builds quotes and executes swaps via an injected wallet (MetaMask).
- UniswapAdapter.js — helpers for parsing/formatting amounts.
- SwapDashboard.jsx — simple React + Tailwind UI for testing swaps.

Security & deployment notes
- Never store private keys in the frontend. Use WalletConnect / MetaMask for client-side signing.
- If you require server-side signing, implement a secure server endpoint (server/proxy) and keep the private key in server env vars (do NOT commit).
- Replace placeholder contract addresses (QUOTER_ADDRESS, SWAP_ROUTER_ADDRESS) with the correct addresses for your target chain.
- Add ABIs for Quoter and SwapRouter (per Uniswap periphery) for production.

Environment variables (.env.example)
- REACT_APP_RPC_URL (readonly)
- SWAP_SERVER_PRIVATE_KEY (only for server-side signing; do NOT put in client .env)

Testing
- Use testnets (Sepolia/Goerli) and wrapped test tokens before using mainnet.
- Check transaction gas and slippage configuration.

Bot integration
- Use window.BotStatsLogger.log(...) to capture bot-triggered swaps, signals and tx hashes.
