'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Source from '../components/Source';
import GlossaryText from '../components/GlossaryText';
import Breadcrumbs from '../components/Breadcrumbs';

export default function AlQudsPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('alQuds');
  const events = t.raw('events');
  const [expanded, setExpanded] = useState({});

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
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: .5, delay: i * .05 }}
              className="card card-red"
              onClick={() => setExpanded((p) => ({ ...p, [i]: !p[i] }))}
              style={{
                padding: '28px 32px',
                marginBottom: 16,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{
                  fontSize: '.78rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                  color: 'var(--red)', whiteSpace: 'nowrap',
                  background: 'var(--red-dim)', padding: '4px 14px', borderRadius: 9999,
                }}>
                  {event.year}
                </span>
                <h3 style={{ fontSize: '1.08rem', fontWeight: 600 }}><GlossaryText text={event.title} /></h3>
              </div>
              <div style={{
                fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.7,
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <p style={{
                  display: expanded[i] ? 'block' : '-webkit-box',
                  WebkitBoxOrient: expanded[i] ? 'unset' : 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: expanded[i] ? 'none' : 3,
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
                onClick={(e) => { e.stopPropagation(); setExpanded((p) => ({ ...p, [i]: !p[i] })); }}
                className="btn btn-outline"
                style={{ padding: '6px 18px', fontSize: '.75rem', alignSelf: 'flex-start' }}
              >
                {expanded[i] ? '▲ ' + t('showLess') : '▼ ' + t('readMore')}
              </button>
            </motion.div>
          ))}
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
              Supplementary content sourced from Wikipedia, Al Jazeera, and other verified sources.
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
