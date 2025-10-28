#!/usr/bin/env node

/**
 * indexAssets.js - Asset Registry Builder
 * 
 * Merges assets.json and tokens.json into a unified assetRegistry.json
 * for use across the GTADWIY cockpit and Brave integration.
 * 
 * Usage: node src/scripts/indexAssets.js
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, "..", "data");
const assetsPath = join(dataDir, "assets.json");
const tokensPath = join(dataDir, "tokens.json");
const outputPath = join(dataDir, "assetRegistry.json");

function loadJSON(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    return null;
  }
}

function mergeAssets() {
  console.log("Loading asset data...");
  const assetsData = loadJSON(assetsPath);
  const tokensData = loadJSON(tokensPath);

  if (!assetsData || !tokensData) {
    console.error("Failed to load asset or token data");
    process.exit(1);
  }

  const assets = assetsData.assets || [];
  const tokens = tokensData.tokens || [];
  const components = assetsData.components || {};

  // Merge tokens into assets, avoiding duplicates
  const assetIds = new Set(assets.map(a => a.id));
  const newTokens = tokens.filter(t => !assetIds.has(t.id));

  const registry = {
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    assets: [...assets, ...newTokens],
    components,
    stats: {
      totalAssets: assets.length + newTokens.length,
      fromAssets: assets.length,
      fromTokens: newTokens.length,
      components: Object.keys(components).length
    }
  };

  console.log(`Merged ${assets.length} assets and ${newTokens.length} tokens`);
  console.log(`Total registry entries: ${registry.stats.totalAssets}`);

  // Write the registry
  try {
    writeFileSync(outputPath, JSON.stringify(registry, null, 2), "utf8");
    console.log(`✓ Asset registry written to ${outputPath}`);
  } catch (error) {
    console.error("Error writing registry:", error.message);
    process.exit(1);
  }
}

// Run the merge
mergeAssets();
