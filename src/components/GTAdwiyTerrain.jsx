import React, { useEffect, useRef, useState } from 'react';

function Loader({ message = 'Loading terrain…' }) {
  return (
    <div style={{ padding: 12, textAlign: 'center' }}>
      <small>{message}</small>
    </div>
  );
}

export default function GTAdwiyTerrain({ seed = 0, detail = 'medium' }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState({ loading: true, error: null, ready: false });
  const rendererRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function init() {
      setStatus({ loading: true, error: null, ready: false });
      try {
        const mod = await import(/* webpackChunkName: "terrain-renderer" */ './terrainRenderer').catch(() => null);
        if (!mounted) return;

        if (mod && mod.createRenderer) {
          rendererRef.current = mod.createRenderer(containerRef.current, { seed, detail });
          setStatus({ loading: false, error: null, ready: true });
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = containerRef.current.clientWidth || 600;
        canvas.height = containerRef.current.clientHeight || 400;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#3a9';
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const w = 2 + Math.random() * 4;
          const h = 2 + Math.random() * 6;
          ctx.fillRect(x, y, w, h);
        }
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(canvas);
        setStatus({ loading: false, error: null, ready: true });
      } catch (err) {
        if (!mounted) return;
        setStatus({ loading: false, error: String(err), ready: false });
      }
    }

    init();

    return () => {
      mounted = false;
      try {
        if (rendererRef.current && rendererRef.current.dispose) rendererRef.current.dispose();
      } catch (_) {}
    };
  }, [seed, detail]);

  if (status.loading) return <Loader />;
  if (status.error) return (
    <div style={{ padding: 12 }}>
      <div style={{ color: 'crimson' }}>Terrain failed to load: {String(status.error)}</div>
    </div>
  );

  return (
    <div ref={containerRef} style={{ width: '100%', height: 320, background: '#111' }} aria-hidden={status.ready ? 'false' : 'true'} />
  );
}