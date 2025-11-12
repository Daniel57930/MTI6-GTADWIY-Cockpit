// server/index.js — simple stub: serves /api/globe-points and a WebSocket /ws/globe
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

const samplePoints = [
  { id: 'nyc', name: 'New York', city: 'New York', cityId: 'nyc', x: 1.2, y: 0.4, z: -2.3, symbol: 'BTC', valueUsd: 28000 },
  { id: 'tokyo', name: 'Tokyo', city: 'Tokyo', cityId: 'tokyo', x: -1.8, y: 0.6, z: 1.7, symbol: 'ETH', valueUsd: 1800 },
  { id: 'london', name: 'London', city: 'London', cityId: 'london', x: 0.2, y: -0.9, z: 2.0, symbol: 'BTC', valueUsd: 5200 },
];

app.get('/api/globe-points', (req, res) => {
  res.json({ points: samplePoints });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws/globe' });

wss.on('connection', (ws) => {
  console.log('ws client connected to /ws/globe');

  ws.send(JSON.stringify({ type: 'hello', now: Date.now(), available: samplePoints.map(p => p.id) }));

  ws.on('message', (msg) => {
    try { console.log('ws recv', msg.toString()); } catch (e) {}
  });
});

// Broadcast fake updates every 5 seconds (random small changes)
setInterval(() => {
  if (!wss.clients || wss.clients.size === 0) return;
  const p = samplePoints[Math.floor(Math.random() * samplePoints.length)];
  // random +/- percent
  const delta = (Math.random() * 0.06) - 0.03;
  p.valueUsd = Math.max(0, Math.round((p.valueUsd * (1 + delta)) * 100) / 100);
  const payload = { type: 'point-update', point: p };
  const data = JSON.stringify(payload);
  wss.clients.forEach(cli => { if (cli.readyState === WebSocket.OPEN) cli.send(data); });
  console.log('broadcast point-update', p.id, p.valueUsd);
}, 5000);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server (HTTP+WS) listening on ${port}`));