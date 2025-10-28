# Brave Integration

This document describes the Brave Browser integration for the GTADWIY Cockpit, including BAT token earnings, privacy features, and trading bot synchronization.

## Overview

The Brave integration provides:
- **BAT Token Tracking**: Monitor Basic Attention Token earnings from Brave Rewards
- **Privacy Logging**: Track onion-routing and privacy shield events
- **Security Sync**: Synchronize Brave security settings with the cockpit
- **Bot Allocation**: Map BAT earnings to trading bot accounts

## Quick Start

### 1. Build the Asset Registry

Before using the Brave integration, build the unified asset registry:

```bash
node src/scripts/indexAssets.js
```

This merges `assets.json` and `tokens.json` into `assetRegistry.json`, which includes BAT token metadata.

### 2. Import Brave Integration

```javascript
import { 
  batFetcher, 
  onionLogger, 
  securitySync, 
  mapEarningsToBots 
} from './integrations/brave';
```

### 3. Fetch BAT Earnings

```javascript
const walletAddress = "0x..."; // Your Brave Rewards wallet
const earnings = await batFetcher(walletAddress);

console.log(`Current BAT balance: ${earnings.balance}`);
console.log(`Earnings this month: ${earnings.earnings.thisMonth}`);
```

### 4. Map Earnings to Bots

```javascript
const bots = [
  { id: "bot-1", name: "Arbitrage Bot" },
  { id: "bot-2", name: "DCA Bot" }
];

const allocation = mapEarningsToBots(earnings, bots);
console.log("BAT allocated to bots:", allocation);
```

## Components

### Search Components

- **TopSearchBar** (`src/components/TopSearchBar.jsx`): Simple search bar for the header
- **GlobalSearchBar** (`src/components/GlobalSearchBar.jsx`): Enhanced search with autocomplete

### Layout

- **MainLayout** (`src/layouts/MainLayout.jsx`): Primary cockpit layout with integrated search

### Visualization

- **GTAdwiyTerrain** (`src/components/GTAdwiyTerrain.jsx`): 3D map visualization for mission zones

## Data Files

### assets.json
Registry of assets including BAT, BTC, ETH with metadata and component mappings.

### tokens.json
Token list with BAT, BTC, ETH, USDT, USDC including contract addresses and verification status.

### assetRegistry.json (generated)
Unified registry created by `indexAssets.js` - do not edit manually.

## API Reference

### batFetcher(walletAddress)
Fetches BAT balance and earnings for a Brave Rewards wallet.

**Parameters:**
- `walletAddress` (string): Brave Rewards wallet address

**Returns:** Promise<Object>
- `balance` (number): Current BAT balance
- `earnings` (object): Earnings breakdown (today, thisWeek, thisMonth)
- `walletAddress` (string): Wallet address
- `lastUpdated` (string): ISO timestamp

### onionLogger(event, data)
Logs privacy and onion-routing events.

**Parameters:**
- `event` (string): Event type
- `data` (object): Event metadata

**Returns:** Object - Log entry with timestamp

### securitySync(securityConfig)
Synchronizes Brave security settings with the cockpit.

**Parameters:**
- `securityConfig` (object): Security configuration overrides

**Returns:** Object
- `success` (boolean): Sync status
- `config` (object): Merged security configuration
- `syncedAt` (string): ISO timestamp

### mapEarningsToBots(earnings, bots)
Allocates BAT earnings across trading bots.

**Parameters:**
- `earnings` (object): Earnings data from batFetcher
- `bots` (array): Bot configurations

**Returns:** Object
- `totalBAT` (number): Total BAT to allocate
- `allocations` (array): Per-bot allocations
- `mappedAt` (string): ISO timestamp

## Security Considerations

⚠️ **Important**: Never commit wallet addresses, private keys, or API secrets to source control.

- Use environment variables for sensitive data (`.env` file)
- Keep `.env` in `.gitignore`
- Use the `.env.example` template for documentation
- Validate all wallet addresses before use
- Enable Brave Shields for maximum privacy

## Next Steps

1. **Wire Search into Layout**: Integrate TopSearchBar and GlobalSearchBar into the main App.jsx
2. **Connect BAT Fetcher**: Add your actual Brave Rewards wallet address
3. **Configure Bots**: Define your trading bot configurations
4. **Test Asset Registry**: Verify `node src/scripts/indexAssets.js` runs successfully
5. **Implement Real API**: Replace simulated BAT fetcher with actual Brave API calls

## Troubleshooting

### Asset Registry Build Fails
- Ensure `src/data/assets.json` and `src/data/tokens.json` exist
- Check JSON syntax is valid
- Verify Node.js version is 14+ (for ES modules)

### BAT Fetcher Returns No Data
- Verify wallet address format
- Check Brave Rewards is enabled in browser
- Ensure wallet is verified and funded

### Search Components Not Rendering
- Verify React imports are correct
- Check component is exported as default
- Ensure parent component passes required props

## Contributing

When extending the Brave integration:
1. Follow existing code patterns
2. Update this documentation
3. Add tests if test infrastructure exists
4. Do not commit secrets or wallet addresses
5. Use the indexAssets script to update the registry

---

*Last updated: 2025-10-28*  
*GTADWIY Cockpit - Brave Integration Module*
