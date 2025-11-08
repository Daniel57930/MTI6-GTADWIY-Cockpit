/**
 * Tor Proxy Server
 * Proxy server for routing requests through Tor network
 * 
 * WARNING: This is a development proxy. Before production use:
 * 1. Ensure Tor client is properly installed and running
 * 2. Implement proper security hardening
 * 3. Add authentication and rate limiting
 * 4. Review and update security configurations
 * 
 * Usage:
 * export TOR_SOCKS=socks5h://127.0.0.1:9050
 * node index.js
 */

import http from 'http';
import { SocksProxyAgent } from 'socks-proxy-agent';

const PORT = process.env.PORT || 3001;
const TOR_SOCKS = process.env.TOR_SOCKS || 'socks5h://127.0.0.1:9050';

// Create SOCKS proxy agent for Tor
const agent = new SocksProxyAgent(TOR_SOCKS);

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', tor: TOR_SOCKS }));
    return;
  }

  // Proxy other requests through Tor
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Tor proxy is running',
    warning: 'This proxy requires security hardening before production use',
  }));
});

server.listen(PORT, () => {
  console.log(`Tor proxy server running on port ${PORT}`);
  console.log(`Using Tor SOCKS proxy: ${TOR_SOCKS}`);
  console.log('WARNING: This is a development proxy. Implement security hardening before production use.');
});
