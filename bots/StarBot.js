/**
 * Star Bot - Advanced AI-powered trading bot
 * Uses multiple AI APIs for decision making
 */

import * as openai from '../api/openai.js';
import * as huggingface from '../api/huggingface.js';
import * as coingecko from '../api/coingecko.js';
import * as lunarcrush from '../api/lunarcrush.js';
import businessRules from '../logic/businessRules.js';

export const config = {
  name: 'StarBot',
  strategy: 'scalping',
  targetAssets: ['BTC', 'ETH', 'SOL'],
  tradeInterval: 60000, // 1 minute
  riskLevel: 'moderate',
  aiEnabled: true
};

/**
 * Analyze using AI
 */
async function analyzeWithAI(asset, marketData) {
  console.log(`[StarBot] Analyzing ${asset} with AI...`);

  const prompt = `
    Analyze cryptocurrency ${asset} based on:
    - Current price: ${marketData.price}
    - 24h change: ${marketData.change}%
    - Social sentiment: ${marketData.sentiment}
    
    Should I buy, sell, or hold? Provide reasoning.
  `;

  const aiDecision = await openai.generateCompletion(prompt, {
    temperature: 0.3,
    maxTokens: 200
  });

  // Also get sentiment analysis
  const sentiment = await huggingface.analyzeSentiment(
    `${asset} cryptocurrency market news and social media posts`
  );

  return {
    decision: aiDecision.text,
    sentiment: sentiment.label,
    confidence: sentiment.score
  };
}

/**
 * Make trading decision
 */
export async function makeDecision(asset) {
  console.log(`[StarBot] Making decision for ${asset}...`);

  try {
    // Gather market data
    const price = await coingecko.getPrice(asset.toLowerCase());
    const social = await lunarcrush.getAssetMetrics(asset);

    const marketData = {
      price: price[asset.toLowerCase()]?.usd || 0,
      change: price[asset.toLowerCase()]?.usd_24h_change || 0,
      sentiment: social.data?.social_score || 50
    };

    // Get AI analysis
    const analysis = await analyzeWithAI(asset, marketData);

    // Determine action
    let action = 'hold';
    if (analysis.sentiment === 'POSITIVE' && analysis.confidence > 0.8) {
      action = 'buy';
    } else if (analysis.sentiment === 'NEGATIVE' && analysis.confidence > 0.8) {
      action = 'sell';
    }

    return {
      asset,
      action,
      confidence: analysis.confidence,
      reasoning: analysis.decision,
      marketData
    };
  } catch (error) {
    console.error(`[StarBot] Decision error:`, error);
    return {
      asset,
      action: 'hold',
      confidence: 0,
      error: error.message
    };
  }
}

/**
 * Execute trading strategy
 */
export async function executeTrade(decision) {
  if (decision.action === 'hold') {
    console.log(`[StarBot] Holding ${decision.asset}`);
    return { success: true, action: 'hold' };
  }

  const tradeParams = {
    asset: decision.asset,
    amount: 100,
    type: 'market',
    direction: decision.action === 'buy' ? 'up' : 'down'
  };

  // Validate before executing
  const validation = businessRules.validateTrade(tradeParams);
  if (!validation.valid) {
    console.error(`[StarBot] Trade invalid:`, validation.errors);
    return { success: false, errors: validation.errors };
  }

  console.log(`[StarBot] Executing ${decision.action} for ${decision.asset}`);
  
  // Simulate trade execution
  return {
    success: true,
    action: decision.action,
    orderId: Date.now(),
    params: tradeParams,
    confidence: decision.confidence
  };
}

/**
 * Run bot cycle
 */
export async function runCycle() {
  console.log(`[StarBot] Starting trading cycle...`);

  for (const asset of config.targetAssets) {
    const decision = await makeDecision(asset);
    
    if (decision.action !== 'hold') {
      const result = await executeTrade(decision);
      console.log(`[StarBot] Trade result for ${asset}:`, result);
    }

    // Wait between assets to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`[StarBot] Cycle complete`);
}

/**
 * Start bot
 */
export function start() {
  console.log(`[StarBot] Starting with strategy: ${config.strategy}`);
  
  // Run initial cycle
  runCycle();

  // Schedule recurring cycles
  const intervalId = setInterval(runCycle, config.tradeInterval);

  return {
    stop: () => {
      console.log(`[StarBot] Stopping...`);
      clearInterval(intervalId);
    }
  };
}

export default {
  config,
  makeDecision,
  executeTrade,
  runCycle,
  start
};
