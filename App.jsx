import React, { useState } from "react";
import ScreenSelector from "./modules/Shared/ScreenSelector";
import GlobeScreen from "./modules/Globe/GlobeScreen";
import TradingPlatform from "./modules/Trading/TradingPlatform";
import StakingScreen from "./modules/Staking/StakingScreen";
import FarmingScreen from "./modules/Farming/FarmingScreen";
import MiningScreen from "./modules/Mining/MiningScreen";
import StoreScreen from "./modules/Store/StoreScreen";
import GTADWIYGlobeScreen from "./modules/GTADWIY/GTADWIYGlobeScreen";

export default function App() {
  const [screen, setScreen] = useState("globe");

  return (
    <div style={{ minHeight: "100vh", background: "#10102a" }}>
      {screen === "globe" && <GlobeScreen onSelectScreen={setScreen} />}
      {screen === "trading" && <><ScreenSelector value={screen} onSelect={setScreen} /><TradingPlatform /></>}
      {screen === "staking" && <><ScreenSelector value={screen} onSelect={setScreen} /><StakingScreen /></>}
      {screen === "farming" && <><ScreenSelector value={screen} onSelect={setScreen} /><FarmingScreen /></>}
      {screen === "mining" && <><ScreenSelector value={screen} onSelect={setScreen} /><MiningScreen /></>}
      {screen === "store" && <><ScreenSelector value={screen} onSelect={setScreen} /><StoreScreen /></>}
      {screen === "gtadwiy" && <><ScreenSelector value={screen} onSelect={setScreen} /><GTADWIYGlobeScreen /></>}
    </div>
  );
}
