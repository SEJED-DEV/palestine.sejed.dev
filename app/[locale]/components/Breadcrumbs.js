'use client';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const pageKeys = {
  history: 'nav.history',
  culture: 'nav.culture',
  voices: 'nav.voices',
  act: 'nav.activism',
  boycott: 'nav.boycott',
  'hind-rajab': 'nav.hindRajab',
  sources: 'nav.sources',
  timeline: 'nav.timeline',
  figures: 'nav.figures',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const tn = useTranslations('nav');
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length <= 1) return null;

  const locale = segments[0];
  const crumbs = [{ label: tn('home'), href: `/${locale}` }];
  let current = '';

  for (const seg of segments.slice(1)) {
    current += `/${seg}`;
    const key = pageKeys[seg];
    crumbs.push({
      label: key ? tn(key.slice(4)) : seg.replace(/-/g, ' '),
      href: `/${locale}${current}`,
    });
  }

  return (
    <nav aria-label="Breadcrumb" style={{
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: '.78rem', color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      padding: '0 0 16px', flexWrap: 'wrap',
    }}>
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: .35, flexShrink: 0 }}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
          {i < crumbs.length - 1 ? (
            <Link href={crumb.href} style={{
              color: 'var(--text-muted)', textDecoration: 'none',
              transition: 'color .2s',
            }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {crumb.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
