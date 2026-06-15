'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaGallery({ items }) {
  const [open, setOpen] = useState(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    function onKey(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft' && open > 0) setOpen(open - 1);
      if (e.key === 'ArrowRight' && open < items.length - 1) setOpen(open + 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, items, close]);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 10,
      }}>
        {items.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .3, delay: Math.min(i * 0.03, 0.4) }}
            onClick={() => setOpen(i)}
            style={{
              position: 'relative', border: 'none', padding: 0,
              borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
              aspectRatio: item.aspectRatio || '16/9',
              background: 'var(--border)', outline: 'none',
            }}
            onMouseEnter={e => { const overlay = e.currentTarget.querySelector('[data-overlay]'); if (overlay) overlay.style.opacity = '1'; }}
            onMouseLeave={e => { const overlay = e.currentTarget.querySelector('[data-overlay]'); if (overlay) overlay.style.opacity = '0'; }}
          >
            <img
              src={item.src}
              alt={item.alt || ''}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div data-overlay style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(transparent 50%, rgba(0,0,0,.7))',
              opacity: 0, transition: 'opacity .2s',
              display: 'flex', alignItems: 'flex-end', padding: 12,
            }}>
              {item.caption && (
                <span style={{ fontSize: '.75rem', color: '#fff', lineHeight: 1.3, textAlign: 'left' }}>
                  {item.caption}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            onClick={close}
            style={{
              position: 'fixed', inset: 0, zIndex: 99999,
              background: 'rgba(0,0,0,.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: .9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: .9 }}
              transition={{ duration: .2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90vw', maxHeight: '90vh',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}
            >
              <img
                src={items[open].src}
                alt={items[open].alt || ''}
                style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 12, objectFit: 'contain' }}
              />
              {items[open].caption && (
                <p style={{ color: '#ccc', fontSize: '.85rem', textAlign: 'center', margin: 0 }}>
                  {items[open].caption}
                </p>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                <button
                  onClick={() => setOpen(Math.max(0, open - 1))}
                  disabled={open === 0}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)',
                    background: 'rgba(255,255,255,.1)', color: '#fff', cursor: open === 0 ? 'default' : 'pointer',
                    fontSize: '.82rem', fontFamily: 'inherit', opacity: open === 0 ? .3 : 1,
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={close}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)',
                    background: 'var(--red)', color: '#fff', cursor: 'pointer',
                    fontSize: '.82rem', fontFamily: 'inherit',
                  }}
                >
                  Close (Esc)
                </button>
                <button
                  onClick={() => setOpen(Math.min(items.length - 1, open + 1))}
                  disabled={open === items.length - 1}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)',
                    background: 'rgba(255,255,255,.1)', color: '#fff', cursor: open === items.length - 1 ? 'default' : 'pointer',
                    fontSize: '.82rem', fontFamily: 'inherit', opacity: open === items.length - 1 ? .3 : 1,
                  }}
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
