/**
 * Business Rules - Core business logic and validation
 */

/**
 * Trading rules and limits
 */
export const tradingRules = {
  minTradeAmount: 10,
  maxTradeAmount: 10000,
  maxDailyTrades: 100,
  maxPositionSize: 50000,
  allowedAssets: ['BTC', 'ETH', 'BNB', 'SOL', 'DOGE', 'ADA', 'DOT', 'MATIC'],
  riskPercentage: 2, // Max 2% risk per trade
  stopLossRequired: true
};

/**
 * Validate trade parameters
 */
export function validateTrade(tradeParams) {
  const { asset, amount, type, direction } = tradeParams;
  const errors = [];

  if (!asset || !tradingRules.allowedAssets.includes(asset)) {
    errors.push(`Invalid asset: ${asset}`);
  }

  if (!amount || amount < tradingRules.minTradeAmount) {
    errors.push(`Amount too low. Minimum: ${tradingRules.minTradeAmount}`);
  }

  if (amount > tradingRules.maxTradeAmount) {
    errors.push(`Amount too high. Maximum: ${tradingRules.maxTradeAmount}`);
  }

  if (!['market', 'limit'].includes(type)) {
    errors.push(`Invalid trade type: ${type}`);
  }

  if (!['buy', 'sell', 'up', 'down'].includes(direction)) {
    errors.push(`Invalid direction: ${direction}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Risk management rules
 */
export const riskRules = {
  maxDrawdown: 20, // Max 20% drawdown
  profitTarget: 100, // 100% profit target
  dailyLossLimit: 500, // Max $500 daily loss
  trailingStop: 5, // 5% trailing stop
  positionLimits: {
    BTC: 1.0,
    ETH: 10.0,
    BNB: 100.0,
    SOL: 500.0
  }
};

/**
 * Check if trade meets risk requirements
 */
export function checkRiskCompliance(trade, portfolio) {
  const { amount, asset } = trade;
  const currentBalance = portfolio.balance || 10000;
  const currentPosition = portfolio.positions?.[asset] || 0;

  const riskAmount = (amount * tradingRules.riskPercentage) / 100;
  const maxRisk = (currentBalance * tradingRules.riskPercentage) / 100;

  if (riskAmount > maxRisk) {
    return {
      compliant: false,
      reason: `Risk too high: ${riskAmount} exceeds ${maxRisk}`
    };
  }

  const positionLimit = riskRules.positionLimits[asset] || 0;
  if (currentPosition >= positionLimit) {
    return {
      compliant: false,
      reason: `Position limit reached for ${asset}`
    };
  }

  return {
    compliant: true,
    riskAmount,
    maxRisk
  };
}

/**
 * Bot operation rules
 */
export const botRules = {
  maxConcurrentBots: 5,
  minBotBalance: 100,
  botCooldown: 60000, // 1 minute cooldown between bot operations
  allowedStrategies: ['scalping', 'swing', 'hodl', 'arbitrage'],
  requireApproval: false
};

/**
 * Validate bot configuration
 */
export function validateBotConfig(config) {
  const { name, strategy, balance, concurrent } = config;
  const errors = [];

  if (!name || name.length < 3) {
    errors.push('Bot name too short (min 3 characters)');
  }

  if (!strategy || !botRules.allowedStrategies.includes(strategy)) {
    errors.push(`Invalid strategy. Allowed: ${botRules.allowedStrategies.join(', ')}`);
  }

  if (balance < botRules.minBotBalance) {
    errors.push(`Balance too low. Minimum: ${botRules.minBotBalance}`);
  }

  if (concurrent > botRules.maxConcurrentBots) {
    errors.push(`Too many concurrent bots. Maximum: ${botRules.maxConcurrentBots}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Earnings and withdrawal rules
 */
export const earningsRules = {
  minWithdrawal: 50,
  maxWithdrawal: 50000,
  dailyWithdrawalLimit: 10000,
  withdrawalFee: 0.01, // 1% fee
  autoCompound: true,
  reinvestPercentage: 50 // Reinvest 50% of earnings
};

/**
 * Validate withdrawal request
 */
export function validateWithdrawal(amount, dailyTotal, balance) {
  const errors = [];

  if (amount < earningsRules.minWithdrawal) {
    errors.push(`Amount too low. Minimum: ${earningsRules.minWithdrawal}`);
  }

  if (amount > earningsRules.maxWithdrawal) {
    errors.push(`Amount too high. Maximum: ${earningsRules.maxWithdrawal}`);
  }

  if (dailyTotal + amount > earningsRules.dailyWithdrawalLimit) {
    errors.push(`Daily limit exceeded. Remaining: ${earningsRules.dailyWithdrawalLimit - dailyTotal}`);
  }

  if (amount > balance) {
    errors.push(`Insufficient balance: ${balance}`);
  }

  const fee = amount * earningsRules.withdrawalFee;
  const netAmount = amount - fee;

  return {
    valid: errors.length === 0,
    errors,
    fee,
    netAmount
  };
}

export default {
  tradingRules,
  validateTrade,
  riskRules,
  checkRiskCompliance,
  botRules,
  validateBotConfig,
  earningsRules,
  validateWithdrawal
};
