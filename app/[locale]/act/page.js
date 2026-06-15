'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Source from '../components/Source';
import GlossaryText from '../components/GlossaryText';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ActivismPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('activism');
  const orgs = t.raw('organizations.list');
  const bdsActions = t.raw('bds.actions');
  const bdsSources = t.raw('bds.sources');
  const digitalTips = t.raw('digital.tips');

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-red" style={{ width: '50%', height: '50%', top: '-20%', left: '-10%', opacity: .08 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <p className="label">{'// take action'}</p>
            <h1 className="heading">{t('title')}</h1>
            <p className="subtitle" style={{ textAlign: 'center' }}>{t('subtitle')}</p>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.h2
            style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('organizations.title')}
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {orgs.map((org, i) => (
              <motion.a
                key={i}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-red"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .35, delay: i * .08 }}
                style={{ padding: 28, textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--red)', lineHeight: 1.3 }}>{org.name}</h3>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 4 }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
                <p style={{ fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}><GlossaryText text={org.desc} /></p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 16 }}>{t('bds.title')}</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 720 }}><GlossaryText text={t('bds.desc')} /></p>
            {bdsSources && bdsSources.length > 0 && (
              <div className="sources" style={{ marginBottom: 20 }}>
                {bdsSources.map((src, i) => (
                  <Source key={i} name={src.name} url={src.url} />
                ))}
              </div>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
              {bdsActions.map((action, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontSize: '.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 16 }}>{t('digital.title')}</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 720 }}><GlossaryText text={t('digital.desc')} /></p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
              {digitalTips.map((tip, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, fontSize: '.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--red)', flexShrink: 0, fontWeight: 700, marginTop: 2 }}>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
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
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>{t('boycott.title')}</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 600, marginInline: 'auto' }}>
              See the full continuously updated divestment & boycott list with verified sources on the dedicated page.
            </p>
            <a href={`/${locale}/boycott`} className="btn btn-outline">
              View Full Boycott Guide &rarr;
            </a>
          </motion.div>
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
