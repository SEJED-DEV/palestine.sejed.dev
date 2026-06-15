'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Breadcrumbs from '../components/Breadcrumbs';

const coastLine = 'M310,65 Q320,70 325,80 Q335,95 340,110 Q345,130 348,155 Q350,180 352,210 Q355,240 358,270 Q360,300 362,330 Q365,360 368,390 Q370,420 372,450 Q375,480 378,510';

function CityDot({ city, active, onClick, index }) {
  return (
    <g>
      <circle
        cx={city.x}
        cy={city.y}
        r={active ? 8 : 5}
        fill={active ? 'var(--red)' : 'var(--red)'}
        stroke="#fff"
        strokeWidth={2.5}
        style={{ cursor: 'pointer', transition: 'r .2s' }}
        onClick={onClick}
      />
      <text
        x={city.x + 12}
        y={city.y + 4}
        fontSize="9"
        fontFamily="var(--font-mono)"
        fill="var(--text-secondary)"
        style={{ pointerEvents: 'none', fontWeight: active ? 700 : 400 }}
      >
        {city.name}
      </text>
    </g>
  );
}

export default function MapPage() {
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const t = useTranslations('map');
  const cities = t.raw('cities');
  const [activeCity, setActiveCity] = useState(null);

  const entries = Object.entries(cities);

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
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: .95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .6 }}
              className="card card-red"
              style={{ padding: 24, position: 'relative', flex: '0 0 auto' }}
            >
              <svg
                viewBox="240 60 260 490"
                style={{ width: '100%', maxWidth: 480, height: 'auto', display: 'block' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,.3)" />
                  </filter>
                </defs>

                <text x={250} y={85} fontSize="8" fill="var(--text-muted)" fontFamily="var(--font-mono)" opacity={.5}>Mediterranean Sea</text>
                <path
                  d={coastLine}
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  opacity={.5}
                />

                {entries.map(([key, city], i) => (
                  <CityDot key={key} city={city} active={activeCity === key} onClick={() => setActiveCity(activeCity === key ? null : key)} index={i} />
                ))}
              </svg>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                {entries.map(([key, city]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCity(activeCity === key ? null : key)}
                    className={activeCity === key ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ fontSize: '.65rem', padding: '3px 8px', fontFamily: 'var(--font-mono)' }}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </motion.div>

            <div style={{ flex: '1 1 300px', maxWidth: 400 }}>
              <AnimatePresence mode="wait">
                {activeCity && cities[activeCity] ? (
                  <motion.div
                    key={activeCity}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: .3 }}
                    className="card card-red"
                    style={{ padding: '28px 32px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'var(--red)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', fontWeight: 700, flexShrink: 0,
                      }}>
                        {cities[activeCity].name[0]}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                          {cities[activeCity].name}
                        </h3>
                        <p style={{ fontSize: '.9rem', color: 'var(--red)', fontFamily: 'var(--font-mono)', margin: '2px 0 0' }}>
                          {cities[activeCity].nameAr}
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                      {cities[activeCity].desc}
                    </p>
                    {cities[activeCity].page && (
                      <a
                        href={`/${locale}${cities[activeCity].page}`}
                        className="btn btn-outline"
                        style={{ marginTop: 16, padding: '8px 20px', fontSize: '.85rem', display: 'inline-block' }}
                      >
                        Learn more &rarr;
                      </a>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="card card-red"
                    style={{ padding: '28px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
                  >
                    <div style={{ fontSize: '2.5rem', opacity: .3 }}>🗺️</div>
                    <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                      Click a city on the map or below to learn about its significance.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>Land &amp; Memory</h2>
            <p style={{ fontSize: '.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 24, maxWidth: 600, marginInline: 'auto' }}>
              Each city on this map carries the weight of millennia. The borders drawn and redrawn
              by war and politics have never erased the Palestinian presence — a living
              connection to this land that predates all modern frontiers.
            </p>
            <a href={`/${locale}/history`} className="btn btn-outline">
              Explore the History &rarr;
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
