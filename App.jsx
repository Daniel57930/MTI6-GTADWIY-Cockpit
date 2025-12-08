import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { WalletProvider } from './modules/Wallet/WalletContext';
import GlobeScreen from './modules/Globe/GlobeScreen';
import TradingPlatform from './modules/Trading/TradingPlatform';

export default function App() {
  const [screen, setScreen] = useState('globe'); // 'globe' | 'trading'
  const [screenParams, setScreenParams] = useState({});

  function handleSelectScreen(screenName, params = {}) {
    setScreen(screenName);
    setScreenParams(params);
  }

  return (
    <WalletProvider>
      <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: 8, background: '#0b0b12', color: '#fff' }}>
          <h3>MTI6 Cockpit</h3>
        </header>

        <main style={{ flex: 1, position: 'relative' }}>
          {screen === 'globe' && (
            <Canvas camera={{ position: [0, 0, 6] }}>
              <GlobeScreen onSelectScreen={handleSelectScreen} />
            </Canvas>
          )}

          {screen === 'trading' && (
            <div style={{ width: '100%', height: '100%' }}>
              <button onClick={() => setScreen('globe')} style={{ position: 'absolute', zIndex: 10, left: 12, top: 12 }}>Back</button>
              <TradingPlatform {...screenParams} />
            </div>
          )}
        </main>
      </div>
    </WalletProvider>
  );
}