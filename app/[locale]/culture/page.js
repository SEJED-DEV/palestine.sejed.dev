'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Source from '../components/Source';
import GlossaryText from '../components/GlossaryText';
import Breadcrumbs from '../components/Breadcrumbs';

export default function CulturePage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('culture');
  const items = t.raw('items');
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-green" style={{ width: '50%', height: '50%', top: '-20%', left: '-15%', opacity: .08 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <p className="label">{'// culture & heritage'}</p>
            <h1 className="heading">{t('title')}</h1>
            <p className="subtitle" style={{ textAlign: 'center' }}>{t('subtitle')}</p>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: (i % 4) * .08 }}
                className="card card-green"
                onClick={() => setSelected(item)}
                style={{ padding: 32, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--green-dim)', border: '1px solid rgba(20,153,84,.15)',
                  fontSize: '1.6rem',
                }}>
                  {item.emoji}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.title}</h3>
                <p style={{ fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                  <GlossaryText text={item.short} />
                </p>
                {item.sources && item.sources.length > 0 && (
                  <div className="sources" onClick={(e) => e.stopPropagation()}>
                    {item.sources.slice(0, 1).map((src, si) => (
                      <Source key={si} name={src.name} url={src.url} />
                    ))}
                  </div>
                )}
                <span style={{
                  fontSize: '.78rem', color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 500, marginTop: 4,
                }}>
                  Read essay &rarr;
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <div
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(16px)',
              zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
            }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: .92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .92, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
              style={{
                width: '100%', maxWidth: 700, padding: '40px 44px', borderRadius: 24,
                background: 'var(--bg-alt)', border: '1px solid var(--border)',
                maxHeight: '90vh', overflowY: 'auto', position: 'relative',
                boxShadow: 'var(--shadow-lg)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute', top: 20, right: 20,
                  width: 36, height: 36, borderRadius: 10,
                  border: '1px solid var(--border)', background: 'var(--bg-card)',
                  color: 'var(--text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                aria-label="Close"
              >
                ✕
              </button>
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{selected.emoji}</div>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: 16, lineHeight: 1.25 }}>{selected.title}</h2>
              <div style={{ height: 1, background: 'linear-gradient(90deg, var(--green), transparent)', marginBottom: 24 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {selected.content.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontSize: '.96rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}><GlossaryText text={p} /></p>
                ))}
              </div>
              {selected.sources && selected.sources.length > 0 && (
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                  <span style={{
                    fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'var(--font-mono)',
                    display: 'block', marginBottom: 8,
                  }}>
                    Sources
                  </span>
                  <div className="sources">
                    {selected.sources.map((src, si) => (
                      <Source key={si} name={src.name} url={src.url} />
                    ))}
                  </div>
                </div>
              )}
              <button
                className="btn btn-outline"
                onClick={() => setSelected(null)}
                style={{ marginTop: 20, padding: '10px 24px', fontSize: '.85rem' }}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
