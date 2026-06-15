'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shortcuts = [
  { key: 'H', desc: 'Go to Home' },
  { key: '?', desc: 'Toggle this menu' },
  { key: 'T', desc: 'Toggle theme' },
  { key: 'L', desc: 'Open language switcher' },
  { key: 'Esc', desc: 'Close menus / modals' },
  { key: '↑↓', desc: 'Navigate context menu' },
  { key: '⌘C', desc: 'Copy page link' },
];

export default function ShortcutsModal() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((p) => !p), []);

  useEffect(() => {
    function handler(e) {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.target.closest('input,textarea,button')) {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, toggle]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99998,
              background: 'rgba(0,0,0,.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                borderRadius: 16, padding: '28px 32px',
                maxWidth: 380, width: '100%',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Keyboard Shortcuts</h3>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'transparent', border: 'none', color: 'var(--text-muted)',
                    cursor: 'pointer', fontSize: '1.2rem', padding: 4,
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {shortcuts.map((s) => (
                  <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <span style={{ fontSize: '.82rem', color: 'var(--text-secondary)' }}>{s.desc}</span>
                    <kbd style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      padding: '2px 8px', borderRadius: 6,
                      background: 'var(--bg)', border: '1px solid var(--border)',
                      fontSize: '.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                      color: 'var(--text-muted)', minWidth: 28, textAlign: 'center',
                    }}>
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
