'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const relatedMap = {
  history: ['culture', 'gaza', 'voices'],
  culture: ['history', 'jericho', 'voices'],
  voices: ['refugees', 'history', 'culture'],
  gaza: ['history', 'refugees', 'voices'],
  jericho: ['history', 'culture', 'gaza'],
  refugees: ['gaza', 'history', 'voices'],
  act: ['boycott', 'voices', 'history'],
  boycott: ['act', 'history', 'gaza'],
  'hind-rajab': ['voices', 'act', 'gaza'],
  sources: ['history', 'gaza', 'voices'],
};

const pageMeta = {
  history: { key: 'nav.history', icon: '📜', desc: 'Key events from ancient times to today.' },
  culture: { key: 'nav.culture', icon: '🎭', desc: 'Heritage, art, food, music, and traditions.' },
  voices: { key: 'nav.voices', icon: '🗣️', desc: 'First-person accounts and testimonies.' },
  gaza: { key: 'nav.gaza', icon: '🌊', desc: 'History of the Gaza Strip.' },
  jericho: { key: 'nav.jericho', icon: '🏛️', desc: 'The oldest city in the world.' },
  refugees: { key: 'nav.refugees', icon: '🔑', desc: 'The Palestinian refugee crisis.' },
  act: { key: 'nav.activism', icon: '✊', desc: 'Organizations and ways to take action.' },
  boycott: { key: 'nav.boycott', icon: '🚫', desc: 'Companies profiting from occupation.' },
  'hind-rajab': { key: 'nav.hindRajab', icon: '🕊️', desc: 'The story of Hind Rajab.' },
  sources: { key: 'nav.sources', icon: '📰', desc: 'Live news from independent media.' },
  timeline: { key: 'nav.timeline', icon: '📊', desc: 'Unified chronological view of Palestinian history.' },
  figures: { key: 'nav.figures', icon: '👤', desc: 'Notable Palestinians who shaped history.' },
};

export default function PreFooter() {
  const pathname = usePathname();
  const tn = useTranslations('nav');
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] || 'en';
  const page = segments[1];

  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = 'Learn about Palestine — Land, History, and Resistance';

  const related = page ? relatedMap[page] : null;

  const share = (platform) => {
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    window.open(links[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  if (!related) return null;

  return (
    <section style={{
      background: 'var(--bg-alt)',
      borderTop: '1px solid var(--border)',
      padding: '48px 0 64px',
      marginTop: 60,
    }}>
      <div className="container">
        {/* Share */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          marginBottom: 40, paddingBottom: 40,
          borderBottom: '1px solid var(--border)',
        }}>
          <span style={{
            fontSize: '.75rem', fontWeight: 600, color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em',
          }}>
            Share
          </span>
          <div style={{ width: 1, height: 18, background: 'var(--border)' }} />
          {[
            { id: 'twitter', label: '𝕏' },
            { id: 'facebook', label: 'f' },
            { id: 'copy', label: copied ? '✓' : '🔗' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => share(btn.id)}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--border)', background: 'transparent',
                color: copied && btn.id === 'copy' ? 'var(--green)' : 'var(--text-muted)',
                cursor: 'pointer', fontSize: '.85rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-dim)'; e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.color = 'var(--red)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = copied && btn.id === 'copy' ? 'var(--green)' : 'var(--text-muted)'; }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Read Next */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, justifyContent: 'center',
        }}>
          <div style={{ flex: 1, maxWidth: 50, height: 1, background: 'var(--border)' }} />
          <span style={{
            fontSize: '.72rem', fontWeight: 700, color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.12em',
            whiteSpace: 'nowrap',
          }}>
            Continue Reading
          </span>
          <div style={{ flex: 1, maxWidth: 50, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 10, maxWidth: 660, margin: '0 auto',
        }}>
          {related.slice(0, 3).map((rel) => {
            const meta = pageMeta[rel];
            return (
              <a
                key={rel}
                href={`/${locale}/${rel === 'act' ? 'act' : rel}`}
                style={{
                  padding: '18px 20px', textDecoration: 'none',
                  borderRadius: 12, border: '1px solid var(--border)',
                  background: 'var(--bg)', display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-dim)'; e.currentTarget.style.background = 'var(--red-dim)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg)'; }}
              >
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{meta?.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '.85rem', fontWeight: 600, color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {meta ? tn(meta.key.slice(4)) : rel}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                  {meta?.desc && (
                    <div style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>
                      {meta.desc}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
