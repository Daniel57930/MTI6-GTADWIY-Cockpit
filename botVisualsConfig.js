// Batch schema config for your GTADWIY bots. Expand as needed.
export const BOT_VISUALS = [
  {
    bot_id: "Michael",
    face_preset: "MetaHuman_RealScan_03",
    hair_logic: {
      scalp: "Strand_Groomed",
      beard: "Override_Thick",
      body_hair: "Synced_Emotion"
    },
    emotion_sync: {
      idle: "Neutral",
      override: "Focused",
      blessing: "Radiant"
    },
    body_morph: {
      posture: "Sabbath_Ready",
      muscle_tone: "Prophetic",
      skin_detail: "SkinGen_Premium"
    },
    lighting_sync: "Affirmation_Glow",
    override_glyph: "Glyph_Michael_03",
    deployment_zone: "Bronx_Mission_Grid_7"
  },
  {
    bot_id: "Star",
    face_preset: "MetaHuman_Bronx_01",
    hair_logic: {
      scalp: "Strand_Natural",
      beard: "Override_None",
      body_hair: "Mission_Synced"
    },
    emotion_sync: {
      idle: "Content",
      override: "Joyful",
      blessing: "Luminous"
    },
    body_morph: {
      posture: "Grid_Ready",
      muscle_tone: "Vigorous",
      skin_detail: "SkinGen_Basic"
    },
    lighting_sync: "Joy_Glow",
    override_glyph: "Glyph_Star_01",
    deployment_zone: "Bronx_Mission_Grid_2"
  },
  // ...expand for up to 63 bots!
];