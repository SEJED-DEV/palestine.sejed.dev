'use client';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { sourceBadges } from '../components/SourceBadges';
import Breadcrumbs from '../components/Breadcrumbs';

const INITIAL_SHOW = 5;
const LOAD_MORE = 5;
const tabs = ['history', 'culture', 'activism', 'voices', 'boycott'];

function formatDate(dateStr) {
  if (!dateStr || dateStr === '1900-01-01') return null;
  const d = new Date(dateStr);
  const date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Gaza' });
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Gaza' });
  return { date, time };
}

function SourceDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const ts = useTranslations('sourcesPage');

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedBadge = value === 'all' ? null : (sourceBadges[value] || null);

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: 160 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
          padding: '10px 14px', borderRadius: 10,
          border: '1px solid var(--border)', background: 'var(--bg)',
          color: 'var(--text)', fontSize: '.85rem', fontFamily: 'inherit',
          cursor: 'pointer', transition: 'border-color .2s',
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--red)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: selectedBadge ? selectedBadge.color : 'var(--text-muted)',
          flexShrink: 0,
        }} />
        <span style={{ flex: 1, textAlign: 'left' }}>
          {value === 'all' ? ts('allSources') : (selectedBadge?.label || value)}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
          transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none',
          opacity: .5,
        }}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 10, overflow: 'hidden', zIndex: 100,
          boxShadow: '0 8px 24px rgba(0,0,0,.25)',
        }}>
          {options.map((key) => {
            const label = key === 'all' ? ts('allSources') : (sourceBadges[key]?.label || key);
            const dotColor = key === 'all' ? 'var(--text-muted)' : (sourceBadges[key]?.color || 'var(--text-muted)');
            const isActive = value === key;
            return (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px',
                  border: 'none', background: isActive ? 'var(--red-dim)' : 'transparent',
                  color: isActive ? 'var(--red)' : 'var(--text-secondary)',
                  fontSize: '.85rem', fontFamily: 'inherit', cursor: 'pointer',
                  textAlign: 'left', transition: 'background .15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--red-dim)'}
                onMouseLeave={(e) => e.currentTarget.style.background = isActive ? 'var(--red-dim)' : 'transparent'}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SourcesPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const tn = useTranslations('nav'); const ts = useTranslations('sourcesPage');
  const [activeTab, setActiveTab] = useState('history');
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sections, setSections] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const fetchNews = useCallback(async (force = false) => {
    setRefreshing(true);
    setFeedback(null);
    try {
      const url = `/api/news?locale=${locale}&page=${activeTab}&_=${Date.now()}`;
      const res = await fetch(url);
      const json = await res.json();
      setSections(json.sections || []);
      setLastRefresh(json.fetchedAt ? Date.parse(json.fetchedAt) : Date.now());
      setVisibleCount(INITIAL_SHOW);
      if (force) {
        setFeedback(json.sections?.length ? 'updated' : 'nonew');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch { /* keep existing data */ }
    setRefreshing(false);
  }, [activeTab, locale]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  const availableSources = useMemo(() => {
    if (!sections) return ['all'];
    const keys = new Set(sections.map((s) => s.source || 'wikipedia'));
    return ['all', ...keys];
  }, [sections]);

  const filtered = useMemo(() => {
    if (!sections) return [];
    let items = sections.filter((s) => s.source !== 'wikipedia' && s.date !== '1900-01-01');
    const q = search.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (s) => s.heading.toLowerCase().includes(q) || s.text.toLowerCase().includes(q)
      );
    }
    if (sourceFilter !== 'all') {
      items = items.filter((s) => (s.source || 'wikipedia') === sourceFilter);
    }
    return items;
  }, [sections, search, sourceFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function loadMore() {
    setVisibleCount((p) => Math.min(p + LOAD_MORE, filtered.length));
  }

  function switchTab(tab) {
    setActiveTab(tab);
    setVisibleCount(INITIAL_SHOW);
    setSearch('');
  }

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-green" style={{ width: '45%', height: '45%', top: '-20%', right: '-5%', opacity: .06 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <p className="label">{'// ' + ts('title')}</p>
            <h1 className="heading">{ts('title')}</h1>
            <p className="subtitle" style={{ textAlign: 'center' }}>
              {ts('subtitle')}
            </p>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {/* Pinned refresh notification */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 20px', borderRadius: 12, marginBottom: 28,
            background: 'rgba(228,49,43,.06)', border: '1px solid rgba(228,49,43,.15)',
            fontSize: '.82rem', color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span style={{ flex: 1 }}>
              {feedback === 'updated' ? ts('checkUpdated') : feedback === 'nonew' ? ts('checkNonew') : ts('refresh')}
            </span>
            <span style={{ fontSize: '.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              {mounted ? new Date(lastRefresh).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
              <span style={{ fontSize: '.6rem', opacity: .6 }}>server time</span>
            </span>
            <button
              onClick={() => fetchNews(true)}
              disabled={refreshing}
              style={{
                padding: '4px 12px', borderRadius: 6, border: '1px solid var(--border)',
                background: refreshing ? 'var(--border)' : 'transparent',
                color: refreshing ? 'var(--text-muted)' : 'var(--text-secondary)',
                cursor: refreshing ? 'default' : 'pointer',
                fontSize: '.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                whiteSpace: 'nowrap', transition: 'all .15s',
              }}
            >
              {refreshing ? 'Updating...' : '↻ Check'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 4, marginBottom: 32, flexWrap: 'wrap' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                style={{
                  padding: '10px 20px', borderRadius: 10, border: 'none',
                  background: activeTab === tab ? 'var(--red)' : 'var(--bg)',
                  color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                  fontSize: '.85rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all .2s',
                  border: activeTab === tab ? 'none' : '1px solid var(--border)',
                }}
              >
                {tn(tab)}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder={ts('search')}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(INITIAL_SHOW); }}
              style={{
                flex: 1, minWidth: 200, maxWidth: 320, padding: '10px 16px', borderRadius: 10,
                border: '1px solid var(--border)', background: 'var(--bg)',
                color: 'var(--text)', fontSize: '.85rem', fontFamily: 'inherit',
                outline: 'none',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--red)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            />
            <SourceDropdown
              options={availableSources}
              value={sourceFilter}
              onChange={(v) => { setSourceFilter(v); setVisibleCount(INITIAL_SHOW); }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {!sections && (
                <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-muted)' }}>
                   {ts('loading')}
                </div>
              )}

              {sections && filtered.length === 0 && search && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>
                  {ts('noResults', { query: search })}
                </p>
              )}

              {sections && filtered.length === 0 && !search && (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>
                  {ts('noContent', { locale: locale.toUpperCase() })}
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {visible.map((section, i) => {
                  const sourceKey = section.source || 'wikipedia';
                  const badge = sourceBadges[sourceKey] || sourceBadges.wikipedia;
                  const dateLabel = formatDate(section.date);
                  return (
                    <motion.div
                      key={section.heading + i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.2) }}
                      style={{
                        padding: '24px 28px',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: 14,
                        borderLeft: `3px solid ${badge.color}`,
                      }}
                    >
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', gap: 12, marginBottom: 10,
                      }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{ fontSize: '.95rem', fontWeight: 600, marginBottom: dateLabel ? 4 : 0 }}>
                            {section.heading}
                          </h3>
                          {dateLabel && (
                            <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', margin: 0 }}>
                              {dateLabel.date} · {dateLabel.time} <span style={{ opacity: .5, fontSize: '.65rem' }}> Palestine</span>
                            </p>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                          <a
                            href={section.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'none', fontSize: '.72rem',
                              padding: '3px 10px', borderRadius: 9999,
                              color: badge.color, background: `${badge.color}15`,
                              border: `1px solid ${badge.color}30`,
                              fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.03em',
                              whiteSpace: 'nowrap',
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {badge.label}
                          </a>
                          <span style={{
                            fontSize: '.62rem', padding: '2px 6px', borderRadius: 4,
                            background: 'var(--border)', color: 'var(--text-muted)',
                            fontWeight: 600, fontFamily: 'var(--font-mono)',
                          }}>
                            EN
                          </span>
                        </div>
                      </div>
                      <p style={{ fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        {section.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {hasMore && (
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                  <button onClick={loadMore} className="btn btn-outline">
                    {ts('showMore')}
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
