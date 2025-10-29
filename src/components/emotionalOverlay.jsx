import React, { useEffect, useRef } from 'react';

const EMOTION_COLORS = {
  happy: 'rgba(255,214,94,0.18)',
  sad: 'rgba(94,162,255,0.12)',
  angry: 'rgba(255,94,94,0.12)',
  calm: 'rgba(94,255,180,0.08)',
  neutral: 'rgba(0,0,0,0.0)'
};

export default function EmotionalOverlay({ emotion = 'neutral', intensity = 0.5 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = 'background-color 350ms ease, opacity 350ms ease';
    const base = EMOTION_COLORS[emotion] || EMOTION_COLORS.neutral;

    const opacity = Math.max(0, Math.min(1, intensity));
    el.style.backgroundColor = base;
    el.style.opacity = String(opacity);
  }, [emotion, intensity]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
        transition: 'opacity 350ms ease',
      }}
    />
  );
}