/**
 * Samson Bot - Social sentiment-focused trading bot
 * Analyzes Reddit, Twitter sentiment and news
 */

import * as reddit from '../api/reddit.js';
import * as cryptopanic from '../api/cryptopanic.js';
import * as santiment from '../api/santiment.js';
import * as coingecko from '../api/coingecko.js';
import * as huggingface from '../api/huggingface.js';
import businessRules from '../logic/businessRules.js';

export const config = {
  name: 'SamsonBot',
  strategy: 'swing',
  targetAssets: ['BTC', 'ETH', 'DOGE'],
  sentimentThreshold: 0.65,
  newsCheckInterval: 300000, // 5 minutes
  socialCheckInterval: 600000 // 10 minutes
};

/**
 * Analyze social sentiment
 */
async function analyzeSocialSentiment(asset) {
  console.log(`[SamsonBot] Analyzing social sentiment for ${asset}...`);

  try {
    // Get Reddit posts
    const redditData = await reddit.getHotPosts(asset, 25);
    
    // Get news
    const newsData = await cryptopanic.getPosts({
      currencies: asset,
      filter: 'rising'
    });

    // Get Santiment metrics
    const santimentData = await santiment.getSentimentMetrics(asset.toLowerCase());

    // Aggregate sentiment
    const sentiment = {
      reddit: 0.5,
      news: 0.5,
      onchain: santimentData.data?.sentiment || 0.5,
      overall: 0.5
    };

    // Calculate overall sentiment
    sentiment.overall = (sentiment.reddit + sentiment.news + sentiment.onchain) / 3;

    return sentiment;
  } catch (error) {
    console.error(`[SamsonBot] Sentiment analysis error:`, error);
    return {
      overall: 0.5,
      error: error.message
    };
  }
}

/**
 * Analyze news sentiment with AI
 */
async function analyzeNewsWithAI(asset) {
  console.log(`[SamsonBot] Analyzing news for ${asset} with AI...`);

  const newsData = await cryptopanic.getPosts({
    currencies: asset,
    filter: 'hot',
    kind: 'news'
  });

  if (newsData.results && newsData.results.length > 0) {
    // Get top 5 headlines
    const headlines = newsData.results.slice(0, 5).map(n => n.title).join('. ');
    
    // Analyze with HuggingFace
    const sentiment = await huggingface.analyzeSentiment(headlines);
    
    return {
      sentiment: sentiment.label,
      score: sentiment.score,
      headlines: newsData.results.slice(0, 3)
    };
  }

  return {
    sentiment: 'NEUTRAL',
    score: 0.5,
    headlines: []
  };
}

/**
 * Make trading decision based on sentiment
 */
export async function makeDecision(asset) {
  console.log(`[SamsonBot] Making sentiment-based decision for ${asset}...`);

  try {
    // Get social sentiment
    const socialSentiment = await analyzeSocialSentiment(asset);
    
    // Get news sentiment
    const newsSentiment = await analyzeNewsWithAI(asset);
    
    // Get current price
    const priceData = await coingecko.getPrice(asset.toLowerCase());

    // Combine signals
    let action = 'hold';
    let confidence = 0.5;

    if (socialSentiment.overall > config.sentimentThreshold && 
        newsSentiment.sentiment === 'POSITIVE' &&
        newsSentiment.score > 0.7) {
      action = 'buy';
      confidence = (socialSentiment.overall + newsSentiment.score) / 2;
    } else if (socialSentiment.overall < (1 - config.sentimentThreshold) && 
               newsSentiment.sentiment === 'NEGATIVE' &&
               newsSentiment.score > 0.7) {
      action = 'sell';
      confidence = (1 - socialSentiment.overall + newsSentiment.score) / 2;
    }

    return {
      asset,
      action,
      confidence,
      socialSentiment: socialSentiment.overall,
      newsSentiment: newsSentiment.sentiment,
      newsScore: newsSentiment.score,
      price: priceData[asset.toLowerCase()]?.usd || 0
    };
  } catch (error) {
    console.error(`[SamsonBot] Decision error:`, error);
    return {
      asset,
      action: 'hold',
      confidence: 0,
      error: error.message
    };
  }
}

/**
 * Execute trade based on sentiment decision
 */
export async function executeTrade(decision) {
  if (decision.action === 'hold') {
    console.log(`[SamsonBot] Holding ${decision.asset} (low confidence)`);
    return { success: true, action: 'hold' };
  }

  const tradeParams = {
    asset: decision.asset,
    amount: 150, // Higher amount for swing trades
    type: 'market',
    direction: decision.action === 'buy' ? 'up' : 'down'
  };

  // Validate
  const validation = businessRules.validateTrade(tradeParams);
  if (!validation.valid) {
    console.error(`[SamsonBot] Trade invalid:`, validation.errors);
    return { success: false, errors: validation.errors };
  }

  console.log(`[SamsonBot] Executing ${decision.action} for ${decision.asset}`);
  console.log(`[SamsonBot] Confidence: ${(decision.confidence * 100).toFixed(1)}%`);
  
  return {
    success: true,
    action: decision.action,
    orderId: Date.now(),
    params: tradeParams,
    confidence: decision.confidence
  };
}

/**
 * Run sentiment analysis cycle
 */
export async function runCycle() {
  console.log(`[SamsonBot] Starting sentiment analysis cycle...`);

  for (const asset of config.targetAssets) {
    const decision = await makeDecision(asset);
    
    if (decision.confidence > 0.6) {
      const result = await executeTrade(decision);
      console.log(`[SamsonBot] Trade result for ${asset}:`, result);
    } else {
      console.log(`[SamsonBot] Low confidence for ${asset}, skipping trade`);
    }

    // Wait between assets
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log(`[SamsonBot] Cycle complete`);
}

/**
 * Start bot
 */
export function start() {
  console.log(`[SamsonBot] Starting sentiment trading bot...`);
  
  // Run initial cycle
  runCycle();

  // Schedule recurring cycles
  const intervalId = setInterval(runCycle, config.socialCheckInterval);

  return {
    stop: () => {
      console.log(`[SamsonBot] Stopping...`);
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
