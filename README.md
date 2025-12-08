# MTI6-GTADWIY-Cockpit

Daniel Richardson's sovereign cockpit — real-time trading, AI-powered bots, override control, emotional overlays, milestone logging, and spiritual presence.

## 🚀 Features

### Screens
- **🌍 Globe Screen**: Interactive 3D electric globe visualization using Three.js
- **📊 Trading Screen**: Real-time trading interface inspired by Pocket Option
- **⚙️ Cockpit Dashboard**: Full control center with override management

### Components
- **EarningsOverlay**: Real-time earnings tracking
- **BusinessLocator**: Find business opportunities
- **SlideBar**: Adjustable control sliders
- **CashToggle / CoinToggle / CardToggle**: Payment method controls
- **SearchBar**: Universal search
- **M6Emblem**: Project branding
- **UserHead**: User profile display
- **DailyEarningsBar**: Progress visualization
- **AssetPanel**: Portfolio management
- **TradeExecutor**: Execute trades with validation
- **ChartEngine**: Real-time chart rendering
- **BotBorrowLogic**: Bot lending/borrowing

### API Integrations (Stubs Ready)
#### AI & Intelligence
- OpenAI (GPT models)
- TogetherAI (Open-source models)
- HuggingFace (Transformers)
- Replicate (ML models)
- Face++ (Facial recognition)

#### Cryptocurrency & Markets
- CoinGecko (Market data)
- CoinMarketCap (Rankings)
- Nomics (Historical data)
- Binance (Trading)
- Etherscan (Ethereum blockchain)

#### Social & Sentiment
- Reddit (Discussions)
- LunarCrush (Social metrics)
- Santiment (On-chain analytics)
- CryptoPanic (News aggregation)

### Logic Systems
- **overrideLogic.js**: Sovereign control and permissions
- **realtime.js**: Real-time data streams
- **businessRules.js**: Trading rules and validation

### Bots
- **MainBot**: Orchestrates all operations
- **StarBot**: AI-powered scalping bot
- **SamsonBot**: Sentiment-focused swing trader

## 📦 Installation

Prerequisites:
- Node.js 18+ (or your preferred LTS)
- npm or yarn

Install dependencies:
```bash
npm install
```

## 🏃 Running the App

Development mode:
```bash
npm run dev
# or
npm start
```

Build for production:
```bash
npm run build
```

Run linter:
```bash
npm run lint
```

Run tests:
```bash
npm test
```

## 📁 Project Structure

```
MTI6-GTADWIY-Cockpit/
├── screens/              # Main application screens
│   ├── GlobeScreen.jsx   # 3D globe visualization
│   └── TradingScreen.jsx # Trading interface
├── components/           # Reusable UI components
│   ├── EarningsOverlay.jsx
│   ├── BusinessLocator.jsx
│   ├── SlideBar.jsx
│   ├── CashToggle.jsx
│   ├── CoinToggle.jsx
│   ├── CardToggle.jsx
│   ├── SearchBar.jsx
│   ├── M6Emblem.jsx
│   ├── UserHead.jsx
│   ├── DailyEarningsBar.jsx
│   ├── AssetPanel.jsx
│   ├── TradeExecutor.jsx
│   ├── ChartEngine.jsx
│   └── BotBorrowLogic.jsx
├── api/                  # API integration stubs
│   ├── openai.js
│   ├── togetherai.js
│   ├── huggingface.js
│   ├── replicate.js
│   ├── faceplusplus.js
│   ├── coingecko.js
│   ├── coinmarketcap.js
│   ├── nomics.js
│   ├── binance.js
│   ├── etherscan.js
│   ├── reddit.js
│   ├── lunarcrush.js
│   ├── santiment.js
│   ├── cryptopanic.js
│   └── README.md         # API documentation
├── logic/                # Business logic
│   ├── overrideLogic.js  # Control system
│   ├── realtime.js       # Real-time streams
│   └── businessRules.js  # Validation rules
├── bots/                 # Trading bots
│   ├── MainBot.js        # Main orchestrator
│   ├── StarBot.js        # AI scalping bot
│   └── SamsonBot.js      # Sentiment trader
├── assets/               # Static assets (placeholder)
├── src/                  # React application source
│   ├── App.jsx           # Router and navigation
│   └── main.jsx          # Entry point
└── README.md             # This file
```

## 🔧 Configuration

Create a `.env` file in the root directory with your API keys:

```bash
# AI APIs
OPENAI_API_KEY=your_key_here
TOGETHER_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here
REPLICATE_API_KEY=your_key_here
FACEPP_API_KEY=your_key_here
FACEPP_API_SECRET=your_secret_here

# Market Data APIs
CMC_API_KEY=your_key_here
NOMICS_API_KEY=your_key_here
BINANCE_API_KEY=your_key_here
BINANCE_API_SECRET=your_secret_here
ETHERSCAN_API_KEY=your_key_here

# Social APIs
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_secret_here
LUNARCRUSH_API_KEY=your_key_here
SANTIMENT_API_KEY=your_key_here
CRYPTOPANIC_API_KEY=your_key_here
```

See `.env.example` for a template.

## 🤖 Using the Bots

```javascript
import MainBot from './bots/MainBot.js';
import StarBot from './bots/StarBot.js';
import SamsonBot from './bots/SamsonBot.js';

// Initialize and start main bot
await MainBot.initialize();
MainBot.startMonitoring();

// Run StarBot
const starBotInstance = StarBot.start();

// Run SamsonBot
const samsonBotInstance = SamsonBot.start();

// Stop bots when done
starBotInstance.stop();
samsonBotInstance.stop();
```

## 🔐 Security

- Never commit API keys to version control
- Use environment variables for sensitive data
- All API modules are stubs - implement authentication before production use
- Validate all user inputs
- Use HTTPS for all API communications

## 📚 Documentation

- [API Documentation](./api/README.md) - Complete API reference
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute

## 🛠 Development

The project uses:
- **React 18** for UI
- **React Router** for navigation
- **Three.js** for 3D visualization
- **Vite** for building and dev server
- **ESLint** for code quality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👤 Maintainer

- Daniel Richardson (@Daniel57930)

## 🤖 Bot System

The cockpit features a comprehensive **13-bot system**: **StarBot** (the main communicator) plus **12 tribe bots** named after the Twelve Tribes of Israel. Each bot is import-safe, synchronous, and deterministic.

For complete documentation on the bot system, architecture, usage examples, and testing guidance, see **[docs/BOTS.md](./docs/BOTS.md)**.

## 📄 License

MIT (see LICENSE)

---

**Sovereign Development** | Built for real-time cockpit operations

