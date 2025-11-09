# MTI6-GTADWIY Cockpit API Documentation

## Overview

This directory contains API integration stubs for various AI, blockchain, and market data services. Each API module is designed to be modular and easily extendable for real-time cockpit operations.

## API Categories

### 🤖 AI & Intelligence APIs

#### OpenAI (`openai.js`)
- **Purpose**: GPT models and text completions
- **Key Functions**: `generateCompletion()`, `generateChat()`
- **Env Variable**: `OPENAI_API_KEY`

#### TogetherAI (`togetherai.js`)
- **Purpose**: Open-source model inference
- **Key Functions**: `generateInference()`, `listModels()`
- **Env Variable**: `TOGETHER_API_KEY`

#### HuggingFace (`huggingface.js`)
- **Purpose**: Transformer models and NLP
- **Key Functions**: `runInference()`, `generateText()`, `analyzeSentiment()`
- **Env Variable**: `HUGGINGFACE_API_KEY`

#### Replicate (`replicate.js`)
- **Purpose**: Run ML models via API
- **Key Functions**: `runPrediction()`, `getPrediction()`
- **Env Variable**: `REPLICATE_API_KEY`

#### Face++ (`faceplusplus.js`)
- **Purpose**: Facial recognition and analysis
- **Key Functions**: `detectFaces()`, `compareFaces()`, `analyzeFace()`
- **Env Variables**: `FACEPP_API_KEY`, `FACEPP_API_SECRET`

---

### 💰 Cryptocurrency Market APIs

#### CoinGecko (`coingecko.js`)
- **Purpose**: Comprehensive crypto market data
- **Key Functions**: `getPrice()`, `getMarketChart()`, `getTrending()`
- **Note**: No API key required for basic endpoints

#### CoinMarketCap (`coinmarketcap.js`)
- **Purpose**: Market rankings and quotes
- **Key Functions**: `getListings()`, `getQuote()`, `getGlobalMetrics()`
- **Env Variable**: `CMC_API_KEY`

#### Nomics (`nomics.js`)
- **Purpose**: Historical price data
- **Key Functions**: `getCurrencies()`, `getMarketCapHistory()`
- **Env Variable**: `NOMICS_API_KEY`

#### Binance (`binance.js`)
- **Purpose**: Trading and market data
- **Key Functions**: `getTickerPrice()`, `getKlines()`, `placeOrder()`
- **Env Variables**: `BINANCE_API_KEY`, `BINANCE_API_SECRET`

#### Etherscan (`etherscan.js`)
- **Purpose**: Ethereum blockchain data
- **Key Functions**: `getBalance()`, `getTransactions()`, `getGasPrice()`
- **Env Variable**: `ETHERSCAN_API_KEY`

---

### 📊 Social & Sentiment APIs

#### Reddit (`reddit.js`)
- **Purpose**: Social discussions and sentiment
- **Key Functions**: `getHotPosts()`, `searchPosts()`, `getComments()`
- **Env Variables**: `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`

#### LunarCrush (`lunarcrush.js`)
- **Purpose**: Social metrics for crypto
- **Key Functions**: `getAssetMetrics()`, `getSocialMetrics()`
- **Env Variable**: `LUNARCRUSH_API_KEY`

#### Santiment (`santiment.js`)
- **Purpose**: On-chain and social analytics
- **Key Functions**: `getSocialVolume()`, `getDevelopmentActivity()`
- **Env Variable**: `SANTIMENT_API_KEY`

#### CryptoPanic (`cryptopanic.js`)
- **Purpose**: Crypto news aggregation
- **Key Functions**: `getPosts()`, `searchNews()`
- **Env Variable**: `CRYPTOPANIC_API_KEY`

---

## Setup

### Environment Variables

Create a `.env` file in the project root with your API keys:

```bash
# AI APIs
OPENAI_API_KEY=your_openai_key
TOGETHER_API_KEY=your_together_key
HUGGINGFACE_API_KEY=your_huggingface_key
REPLICATE_API_KEY=your_replicate_key
FACEPP_API_KEY=your_facepp_key
FACEPP_API_SECRET=your_facepp_secret

# Market Data APIs
CMC_API_KEY=your_coinmarketcap_key
NOMICS_API_KEY=your_nomics_key
BINANCE_API_KEY=your_binance_key
BINANCE_API_SECRET=your_binance_secret
ETHERSCAN_API_KEY=your_etherscan_key

# Social APIs
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
LUNARCRUSH_API_KEY=your_lunarcrush_key
SANTIMENT_API_KEY=your_santiment_key
CRYPTOPANIC_API_KEY=your_cryptopanic_key
```

### Usage Example

```javascript
import * as openai from './api/openai.js';
import * as coingecko from './api/coingecko.js';

// Generate AI completion
const completion = await openai.generateCompletion('What is Bitcoin?');

// Get crypto price
const price = await coingecko.getPrice('bitcoin', ['usd']);
```

## Implementation Status

⚠️ **All APIs are currently STUBS**. Each function logs the operation and returns mock data. To use these APIs in production:

1. Implement actual HTTP requests using `fetch` or `axios`
2. Add proper authentication headers
3. Handle rate limiting and errors
4. Parse and validate API responses
5. Add retry logic for failed requests

## Extension

To add a new API:

1. Create a new file in `/api/` (e.g., `newapi.js`)
2. Export functions following the naming convention
3. Document the API in this README
4. Add environment variables to `.env.example`
5. Update bot integrations in `/bots/` as needed

## Security

- **Never commit API keys** to version control
- Use environment variables for all sensitive data
- Implement rate limiting to avoid API abuse
- Use HTTPS for all API communications
- Validate and sanitize all API responses

## Rate Limits

Each API has different rate limits. Refer to their official documentation:

- [OpenAI Docs](https://platform.openai.com/docs)
- [CoinGecko Docs](https://www.coingecko.com/en/api/documentation)
- [Binance Docs](https://binance-docs.github.io/apidocs/)
- And others...

## Support

For issues or questions about API integrations, open an issue on GitHub or consult the respective API's official documentation.

---

**Sovereign Development** | MTI6-GTADWIY Cockpit
