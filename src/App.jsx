import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import GlobeScreen from '../screens/GlobeScreen.jsx';
import TradingScreen from '../screens/TradingScreen.jsx';
import EarningsOverlay from '../components/EarningsOverlay.jsx';
import M6Emblem from '../components/M6Emblem.jsx';
import UserHead from '../components/UserHead.jsx';
import SearchBar from '../components/SearchBar.jsx';

/**
 * Navigation component
 */
function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: 'rgba(0, 0, 0, 0.9)',
      borderBottom: '1px solid rgba(0, 255, 136, 0.3)',
      color: '#fff'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <M6Emblem size={48} />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>MTI6-GTADWIY</h1>
            <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.6 }}>Sovereign Cockpit</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link
            to="/"
            style={{
              padding: '0.5rem 1rem',
              background: isActive('/') ? '#00ff88' : 'transparent',
              color: isActive('/') ? '#000' : '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            🌍 Globe
          </Link>
          <Link
            to="/trading"
            style={{
              padding: '0.5rem 1rem',
              background: isActive('/trading') ? '#00ff88' : 'transparent',
              color: isActive('/trading') ? '#000' : '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            📊 Trading
          </Link>
          <Link
            to="/cockpit"
            style={{
              padding: '0.5rem 1rem',
              background: isActive('/cockpit') ? '#00ff88' : 'transparent',
              color: isActive('/cockpit') ? '#000' : '#fff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            ⚙️ Cockpit
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '300px' }}>
          <SearchBar placeholder="Search cockpit..." />
        </div>
        <UserHead username="Sovereign" status="online" />
      </div>
    </nav>
  );
}

/**
 * Cockpit Dashboard (Original App content)
 */
function CockpitDashboard() {
  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      minHeight: 'calc(100vh - 80px)',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
          Dashboard Overview
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Quick stats */}
          <div style={{
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 255, 136, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              Total Balance
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00ff88' }}>
              $10,247.83
            </div>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 170, 255, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              Active Bots
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00aaff' }}>
              3
            </div>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 215, 0, 0.2)'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              24h Profit
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>
              +$247.83
            </div>
          </div>
        </div>

        <div style={{
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            🚀 Cockpit Features
          </h3>
          <p style={{ opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            Navigate to different screens using the menu above to access Globe visualization,
            Trading interface, and full Cockpit controls with override management.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Main App Component with Router
 */
export default function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#000' }}>
        <Navigation />
        <EarningsOverlay />
        
        <Routes>
          <Route path="/" element={<GlobeScreen />} />
          <Route path="/trading" element={<TradingScreen />} />
          <Route path="/cockpit" element={<CockpitDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
