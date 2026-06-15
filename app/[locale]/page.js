'use client';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import PalestineLogo from './components/PalestineLogo';
import Source from './components/Source';

function useInView(threshold = .15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, duration = 2000) {
  const [ref, inView] = useInView(.3);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const clean = target.replace(/[^0-9.]/g, '');
    const num = parseFloat(clean);
    if (isNaN(num)) { setVal(target); return; }
    const suffix = target.replace(/[0-9.,]/g, '');
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * num) + suffix);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return [ref, val, inView];
}

export default function HomePage() {
  const t = useTranslations('home');
  const tn = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const pageGroups = [
    {
      key: 'learn', label: tn('learn'), color: 'var(--red)',
      items: [
        { key: 'history', href: '/history', emoji: '📜', color: '#e4312b', tag: '05,000+ years' },
        { key: 'culture', href: '/culture', emoji: '🎭', color: '#149954', tag: 'heritage' },
        { key: 'gaza', href: '/gaza', emoji: '🌊', color: '#e4312b', tag: 'besieged' },
        { key: 'jericho', href: '/jericho', emoji: '🏛️', color: '#f5c542', tag: 'ancient' },
        { key: 'refugees', href: '/refugees', emoji: '🔑', color: '#a78bfa', tag: '6M+' },
        { key: 'alQuds', href: '/al-quds', emoji: '🕌', color: '#149954', tag: 'sacred' },
        { key: 'voices', href: '/voices', emoji: '🗣️', color: '#a78bfa', tag: 'witness' },
        { key: 'timeline', href: '/timeline', emoji: '📊', color: '#e4312b', tag: 'chronology' },
        { key: 'figures', href: '/figures', emoji: '👤', color: '#149954', tag: 'biographies' },
      ],
    },
    {
      key: 'act', label: tn('act'), color: 'var(--gold)',
      items: [
        { key: 'activism', href: '/act', emoji: '✊', color: '#f5c542', tag: 'take action' },
        { key: 'boycott', href: '/boycott', emoji: '🚫', color: '#e4312b', tag: 'BDS' },
        { key: 'hindRajab', href: '/hind-rajab', emoji: '🕊️', color: '#a78bfa', tag: 'justice' },
      ],
    },
  ];

  const statsData = [
    { value: t('stats.years'), label: t('stats.yearsLabel'), source: { name: 'Britannica', url: 'https://www.britannica.com/place/Palestine' } },
    { value: t('stats.refugees'), label: t('stats.refugeesLabel'), source: { name: 'UNRWA', url: 'https://www.unrwa.org/palestine-refugees' } },
    { value: t('stats.villages'), label: t('stats.villagesLabel'), source: { name: 'Al Jazeera', url: 'https://www.aljazeera.com/features/2017/5/23/the-nakba-60-years-of-palestinian-dispossession' } },
    { value: t('stats.children'), label: t('stats.childrenLabel'), source: { name: 'UNICEF', url: 'https://www.unicef.org/sop/what-we-do/child-protection' } },
  ];

  return (
    <>
      <style>{`
@keyframes sfIn {
  from { opacity: 0; transform: translateX(var(--sx)); }
  to { opacity: 1; transform: translateX(0); }
}
`}</style>
      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', minHeight: '100vh', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Color-block background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `
            linear-gradient(135deg, rgba(228,49,43,.18) 0%, transparent 45%),
            linear-gradient(225deg, rgba(20,153,84,.14) 0%, transparent 45%),
            linear-gradient(180deg, transparent 50%, rgba(0,0,0,.5) 100%)
          `,
        }} />
        <div style={{
          position: 'absolute', width: '45%', height: '100%', top: 0, left: '-10%',
          background: 'radial-gradient(ellipse at center, rgba(228,49,43,.08) 0%, transparent 70%)',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', width: '45%', height: '100%', bottom: 0, right: '-10%',
          background: 'radial-gradient(ellipse at center, rgba(20,153,84,.06) 0%, transparent 70%)',
          zIndex: 0,
        }} />

        {/* Decorative map silhouette */}
        <div style={{
          position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)',
          opacity: .035, zIndex: 1, pointerEvents: 'none',
        }}>
          <svg width="200" height="300" viewBox="0 0 280 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M140 5 C160 15 180 30 195 50 C210 70 220 95 225 120 C230 145 232 170 230 195 C228 220 222 245 215 265 C208 285 198 300 185 315 C172 330 158 345 145 360 C135 370 125 380 115 390 L105 395 C100 398 95 399 90 398 C80 395 70 388 62 378 C55 368 50 355 48 342 C46 329 47 316 50 303 C53 290 58 277 63 265 C68 253 72 242 75 230 C78 218 80 205 80 192 C80 179 78 166 75 153 C72 140 68 127 65 115 C62 103 60 91 62 80 C64 69 70 59 78 52 C86 45 96 40 107 35 C118 30 129 22 140 5 Z" fill="#e4312b" />
          </svg>
        </div>

        {/* Main content */}
        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 680,
          padding: isMobile ? '0 24px' : '0 48px',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all .8s cubic-bezier(.16,1,.3,1)',
        }}>
          {/* Logo area */}
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all .8s cubic-bezier(.16,1,.3,1) .15s',
            marginBottom: 12,
          }}>
            <PalestineLogo variant="vertical" />
          </div>

          {/* Label */}
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all .8s cubic-bezier(.16,1,.3,1) .25s',
            marginBottom: 24,
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 20px 4px 4px', borderRadius: 9999,
              background: 'rgba(228,49,43,.12)', border: '1px solid rgba(228,49,43,.2)',
              fontSize: '.75rem', fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)', letterSpacing: '.04em',
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%', background: 'var(--red)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {t('hero.tagline')}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: isMobile ? 'clamp(3rem, 12vw, 4.2rem)' : 'clamp(3.8rem, 6vw, 5.8rem)',
            fontWeight: 800, lineHeight: 1.05, letterSpacing: '-.03em',
            background: 'linear-gradient(135deg, #e4312b 0%, #f5c542 50%, #149954 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 16,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all .8s cubic-bezier(.16,1,.3,1) .35s',
          }}>
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all .8s cubic-bezier(.16,1,.3,1) .45s',
            marginBottom: 40,
          }}>
            <p style={{
              fontSize: isMobile ? '.95rem' : '1.1rem',
              color: 'var(--text-secondary)', lineHeight: 1.7,
              maxWidth: 520, margin: '0 auto',
            }}>
              {t('hero.subtitle')}
            </p>
          </div>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all .8s cubic-bezier(.16,1,.3,1) .55s',
          }}>
            <a href={`/${locale}/history`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 40px', borderRadius: 9999, fontSize: '1rem', fontWeight: 600,
                background: 'var(--red)', color: '#fff', textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(228,49,43,.35)',
                transition: 'all .25s cubic-bezier(.16,1,.3,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(228,49,43,.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(228,49,43,.35)'; }}
            >
              {t('hero.cta')} &rarr;
            </a>
            <a href={`/${locale}/voices`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 40px', borderRadius: 9999, fontSize: '1rem', fontWeight: 600,
                background: 'transparent', color: 'var(--text)', textDecoration: 'none',
                border: '1.5px solid var(--text-muted)',
                transition: 'all .25s cubic-bezier(.16,1,.3,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'none'; }}
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>

          {/* Scroll indicator */}
          <div style={{
            marginTop: 80,
            opacity: mounted ? 1 : 0,
            transition: 'opacity .8s ease .7s',
          }}>
            <div style={{
              width: 22, height: 36, borderRadius: 9999,
              border: '2px solid var(--text-muted)', margin: '0 auto',
              position: 'relative', opacity: .4,
            }}>
              <div style={{
                width: 3, height: 8, borderRadius: 9999,
                background: 'var(--text-muted)',
                position: 'absolute', left: '50%', top: 7,
                transform: 'translateX(-50%)',
                animation: 'scrollDot 2s ease-in-out infinite',
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLAG DIVIDER ===== */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #e4312b 25%, #fff 25% 50%, #149954 50% 75%, #000 75%)' }} />

      {/* ===== STATS ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '60px 0' : '120px 0' }}>
        {!isMobile && (
          <div style={{
            position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
            opacity: .04, zIndex: 0, pointerEvents: 'none',
          }}>
            <svg width="280" height="400" viewBox="0 0 280 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M140 5 C160 15 180 30 195 50 C210 70 220 95 225 120 C230 145 232 170 230 195 C228 220 222 245 215 265 C208 285 198 300 185 315 C172 330 158 345 145 360 C135 370 125 380 115 390 L105 395 C100 398 95 399 90 398 C80 395 70 388 62 378 C55 368 50 355 48 342 C46 329 47 316 50 303 C53 290 58 277 63 265 C68 253 72 242 75 230 C78 218 80 205 80 192 C80 179 78 166 75 153 C72 140 68 127 65 115 C62 103 60 91 62 80 C64 69 70 59 78 52 C86 45 96 40 107 35 C118 30 129 22 140 5 Z" fill="#e4312b" />
            </svg>
          </div>
        )}
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '.65rem', fontWeight: 500,
              color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '.16em',
            }}>
              {'// in numbers'}
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? 32 : 48,
          }}>
            {statsData.map((s, i) => (
              <StatBlock key={i} value={s.value} label={s.label} source={s.source} delay={i * .1} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLAG DIVIDER (subtle) ===== */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #e4312b 25%, #fff 25% 50%, #149954 50% 75%, #000 75%)', opacity: .2 }} />

      {/* ===== EXPLORE ===== */}
      <section style={{ padding: isMobile ? '60px 0' : '100px 0' }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '.65rem', fontWeight: 500,
            color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '.16em', marginBottom: 40,
          }}>
            {'// explore'}
          </p>
          {pageGroups.map((group, gi) => (
            <div key={group.key} style={{ marginBottom: gi < pageGroups.length - 1 ? 40 : 0 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
              }}>
                <span style={{
                  fontSize: '.65rem', fontWeight: 700, color: group.color,
                  textTransform: 'uppercase', letterSpacing: '.12em', fontFamily: 'var(--font-mono)',
                }}>
                  {group.label}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)', opacity: .4 }} />
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 10,
              }}>
                {group.items.map((sec, i) => (
                  <SectionRow key={sec.key} sec={sec} i={i} locale={locale} t={t} isMobile={isMobile} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function StatBlock({ value, label, source, delay }) {
  const [ref, val, inView] = useCountUp(value, 2000);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
      transition: `all .6s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      <span style={{
        fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', lineHeight: 1,
        display: 'block', marginBottom: 6,
        background: 'linear-gradient(135deg, var(--red), var(--green))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {val}
      </span>
      <span style={{
        fontSize: '.7rem', color: 'var(--text-muted)', textTransform: 'uppercase',
        letterSpacing: '.1em', fontFamily: 'var(--font-mono)', fontWeight: 600, display: 'block', marginBottom: 10,
      }}>
        {label}
      </span>
      <div className="sources">
        <Source name={source.name} url={source.url} />
      </div>
    </div>
  );
}

function SectionRow({ sec, i, locale, t, isMobile }) {
  const color = sec.color;
  const fromLeft = i % 2 === 0;
  return (
    <a
      href={`/${locale}${sec.href}`}
      style={{
        display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 18,
        padding: isMobile ? '16px 18px' : '18px 22px',
        textDecoration: 'none', color: 'inherit', borderRadius: 14,
        border: `1px solid ${color}20`,
        background: `${color}06`,
        position: 'relative', overflow: 'hidden',
        minHeight: 0,
        '--sx': fromLeft ? '-16px' : '16px',
        animation: `sfIn .5s cubic-bezier(.16,1,.3,1) ${i * .06}s both`,
        willChange: 'transform, opacity',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.background = `${color}10`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}20`; e.currentTarget.style.background = `${color}06`; }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color }} />
      <div style={{
        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${color}20`, background: `${color}06`, fontSize: '1.1rem',
      }}>
        {sec.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontSize: isMobile ? '1rem' : '1.05rem', fontWeight: 700, marginBottom: 2 }}>{t(`sections.${sec.key}.title`)}</h3>
        <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', WebkitLineClamp: 2 }}>{t(`sections.${sec.key}.desc`)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {!isMobile && sec.tag && (
          <span style={{
            fontSize: '.6rem', color, fontFamily: 'var(--font-mono)', fontWeight: 600,
            padding: '3px 10px', borderRadius: 9999,
            border: `1px solid ${color}20`, background: `${color}06`,
          }}>
            {sec.tag}
          </span>
        )}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </a>
  );
}
