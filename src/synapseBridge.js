/**
 * Synapse Protocol API Integration
 * Docs: https://docs.synapseprotocol.com/
 */
export async function getSynapseQuote({ fromChain, toChain, asset, amount }) {
  // TODO: Implement REST API call to Synapse for quote
  // Example (pseudo): fetch('https://api.synapseprotocol.com/quote', { ... })
  return { fee: 2.8, min: 1, max: 60000, bridge: "Synapse" }; // pseudo
}
export async function bridgeSynapse({ fromChain, toChain, asset, amount, wallet }) {
  // TODO: Implement transfer call
  return { ok: true, tx: "0xSYNAPSE" };
}