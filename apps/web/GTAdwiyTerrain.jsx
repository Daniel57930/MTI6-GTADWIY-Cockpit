import React, { useState, useEffect } from 'react';

/**
 * GTAdwiy Terrain - Terrain Signage and Bot Role Layout
 * Visual representation of the spiritual/technical terrain
 * Displays bot roles and their territories
 * Part of MTI6-GTADWIY-Cockpit
 */

const BOT_ROLES = {
  STARBOT: {
    id: 'starbot',
    name: 'StarBot',
    zone: 'Spiritual Guidance',
    color: '#FFD700',
    responsibilities: [
      'Affirmation Engine',
      'Prophecy Sync',
      'Scripture Integration'
    ]
  },
  SENTINEL: {
    id: 'sentinel',
    name: 'Sentinel',
    zone: 'Protection & Monitoring',
    color: '#4169E1',
    responsibilities: [
      'Threat Detection',
      'Security Oversight',
      'Boundary Enforcement'
    ]
  },
  NAVIGATOR: {
    id: 'navigator',
    name: 'Navigator',
    zone: 'Trading & Asset Flow',
    color: '#32CD32',
    responsibilities: [
      'Stealth Routing',
      'Asset Movement',
      'Withdrawal Tracking'
    ]
  },
  CHRONICLER: {
    id: 'chronicler',
    name: 'Chronicler',
    zone: 'Legacy & Records',
    color: '#9370DB',
    responsibilities: [
      'Milestone Logging',
      'Event Tracking',
      'Historical Archive'
    ]
  }
};

export const GTAdwiyTerrain = () => {
  const [activeBot, setActiveBot] = useState(null);
  const [terrainView, setTerrainView] = useState('grid'); // 'grid' or 'map'

  const handleBotSelect = (botId) => {
    setActiveBot(activeBot === botId ? null : botId);
    console.log(`[Terrain] Selected bot: ${botId}`);
  };

  const renderGridView = () => (
    <div className="terrain-grid">
      {Object.values(BOT_ROLES).map((bot) => (
        <div
          key={bot.id}
          className={`bot-territory ${activeBot === bot.id ? 'active' : ''}`}
          onClick={() => handleBotSelect(bot.id)}
          style={{ borderColor: bot.color }}
        >
          <div className="bot-header" style={{ backgroundColor: bot.color }}>
            <h3>{bot.name}</h3>
            <span className="bot-zone">{bot.zone}</span>
          </div>
          
          {activeBot === bot.id && (
            <div className="bot-responsibilities">
              <h4>Responsibilities:</h4>
              <ul>
                {bot.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderMapView = () => (
    <div className="terrain-map">
      <svg viewBox="0 0 800 600" className="terrain-svg">
        {/* Central Core */}
        <circle cx="400" cy="300" r="50" fill="#1a1a1a" stroke="#FFD700" strokeWidth="2" />
        <text x="400" y="305" textAnchor="middle" fill="#FFD700" fontSize="14">
          COCKPIT
        </text>

        {/* Bot Territories in quadrants */}
        {Object.values(BOT_ROLES).map((bot, index) => {
          const angle = (index * Math.PI * 2) / 4 - Math.PI / 2;
          const x = 400 + Math.cos(angle) * 200;
          const y = 300 + Math.sin(angle) * 200;
          
          return (
            <g key={bot.id}>
              <circle
                cx={x}
                cy={y}
                r="80"
                fill="rgba(0,0,0,0.3)"
                stroke={bot.color}
                strokeWidth="2"
                className="bot-zone-circle"
                onClick={() => handleBotSelect(bot.id)}
              />
              <line
                x1="400"
                y1="300"
                x2={x}
                y2={y}
                stroke={bot.color}
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <text x={x} y={y - 10} textAnchor="middle" fill={bot.color} fontSize="12">
                {bot.name}
              </text>
              <text x={x} y={y + 10} textAnchor="middle" fill="#999" fontSize="10">
                {bot.zone}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );

  return (
    <div className="gtadwiy-terrain">
      <div className="terrain-header">
        <h2>GTAdwiy Terrain Map</h2>
        <div className="view-controls">
          <button
            className={terrainView === 'grid' ? 'active' : ''}
            onClick={() => setTerrainView('grid')}
          >
            Grid View
          </button>
          <button
            className={terrainView === 'map' ? 'active' : ''}
            onClick={() => setTerrainView('map')}
          >
            Map View
          </button>
        </div>
      </div>

      <div className="terrain-content">
        {terrainView === 'grid' ? renderGridView() : renderMapView()}
      </div>

      {activeBot && (
        <div className="terrain-info">
          <h3>{BOT_ROLES[activeBot.toUpperCase()].name} Active</h3>
          <p>Zone: {BOT_ROLES[activeBot.toUpperCase()].zone}</p>
        </div>
      )}
    </div>
  );
};

export default GTAdwiyTerrain;
