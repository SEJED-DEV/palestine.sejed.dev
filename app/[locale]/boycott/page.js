'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Source from '../components/Source';
import GlossaryText from '../components/GlossaryText';
import Breadcrumbs from '../components/Breadcrumbs';

export default function BoycottPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('boycott');
  const actT = useTranslations('activism');
  const boycottItems = actT.raw('boycott.items');
  const boycottSources = actT.raw('boycott.sources');

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-red" style={{ width: '50%', height: '50%', top: '-15%', right: '-10%', opacity: .08 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <p className="label">{'// ' + t('title')}</p>
            <h1 className="heading">{t('title')}</h1>
            <p className="subtitle" style={{ textAlign: 'center' }}>{t('subtitle')}</p>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 720 }}><GlossaryText text={t('desc')} /></p>
            {boycottSources && boycottSources.length > 0 && (
              <div className="sources" style={{ marginBottom: 20 }}>
                {boycottSources.map((src, i) => (
                  <Source key={i} name={src.name} url={src.url} />
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {boycottItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .35, delay: Math.min(i * .03, .5) }}
                  style={{
                    display: 'flex', gap: 14, padding: '18px 20px', borderRadius: 12,
                    background: 'var(--red-dim)', border: '1px solid rgba(228,49,43,.15)',
                    fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, alignItems: 'flex-start',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--red)', fontWeight: 600, flexShrink: 0, marginTop: 3,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
            <p style={{ marginTop: 20, fontSize: '.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {t('note')}
            </p>
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
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>{t('takeAction')}</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 600, marginInline: 'auto' }}>
              The BDS Movement (Boycott, Divestment, Sanctions) is the leading Palestinian-led campaign for freedom, justice, and equality.
            </p>
            <a href="https://bdsmovement.net/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              {t('cta')} &rarr;
            </a>
          </motion.div>
        </div>
      </section>

    </>
  );
}
