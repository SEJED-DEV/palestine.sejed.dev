'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Source from '../components/Source';
import Breadcrumbs from '../components/Breadcrumbs';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function GazaFilmsPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('gazaFilms');
  const films = t.raw('films');
  const sources = t.raw('sources');

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-red" style={{ width: '60%', height: '60%', top: '-25%', left: '20%', opacity: .08 }} />
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
            <p className="subtitle" style={{ maxWidth: 520 }}>{t('subtitle')}</p>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {films.map((film, i) => {
              const isInternal = film.url.startsWith('/');
              return (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.06)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    height: 160,
                    background: `linear-gradient(135deg, ${i % 2 === 0 ? '#1a0a0a,#2d1111' : '#0a0a1a,#11112d'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(ellipse at center, ${i % 2 === 0 ? 'rgba(228,49,43,.1)' : 'rgba(167,139,250,.1)'} 0%, transparent 70%)`,
                    }} />
                    <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 6, opacity: 0.6 }}>🎬</span>
                      {film.badge && (
                        <span style={{
                          fontSize: '.6rem', fontFamily: 'var(--font-mono)',
                          color: i % 2 === 0 ? 'var(--red)' : 'var(--gold)',
                          fontWeight: 600, letterSpacing: '.12em',
                          textTransform: 'uppercase',
                          border: `1px solid ${i % 2 === 0 ? 'rgba(228,49,43,.3)' : 'rgba(245,197,66,.3)'}`,
                          borderRadius: 999, padding: '3px 12px',
                        }}>
                          {film.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ padding: '20px 24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{film.title}</h2>
                      <span style={{ fontSize: '.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {film.year}
                      </span>
                    </div>
                    {film.dir && (
                      <p style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                        dir. {film.dir}
                      </p>
                    )}
                    <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
                      {film.desc}
                    </p>
                    <a
                      href={isInternal ? `/${locale}${film.url}` : film.url}
                      target={isInternal ? undefined : '_blank'}
                      rel={isInternal ? undefined : 'noopener noreferrer'}
                      className="btn btn-outline"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: '.8rem', padding: '8px 18px',
                      }}
                    >
                      {film.urlLabel} &rarr;
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {sources && sources.length > 0 && (
            <motion.div {...fadeUp(0.3)} style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
              <p style={{
                fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                letterSpacing: '.1em', marginBottom: 12,
              }}>
                Sources
              </p>
              <div className="sources">
                {sources.map((src, i) => (
                  <Source key={i} name={src.name} url={src.url} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
