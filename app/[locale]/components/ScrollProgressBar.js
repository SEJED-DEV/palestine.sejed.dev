'use client';
import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight * 100, 100) : 0);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 64, left: 0, right: 0, zIndex: 999,
      height: 2, background: 'transparent',
    }}>
      <div style={{
        height: '100%', width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--red), var(--gold))',
        transition: 'width .05s linear',
        borderRadius: '0 1px 1px 0',
      }} />
    </div>
  );
}
