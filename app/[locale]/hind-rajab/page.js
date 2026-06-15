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

export default function HindRajabPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('hindRajab');
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
            <p className="label">{'// ' + t('label') || 'in memoriam'}</p>
            <h1 className="heading">Hind Rajab</h1>
            <p className="subtitle" style={{ maxWidth: 500 }}>{t('subtitle')}</p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 9999,
              background: 'var(--red-dim)', border: '1px solid rgba(228,49,43,.12)',
              fontSize: '.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)',
            }}>
              <span style={{ fontWeight: 600 }}>2018 — 2024</span>
              <span style={{ width: 1, height: 14, background: 'var(--border)' }} />
              <span style={{ color: 'var(--red)', fontWeight: 700 }}>6 years old</span>
            </span>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ maxWidth: 620, margin: '0 auto' }}>
            <motion.div {...fadeUp(0)}>
              <p style={{ fontSize: '.92rem', color: 'var(--text-secondary)', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                {t('section1Desc')}
              </p>
            </motion.div>

            {sources && sources.length > 0 && (
              <motion.div {...fadeUp(0.1)} style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 12 }}>
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
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="label">{'// what happened'}</p>
            <h2 className="heading">Timeline</h2>
            <div className="divider" />
          </motion.div>

          <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 24, top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(180deg, var(--red) 0%, var(--border) 100%)',
              borderRadius: 1,
            }} />

            {[
              { time: '29 Jan 2024', event: 'Hind, her uncle\'s family, and others flee Gaza City by car after Israeli evacuation orders.' },
              { time: '29 Jan 2024', event: 'The car is hit by Israeli tank fire near the Kuwait Roundabout. Hind\'s parents and siblings are killed instantly.' },
              { time: '29 Jan 2024', event: 'Hind survives and calls the Palestinian Red Crescent. She\'s trapped in the car surrounded by bodies.' },
              { time: '29 Jan — 31 Jan', event: 'PRCS dispatches an ambulance. The crew is also killed by Israeli forces. Hind remains alone.' },
              { time: '31 Jan 2024', event: 'After 3 days of international outcry, Israeli forces retrieve Hind\'s body from the vehicle.' },
              { time: '10 Feb 2024', event: 'PRCS releases the recording of Hind\'s final phone call, sparking global outrage.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{
                  position: 'relative', marginLeft: 48, marginBottom: 16,
                  padding: '16px 20px', borderRadius: 10,
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                }}
              >
                <div style={{
                  position: 'absolute', left: -36, top: 20,
                  width: 12, height: 12, borderRadius: '50%',
                  background: i === 0 ? 'var(--red)' : 'var(--border)',
                  border: '2px solid var(--bg)',
                  zIndex: 1,
                }} />
                <span style={{
                  display: 'block', fontSize: '.7rem', fontFamily: 'var(--font-mono)',
                  color: 'var(--red)', fontWeight: 600, marginBottom: 4,
                }}>
                  {item.time}
                </span>
                <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {item.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(228,49,43,.03) 40%, rgba(228,49,43,.08) 100%)' }}>
        <div className="container">
          <motion.div {...fadeUp(0)} style={{ maxWidth: 540, margin: '0 auto' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}>
              <div style={{
                height: 200,
                background: 'linear-gradient(135deg, #1a0a0a 0%, #2d1111 50%, #1a0a0a 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse at center, rgba(228,49,43,.12) 0%, transparent 70%)',
                }} />
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: 8, opacity: 0.7 }}>🎬</span>
                  <span style={{
                    fontSize: '.65rem', fontFamily: 'var(--font-mono)',
                    color: 'var(--red)', fontWeight: 600, letterSpacing: '.15em',
                    textTransform: 'uppercase',
                  }}>
                    Documentary Film
                  </span>
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>
                  {t('filmTitle')}
                </h2>
                <p style={{ fontSize: '.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
                  {t('filmDesc')}
                </p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 8,
                  background: 'rgba(228,49,43,.08)',
                  fontSize: '.72rem', color: 'var(--text-muted)',
                  marginBottom: 20,
                }}>
                  <span style={{ fontSize: '.85rem' }}>⚠️</span>
                  <span>{t('filmNote')}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a
                    href="https://www.thevoiceofhindrajabfilm.com/"
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ justifyContent: 'center' }}
                  >
                    Watch Official Film &rarr;
                  </a>
                  <a
                    href="https://streamimdb.ru/embed/movie/tt36943034"
                    target="_blank" rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ justifyContent: 'center' }}
                  >
                    {t('filmFree')} &rarr;
                  </a>
                  <p style={{ fontSize: '.7rem', color: 'var(--orange)', fontWeight: 500, textAlign: 'center', marginTop: 4 }}>
                    {t('filmFreeNote')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
