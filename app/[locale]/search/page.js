'use client';
import { useState, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useWikiContent } from '../components/ContentProvider';
import Source from '../components/Source';
import Breadcrumbs from '../components/Breadcrumbs';

const tabs = ['history', 'culture', 'activism', 'voices', 'boycott'];

export default function SearchPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const tn = useTranslations('nav');

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeTab, setActiveTab] = useState('all');

  const allData = {};
  for (const tab of tabs) {
    allData[tab] = useWikiContent(tab);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const hits = [];
    for (const tab of tabs) {
      const data = allData[tab];
      if (!data || !Array.isArray(data.sections)) continue;
      for (const section of data.sections) {
        const inHeading = section.heading?.toLowerCase().includes(q);
        const inText = section.text?.toLowerCase().includes(q);
        if (inHeading || inText) {
          hits.push({ ...section, tab, matchHeading: inHeading });
        }
      }
    }
    return hits;
  }, [query, allData]);

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-red" style={{ width: '50%', height: '50%', top: '-20%', left: '-10%', opacity: .06 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <p className="label">{'// search'}</p>
            <h1 className="heading">Search</h1>
            <p className="subtitle" style={{ textAlign: 'center' }}>
              Search across all content on the site.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            autoFocus
            style={{
              width: '100%', padding: '14px 20px', borderRadius: 12,
              border: '2px solid var(--border)', background: 'var(--bg)',
              color: 'var(--text)', fontSize: '1.05rem', fontFamily: 'inherit',
              outline: 'none', marginBottom: 32, transition: 'border-color .2s',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--red)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          />

          {query && results.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {results.map((r, i) => (
              <a
                key={r.tab + i}
                href={`/${locale}/${r.tab === 'activism' ? 'act' : r.tab}`}
                className="card"
                style={{
                  padding: '18px 22px', textDecoration: 'none',
                  display: 'flex', flexDirection: 'column', gap: 6,
                  borderLeft: r.matchHeading ? '3px solid var(--red)' : '3px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: '.65rem', padding: '2px 8px', borderRadius: 4,
                    background: 'var(--border)', color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase',
                  }}>
                    {tn(r.tab === 'activism' ? 'activism' : r.tab)}
                  </span>
                </div>
                <h3 style={{ fontSize: '.95rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
                  {r.heading}
                </h3>
                <p style={{ fontSize: '.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {r.text?.slice(0, 180)}{r.text?.length > 180 ? '...' : ''}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
