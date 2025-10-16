import React from "react";

// List of all missions bots can do
const missions = [
  "Trade All Assets",
  "Farm All Pools",
  "Mine All Coins",
  "Stake All Tokens",
  "Optimize Store Listings"
];

export default function BotMissionEngine({ bot, onMissionStart }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontWeight: "bold", color: "#39f" }}>Assign Mission:</div>
      {missions.map(mission => (
        <button
          key={mission}
          style={{
            margin: "4px 7px 0 0",
            background: "#232a44",
            color: "#fff",
            borderRadius: 8,
            padding: "4px 10px",
            fontWeight: "bold"
          }}
          onClick={() => onMissionStart && onMissionStart({ mission, bot: bot.name, started: new Date().toISOString() })}
        >
          {mission}
        </button>
      ))}
    </div>
  );
}