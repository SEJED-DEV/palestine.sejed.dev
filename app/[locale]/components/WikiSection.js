'use client';
import { useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWikiContent } from './ContentProvider';
import { sourceBadges } from './SourceBadges';

const INITIAL_SHOW = 5;
const LOAD_MORE = 5;

function Skeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{
          padding: '24px 28px', borderRadius: 14,
          border: '1px solid var(--border)',
          borderLeft: '3px solid var(--border)',
          background: 'var(--bg-alt)',
        }}>
          <div style={{
            height: 18, width: `${40 + i * 10}%`, borderRadius: 4,
            background: 'var(--border)', marginBottom: 12,
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 12, borderRadius: 3, background: 'var(--border)', width: '100%' }} />
            <div style={{ height: 12, borderRadius: 3, background: 'var(--border)', width: '85%' }} />
            <div style={{ height: 12, borderRadius: 3, background: 'var(--border)', width: '70%' }} />
            <div style={{ height: 12, borderRadius: 3, background: 'var(--border)', width: '92%' }} />
            <div style={{ height: 12, borderRadius: 3, background: 'var(--border)', width: '60%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function hasContent(data) {
  return data && Array.isArray(data.sections) && data.sections.length > 0;
}

export default function WikiSection({ locale, page, label }) {
  const data = useWikiContent(page);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const inputRef = useRef(null);

  const filtered = useMemo(() => {
    if (!hasContent(data)) return [];
    let items = data.sections;
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
  }, [data, search, sourceFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const noData = !hasContent(data);

  function loadMore() {
    setVisibleCount((p) => Math.min(p + LOAD_MORE, filtered.length));
  }

  function onSearchChange(val) {
    setSearch(val);
    setVisibleCount(INITIAL_SHOW);
  }

  return (
    <section className="section-alt" style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16, marginBottom: 32,
          }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>
                {label || (data ? data.label : '')}
              </h2>
              {hasContent(data) && (
                <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {data.sections.length} entries
                </p>
              )}
            </div>
            {hasContent(data) && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  style={{
                    padding: '10px 16px', borderRadius: 10,
                    border: '1px solid var(--border)', background: 'var(--bg)',
                    color: 'var(--text)', fontSize: '.85rem', fontFamily: 'inherit',
                    outline: 'none', width: 200, maxWidth: '100%',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--red)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>
            )}
          </div>

          {!data && <Skeleton />}

          {noData && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40, fontSize: '.9rem' }}>
              Content unavailable for this language.
            </p>
          )}

          {!noData && filtered.length === 0 && search && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}
            >
              No sections match &ldquo;{search}&rdquo;
            </motion.p>
          )}

          {!noData && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {visible.map((section, i) => {
                  const sourceKey = section.source || 'wikipedia';
                  const badge = sourceBadges[sourceKey] || sourceBadges.wikipedia;
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
                        <h3 style={{ fontSize: '.95rem', fontWeight: 600 }}>{section.heading}</h3>
                        <a
                          href={section.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flexShrink: 0, textDecoration: 'none', fontSize: '.72rem',
                            padding: '3px 10px', borderRadius: 9999,
                            color: badge.color, background: `${badge.color}15`,
                            border: `1px solid ${badge.color}30`,
                            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.03em',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {badge.label}
                        </a>
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
                    Show more
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
