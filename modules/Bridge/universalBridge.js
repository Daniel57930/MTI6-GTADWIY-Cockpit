/**
 * Universal Bridge Integration - Cockpit Grade
 * Routes cross-chain transfers via Stargate, Synapse, or Orbiter with override/fallback.
 * Supports stealth toggles, emotional overlays, and real-time quoting.
 */

import { getStargateQuote, bridgeStargate } from "./stargateBridge";
import { getSynapseQuote, bridgeSynapse } from "./synapseBridge";
import { getOrbiterQuote, bridgeOrbiter } from "./orbiterBridge";
import { logTrade } from "../Money/moneyLogger";
import { setEmotionalOverlay, setStealthToggle } from "../Overlay/emotionalOverlay";

export async function bridgeFunds({ fromChain, toChain, asset, amount, wallet, overrides = {} }) {
  let quotes = [];
  try {
    // Try Stargate
    const stargate = await getStargateQuote({ fromChain, toChain, asset, amount });
    if (stargate) quotes.push({ ...stargate, bridge: "Stargate" });
  } catch (e) {}
  try {
    const synapse = await getSynapseQuote({ fromChain, toChain, asset, amount });
    if (synapse) quotes.push({ ...synapse, bridge: "Synapse" });
  } catch (e) {}
  try {
    const orbiter = await getOrbiterQuote({ fromChain, toChain, asset, amount });
    if (orbiter) quotes.push({ ...orbiter, bridge: "Orbiter" });
  } catch (e) {}

  // Sort by best quote (lowest fee or per user override)
  quotes = quotes.filter(q => !!q);
  const bestQuote = (overrides.forceBridge)
    ? quotes.find(q => q.bridge === overrides.forceBridge)
    : quotes.reduce((best, curr) => !best || curr.fee < best.fee ? curr : best, null);

  if (!bestQuote) throw new Error("No bridge quote available");

  // Emotional overlay: set mood/flags based on path (pseudo)
  const emotionalOverlay = bestQuote.fee > 5 ? "panic" : "calm";
  setEmotionalOverlay(emotionalOverlay);

  // Optional: toggle stealth mode
  if (overrides.stealth) setStealthToggle(true);

  // Route via best bridge
  let txResult;
  if (bestQuote.bridge === "Stargate")
    txResult = await bridgeStargate({ ...bestQuote, wallet });
  else if (bestQuote.bridge === "Synapse")
    txResult = await bridgeSynapse({ ...bestQuote, wallet });
  else if (bestQuote.bridge === "Orbiter")
    txResult = await bridgeOrbiter({ ...bestQuote, wallet });

  await logTrade({
    fromAsset: asset,
    toAsset: asset,
    amount,
    route: `Bridge:${bestQuote.bridge}`,
    result: txResult,
    overrideTags: [emotionalOverlay, overrides.forceBridge ? "forced" : ""].filter(Boolean)
  });

  return { ...txResult, emotionalOverlay, bridgeUsed: bestQuote.bridge };
}