'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Source from '../components/Source';
import GlossaryText from '../components/GlossaryText';
import Breadcrumbs from '../components/Breadcrumbs';

export default function VoicesPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('voices');
  const quotes = t.raw('quotes');
  const testimonies = t.raw('testimonies.items');

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 60px' }}>
        <div className="orb orb-red" style={{ width: '50%', height: '50%', top: '-20%', right: '-10%', opacity: .06 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Breadcrumbs />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <p className="label">{'// voices of palestine'}</p>
            <h1 className="heading">{t('title')}</h1>
            <p className="subtitle" style={{ textAlign: 'center' }}>{t('subtitle')}</p>
            <div className="divider" />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
            {quotes.map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: (i % 4) * .06 }}
                className="card card-red"
                style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <span style={{ fontSize: '3rem', fontFamily: 'Georgia, serif', color: 'var(--red-dim)', lineHeight: .6 }}>
                  &ldquo;
                </span>
                <p style={{ fontSize: '.95rem', lineHeight: 1.8, fontStyle: 'italic', color: 'var(--text)', opacity: .85 }}>
                  <GlossaryText text={quote.text} />
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <strong style={{ fontSize: '.85rem', color: 'var(--red)' }}>{quote.author}</strong>
                    <span style={{ fontSize: '.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{quote.attribution}</span>
                  </div>
                  {quote.sources && quote.sources.length > 0 && (
                    <div className="sources" style={{ marginTop: 10 }}>
                      {quote.sources.map((src, si) => (
                        <Source key={si} name={src.name} url={src.url} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <motion.h2
            style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 32, textAlign: 'center' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('testimonies.title')}
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {testimonies.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .4, delay: i * .1 }}
                className="card card-green"
                style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--green)' }}>{item.title}</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}><GlossaryText text={item.text} /></p>
                {item.sources && item.sources.length > 0 && (
                  <div className="sources" style={{ marginTop: 12 }}>
                    {item.sources.map((src, si) => (
                      <Source key={si} name={src.name} url={src.url} />
                    ))}
                  </div>
                )}
              </motion.div>
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
