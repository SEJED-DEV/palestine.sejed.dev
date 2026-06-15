'use client';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSearch } from './SearchProvider';

const NAV_ITEMS = [
  { id: 'home', href: '' },
  { id: 'history', href: '/history' },
  { id: 'culture', href: '/culture' },
  { id: 'gaza', href: '/gaza' },
  { id: 'jericho', href: '/jericho' },
  { id: 'refugees', href: '/refugees' },
  { id: 'alQuds', href: '/al-quds' },
  { id: 'voices', href: '/voices' },
  { id: 'activism', href: '/act' },
  { id: 'boycott', href: '/boycott' },
  { id: 'hindRajab', href: '/hind-rajab' },
  { id: 'sources', href: '/sources' },
  { id: 'timeline', href: '/timeline' },
  { id: 'figures', href: '/figures' },
];

const SOURCE_NAMES = {
  aljazeera: 'Al Jazeera',
  hrw: 'HRW',
  mee: 'Middle East Eye',
  nine72: '972+',
};

const NEWS_TABS = ['history', 'culture', 'activism', 'voices', 'boycott'];

export default function SearchModal() {
  const { open, closeSearch } = useSearch();
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const tn = useTranslations('nav');

  const [query, setQuery] = useState('');
  const [newsResults, setNewsResults] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const navResults = useMemo(() => {
    if (query.trim().length < 1) return [];
    const q = query.toLowerCase();
    return NAV_ITEMS.filter((item) => {
      const label = tn(item.id).toLowerCase();
      return label.includes(q) || item.id.includes(q);
    });
  }, [query, tn]);

  const handleSelect = useCallback((href) => {
    closeSearch();
    window.location.href = `/${locale}${href}`;
  }, [closeSearch, locale]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setNewsResults([]);
      setRecentNews([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    async function loadRecent() {
      try {
        const res = await fetch(`/api/news?page=history&_=${Date.now()}`);
        const data = await res.json();
        const items = (data.sections || []).slice(0, 6);
        setRecentNews(items.map((a) => ({ ...a, source: SOURCE_NAMES[a.source] || a.source })));
      } catch {}
    }
    loadRecent();
  }, [open]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) { setNewsResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setNewsLoading(true);
      const q = query.toLowerCase();
      const hits = [];
      for (const tab of NEWS_TABS) {
        try {
          const res = await fetch(`/api/news?page=${tab}&_=${Date.now()}`);
          const data = await res.json();
          for (const article of (data.sections || [])) {
            if (article.heading?.toLowerCase().includes(q) || article.text?.toLowerCase().includes(q)) {
              hits.push({ ...article, tab, source: SOURCE_NAMES[article.source] || article.source || 'News' });
            }
          }
        } catch {}
      }
      setNewsResults(hits.slice(0, 8));
      setNewsLoading(false);
    }, 300);
  }, [query]);

  const hasResults = query.trim().length > 0;
  const showDefault = !hasResults && !newsLoading;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .15 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', justifyContent: 'center', paddingTop: '15vh',
            background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: .96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .96, y: -10 }}
            transition={{ duration: .15 }}
            style={{
              width: '100%', maxWidth: 580, maxHeight: '70vh',
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,.3)',
              display: 'flex', flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages and news..."
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  color: 'var(--text)', fontSize: '1rem', fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
              <kbd style={{
                fontSize: '.65rem', padding: '2px 8px', borderRadius: 6,
                background: 'var(--bg-alt)', color: 'var(--text-muted)',
                border: '1px solid var(--border)', fontFamily: 'var(--font-mono)',
                letterSpacing: '.03em',
              }}>
                ESC
              </kbd>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
              {showDefault && (
                <div>
                  <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', padding: '4px 12px 12px', fontFamily: 'var(--font-mono)' }}>
                    Quick Links
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 20 }}>
                    {NAV_ITEMS.filter((item) => item.id !== 'home').slice(0, 10).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 12px', borderRadius: 8,
                          border: '1px solid var(--border)', background: 'transparent',
                          color: 'var(--text)', cursor: 'pointer', fontSize: '.82rem',
                          textAlign: 'left', transition: 'all .15s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-alt)'; e.currentTarget.style.borderColor = 'var(--red)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                      >
                        {tn(item.id)}
                      </button>
                    ))}
                  </div>
                  {recentNews.length > 0 && (
                    <>
                      <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', padding: '4px 12px 12px', fontFamily: 'var(--font-mono)' }}>
                        Latest News
                      </p>
                      {recentNews.map((article, i) => (
                        <a
                          key={i}
                          href={article.sourceUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeSearch}
                          style={{
                            display: 'block', padding: '8px 12px', borderRadius: 8,
                            textDecoration: 'none', color: 'var(--text)', fontSize: '.82rem',
                            transition: 'background .15s',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <span style={{
                            fontSize: '.6rem', fontWeight: 600, textTransform: 'uppercase',
                            color: 'var(--green)', fontFamily: 'var(--font-mono)',
                            background: 'color-mix(in srgb, var(--green) 15%, transparent)',
                            padding: '1px 6px', borderRadius: 4, marginRight: 8,
                          }}>
                            {article.source}
                          </span>
                          {article.heading}
                        </a>
                      ))}
                    </>
                  )}
                </div>
              )}

              {navResults.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', padding: '4px 12px 8px', fontFamily: 'var(--font-mono)' }}>
                    Pages
                  </p>
                  {navResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.href)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', padding: '10px 14px', borderRadius: 10,
                        border: 'none', background: 'transparent',
                        color: 'var(--text)', cursor: 'pointer', fontSize: '.88rem',
                        textAlign: 'left', transition: 'background .15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{
                        fontSize: '.62rem', fontWeight: 600, textTransform: 'uppercase',
                        color: 'var(--red)', fontFamily: 'var(--font-mono)',
                        background: 'var(--red-dim)', padding: '2px 6px', borderRadius: 4,
                      }}>
                        Page
                      </span>
                      {tn(item.id)}
                    </button>
                  ))}
                </div>
              )}

              {hasResults && newsLoading && (
                <p style={{ color: 'var(--text-muted)', fontSize: '.82rem', padding: '20px 14px' }}>
                  Searching news...
                </p>
              )}

              {newsResults.length > 0 && (
                <div>
                  <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', padding: '4px 12px 8px', fontFamily: 'var(--font-mono)' }}>
                    News
                  </p>
                  {newsResults.map((article, i) => (
                    <a
                      key={i}
                      href={article.sourceUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeSearch}
                      style={{
                        display: 'block', padding: '10px 14px', borderRadius: 10,
                        textDecoration: 'none', color: 'var(--text)', fontSize: '.88rem',
                        transition: 'background .15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{
                          fontSize: '.6rem', fontWeight: 600, textTransform: 'uppercase',
                          color: 'var(--green)', fontFamily: 'var(--font-mono)',
                          background: 'color-mix(in srgb, var(--green) 15%, transparent)',
                          padding: '2px 6px', borderRadius: 4,
                        }}>
                          {article.source || 'News'}
                        </span>
                      </div>
                      <p style={{ margin: 0, lineHeight: 1.4 }}>{article.heading}</p>
                    </a>
                  ))}
                </div>
              )}

              {hasResults && !newsLoading && navResults.length === 0 && newsResults.length === 0 && (
                <p style={{ color: 'var(--text-muted)', fontSize: '.85rem', padding: 24, textAlign: 'center' }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
