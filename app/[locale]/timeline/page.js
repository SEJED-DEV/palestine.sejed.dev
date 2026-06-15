'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Source from '../components/Source';
import GlossaryText from '../components/GlossaryText';
import Breadcrumbs from '../components/Breadcrumbs';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'history', label: 'History' },
  { key: 'gaza', label: 'Gaza' },
  { key: 'jericho', label: 'Jericho' },
  { key: 'refugees', label: 'Refugees' },
  { key: 'alQuds', label: 'Al Quds' },
];

const ERAS = [
  { key: 'ancient', label: 'Ancient (pre-600 CE)' },
  { key: 'medieval', label: 'Medieval (600\u20131500)' },
  { key: 'ottoman', label: 'Ottoman (1500\u20131917)' },
  { key: 'modern', label: 'Modern (1917\u2013present)' },
];

function parseYear(yearStr) {
  const cleaned = yearStr.replace(/^c\.?\s*/i, '').trim();
  const match = cleaned.match(/(\d+)/);
  if (!match) return Infinity;
  let year = parseInt(match[1], 10);
  if (/BCE|BC/i.test(cleaned)) year = -year;
  return year;
}

function getEraKey(year) {
  if (year < 600) return 'ancient';
  if (year <= 1499) return 'medieval';
  if (year <= 1917) return 'ottoman';
  return 'modern';
}

export default function TimelinePage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('timeline');
  const tHistory = useTranslations('history');
  const tGaza = useTranslations('gaza');
  const tJericho = useTranslations('jericho');
  const tRefugees = useTranslations('refugees');
  const tAlQuds = useTranslations('alQuds');

  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState({});

  const allEvents = useMemo(() => {
    const sources = [
      { key: 'history', data: tHistory.raw('events') },
      { key: 'gaza', data: tGaza.raw('events') },
      { key: 'jericho', data: tJericho.raw('events') },
      { key: 'refugees', data: tRefugees.raw('events') },
      { key: 'alQuds', data: tAlQuds.raw('events') },
    ];
    const result = [];
    sources.forEach(({ key, data }) => {
      if (!Array.isArray(data)) return;
      data.forEach((event, idx) => {
        result.push({
          ...event,
          _key: `${key}-${idx}`,
          category: key,
          sortYear: parseYear(event.year),
        });
      });
    });
    result.sort((a, b) => a.sortYear - b.sortYear);
    return result;
  }, [tHistory, tGaza, tJericho, tRefugees, tAlQuds]);

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return allEvents;
    return allEvents.filter((e) => e.category === filter);
  }, [allEvents, filter]);

  const grouped = useMemo(() => {
    const groups = {};
    ERAS.forEach((era) => { groups[era.key] = []; });
    filteredEvents.forEach((event) => {
      groups[getEraKey(event.sortYear)].push(event);
    });
    return groups;
  }, [filteredEvents]);

  function toggle(key) {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-red" style={{ width: '50%', height: '50%', top: '-20%', right: '-15%', opacity: .08 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <p className="label">{'// ' + t('label')}</p>
            <h1 className="heading">{t('title')}</h1>
            <p className="subtitle" style={{ textAlign: 'center' }}>{t('subtitle')}</p>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            justifyContent: 'center', marginBottom: 40,
          }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`btn ${filter === cat.key ? 'btn-primary' : 'btn-outline'}`}
                style={{ fontSize: '.82rem', padding: '6px 18px' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {ERAS.map((era) => {
            const eraEvents = grouped[era.key];
            if (!eraEvents || eraEvents.length === 0) return null;
            return (
              <div key={era.key} style={{ marginBottom: 48 }}>
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{
                    fontSize: '1.3rem', fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--red)',
                    marginBottom: 20, paddingBottom: 8,
                    borderBottom: '2px solid var(--red-dim)',
                  }}
                >
                  {era.label}
                </motion.h2>

                {eraEvents.map((event) => {
                  const isExpanded = !!expanded[event._key];
                  return (
                    <motion.div
                      key={event._key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: .5 }}
                      className="card card-red"
                      onClick={() => toggle(event._key)}
                      style={{
                        padding: '28px 32px',
                        marginBottom: 16,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: '.78rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                          color: 'var(--red)', whiteSpace: 'nowrap',
                          background: 'var(--red-dim)', padding: '4px 14px', borderRadius: 9999,
                        }}>
                          {event.year}
                        </span>
                        <h3 style={{ fontSize: '1.08rem', fontWeight: 600, flex: 1 }}>
                          <GlossaryText text={event.title} />
                        </h3>
                        <span style={{
                          fontSize: '.68rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase', letterSpacing: '.05em',
                          color: 'var(--red)',
                          background: 'var(--red-dim)',
                          padding: '2px 10px', borderRadius: 9999,
                        }}>
                          {CATEGORIES.find((c) => c.key === event.category)?.label || event.category}
                        </span>
                      </div>
                      <div style={{
                        fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                        display: 'flex', flexDirection: 'column', gap: 12,
                      }}>
                        <p style={{
                          display: isExpanded ? 'block' : '-webkit-box',
                          WebkitBoxOrient: isExpanded ? 'unset' : 'vertical',
                          overflow: 'hidden',
                          WebkitLineClamp: isExpanded ? 'none' : 3,
                          margin: 0,
                        }}>
                          <GlossaryText text={event.desc} />
                        </p>
                        {event.sources && event.sources.length > 0 && (
                          <div className="sources" onClick={(e) => e.stopPropagation()}>
                            {event.sources.map((src, si) => (
                              <Source key={si} name={src.name} url={src.url} />
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggle(event._key); }}
                        className="btn btn-outline"
                        style={{ padding: '6px 18px', fontSize: '.75rem', alignSelf: 'flex-start' }}
                      >
                        {isExpanded ? '\u25B2 ' + t('showLess') : '\u25BC ' + t('readMore')}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 40 }}>
              No events found for this category.
            </p>
          )}
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>Sources &amp; Further Reading</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 600, marginInline: 'auto' }}>
              Explore all referenced sources for the events above.
            </p>
            <a href={`/${locale}/sources`} className="btn btn-outline">
              Browse Sources &rarr;
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
