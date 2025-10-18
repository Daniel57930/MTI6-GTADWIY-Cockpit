import { ethers } from "ethers";

export function parseAmount(amountStr, decimals = 18) {
  return ethers.utils.parseUnits(amountStr || "0", decimals).toString();
}

export function formatAmount(amountBigNumberOrString, decimals = 18) {
  try {
    return ethers.utils.formatUnits(amountBigNumberOrString.toString(), decimals);
  } catch (e) {
    return String(amountBigNumberOrString);
  }
}

export function tokenDecimalsMap() {
  // Add common token decimals here or wire into onchain lookup
  return {
    ETH: 18,
    WETH: 18,
    USDC: 6,
    DAI: 18
  };
}