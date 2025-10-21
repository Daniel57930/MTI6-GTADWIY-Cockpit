import React, { useState, useEffect } from "react";
import { BOT_VISUALS } from "./botVisualsConfig";

function BotCard({ bot }) {
  return (
    <div className="bot-card">
      <h2>{bot.bot_id}</h2>
      <div>
        <b>Face:</b> {bot.face_preset}
        <br /><b>Hair (scalp):</b> {bot.hair_logic.scalp}
        <br /><b>Beard:</b> {bot.hair_logic.beard}
        <br /><b>Body Hair:</b> {bot.hair_logic.body_hair}
      </div>
      <div>
        <b>Emotion:</b> {bot.emotion_sync.idle} / <b>Override:</b> {bot.emotion_sync.override} / <b>Blessing:</b> {bot.emotion_sync.blessing}
      </div>
      <div>
        <b>Body Morph:</b> Posture: {bot.body_morph.posture}, Muscle: {bot.body_morph.muscle_tone}, Skin: {bot.body_morph.skin_detail}
      </div>
      <div>
        <b>Lighting:</b> {bot.lighting_sync}
        <br /><b>Glyph:</b> {bot.override_glyph}
        <br /><b>Zone:</b> {bot.deployment_zone}
      </div>
      {/* For photoreal fidelity: insert MetaHuman/Scenario-generated images, SVG overlays, Bronx map grid here */}
    </div>
  );
}

export default function BotVisualsPanel() {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    // Simulate batch load; in production, fetch from JSON, DB, or API
    setBots(BOT_VISUALS);
  }, []);

  return (
    <div className="bot-visuals-panel">
      <h1>🧠 GTADWIY Bot Visuals (Photoreal, Bronx Mission Sync)</h1>
      <div className="bot-cards-grid">
        {bots.map(bot => <BotCard key={bot.bot_id} bot={bot} />)}
      </div>
    </div>
  );
}