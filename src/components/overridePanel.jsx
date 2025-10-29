import React, { useEffect, useState, Suspense, lazy } from 'react';

const AdvancedSettings = lazy(() => import('./AdvancedSettings').catch(() => ({ default: () => null })));

function Loader({ message = 'Loading…' }) {
  return (
    <div style={{ padding: 12, textAlign: 'center' }}>
      <small>{message}</small>
    </div>
  );
}

export default function OverridePanel({ onClose }) {
  const [settings, setSettings] = useState({ enabled: true, level: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const raw = localStorage.getItem('overridePanel.settings');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (mounted) setSettings(parsed);
        } else {
          const res = await fetch('/api/settings/overridePanel').then(r => r.ok ? r.json() : null).catch(() => null);
          if (res && mounted) setSettings(res);
        }
      } catch (err) {
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  function save(newSettings) {
    setSettings(newSettings);
    try {
      localStorage.setItem('overridePanel.settings', JSON.stringify(newSettings));
    } catch (err) {
    }
    fetch('/api/settings/overridePanel', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSettings) }).catch(() => {});
  }

  if (loading) return <Loader message="Loading override panel…" />;
  if (error) return (
    <div style={{ padding: 12 }}>
      <div style={{ color: 'crimson' }}>Error loading override panel: {error}</div>
      <button onClick={() => { setError(null); setLoading(true); window.location.reload(); }}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: 16, width: 360 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Override Panel</h3>
        <button onClick={onClose} aria-label="Close">✕</button>
      </header>

      <section style={{ marginTop: 12 }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={!!settings.enabled}
            onChange={e => save({ ...settings, enabled: e.target.checked })}
          />
          <span>Enabled</span>
        </label>

        <label style={{ display: 'block', marginTop: 12 }}>
          <div style={{ fontSize: 12, color: '#666' }}>Level</div>
          <input
            type="range"
            min={0}
            max={10}
            value={settings.level}
            onChange={e => save({ ...settings, level: Number(e.target.value) })}
          />
          <div style={{ fontSize: 12 }}>{settings.level}</div>
        </label>
      </section>

      <Suspense fallback={<Loader message="Loading advanced settings…" />}> 
        <AdvancedSettings settings={settings} onChange={save} />
      </Suspense>

      <footer style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button onClick={() => save({ enabled: false, level: 0 })}>Reset</button>
        <button onClick={() => fetch('/api/settings/overridePanel/apply', { method: 'POST' }).catch(() => {})}>Apply</button>
      </footer>
    </div>
  );
}