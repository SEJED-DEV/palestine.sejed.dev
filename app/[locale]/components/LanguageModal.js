'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PalestineLogo from './PalestineLogo';

const locales = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'French', native: 'Français', dir: 'ltr' },
  { code: 'he', label: 'Hebrew', native: 'עברית', dir: 'rtl' },
];

const STORAGE_KEY = 'palestine-locale';

export default function LanguageModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setShow(true);
    }
  }, []);

  function selectLocale(code) {
    localStorage.setItem(STORAGE_KEY, code);
    setShow(false);
    const segments = window.location.pathname.split('/').filter(Boolean);
    const rest = segments.length > 1 ? '/' + segments.slice(1).join('/') : '';
    window.location.href = '/' + code + rest;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            style={modalStyle}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div style={flagStripStyle}>
              <span style={{ ...flagBar, background: '#e4312b' }} />
              <span style={{ ...flagBar, background: '#fff' }} />
              <span style={{ ...flagBar, background: '#149954' }} />
            </div>

            <div style={{ padding: '40px 48px 48px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <PalestineLogo variant="vertical" />
              </div>

              <h2 style={titleStyle}>Choose Your Language</h2>
              <p style={subtitleStyle}>
                This site is available in four languages. Select your preferred language to continue.
              </p>

              <div style={gridStyle}>
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => selectLocale(l.code)}
                    style={cardStyle}
                    dir={l.dir}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(228,49,43,0.4)';
                      e.currentTarget.style.background = 'rgba(228,49,43,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    <span style={codeStyle}>{l.code.toUpperCase()}</span>
                    <span style={nativeStyle}>{l.native}</span>
                    <span style={labelStyle}>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 999999,
  background: 'rgba(0,0,0,.7)',
  backdropFilter: 'blur(16px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
};

const modalStyle = {
  background: 'var(--bg-alt)',
  border: '1px solid var(--border)',
  borderRadius: 20,
  maxWidth: 520,
  width: '100%',
  boxShadow: 'var(--shadow-lg)',
  overflow: 'hidden',
};

const flagStripStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: 4,
};

const flagBar = {
  height: 4,
  width: '100%',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'var(--text)',
  margin: '0 0 8px',
  letterSpacing: '-0.02em',
};

const subtitleStyle = {
  fontSize: '0.88rem',
  color: 'var(--text-secondary)',
  margin: '0 0 32px',
  lineHeight: 1.5,
  maxWidth: 380,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 12,
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  padding: '20px 16px',
  borderRadius: 14,
  border: '1px solid var(--border)',
  background: 'var(--bg-card)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.25s ease',
};

const codeStyle = {
  fontSize: '0.7rem',
  fontWeight: 600,
  color: 'var(--red)',
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: '0.08em',
};

const nativeStyle = {
  fontSize: '1.1rem',
  fontWeight: 500,
  color: 'var(--text)',
};

const labelStyle = {
  fontSize: '0.78rem',
  color: 'var(--text-muted)',
};
