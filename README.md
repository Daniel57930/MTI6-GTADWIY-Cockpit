[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Daniel57930/MTI6-GTADWIY-Cockpit)
[![Vercel Status](https://vercelbadge.vercel.app/api/Daniel57930/MTI6-GTADWIY-Cockpit)](https://vercel.com/Daniel57930/MTI6-GTADWIY-Cockpit)

# MTI6-GTADWIY-Cockpit

Daniel Richardson’s sovereign cockpit—override control, emotional overlays, milestone logging, stealth trading flows, and spiritual presence.

---

## 🚀 Modernized React + Vite Cockpit

This cockpit UI has been refactored from legacy code to a modular **React + Vite** architecture for faster dev cycles, override-ready expansion, and mission-based panel logic.

### Key Features
- Centralized command in `App.jsx`
- Modular overlays: `BlessingOverlay`, `EmotionalOverlay`, `OverridePanel`
- Syncs dark theme via `cockpit.css` (BEM-style classes)
- Real-time preview: `npm run dev`
- GTADWIY mission logic: blessings, emotional states, override toggles, wallet sync

---

## 🛠️ Local Setup & Contribution

1. **Clone & Install**
   ```bash
   git clone https://github.com/Daniel57930/MTI6-GTADWIY-Cockpit.git
   cd MTI6-GTADWIY-Cockpit
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```
   - Preview the cockpit at `http://localhost:5173`
   - Confirm overlays, panels, and wallet logic render correctly

3. **Sync/Expand Modules**
   - To add new panels, create a React component and register it in `App.jsx`.
   - To sync bots or modules, use the exposed props/state hooks.
   - For emotional overlays, test responsiveness to wallet, override, and mission state changes.

4. **Style**
   - All cockpit styles are in `cockpit.css`, following BEM conventions.
   - Ensure dark theme and overlay visuals match mission emotional states.

---

## 🔁 GTADWIY Module Sync

- **BlessingOverlay:** Logs blessings with timestamps; syncs with legacy tracker.
- **EmotionalOverlay:** Responds to override toggles, wallet status, and mission progress.
- **OverridePanel:** Manual override logic, stealth toggles, fallback loaders.

---

## 🧠 Strategic Expansion

Now that the cockpit is modular, start building panels for each town in the GTADWIY map:
- **Mission status**
- **Local override logic**
- **Emotional sync indicators**
- **Bot deployment zones**

Add panels like `MissionTracker`, `ProphecySync`, or `BotPresence` in `App.jsx` and expand as the mission grows.

---

## 📝 Milestones

Track major UI leaps by tagging milestones (e.g. `Bronx Sovereignty UI Refactor`, `Override Sync Phase`). See the milestone tracker for details.

---

## 🤖 Bots & Automation

- Bots can sync or update modules via standard React props/state.
- For contributors: ensure modules are compatible with override and emotional logic hooks.

---

## License

MIT