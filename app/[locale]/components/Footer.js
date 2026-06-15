'use client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import PalestineLogo from './PalestineLogo';

const learnLinks = [
  { href: '/history', key: 'history' },
  { href: '/culture', key: 'culture' },
  { href: '/al-quds', key: 'alQuds' },
  { href: '/gaza', key: 'gaza' },
  { href: '/jericho', key: 'jericho' },
  { href: '/refugees', key: 'refugees' },
  { href: '/voices', key: 'voices' },
  { href: '/timeline', key: 'timeline' },
  { href: '/figures', key: 'figures' },
];

const actLinks = [
  { href: '/act', key: 'activism' },
  { href: '/boycott', key: 'boycott' },
  { href: '/hind-rajab', key: 'hindRajab' },
];

const resourceLinks = [
  { href: '/sources', key: 'sources' },
  { href: '/search', key: 'search' },
];

const resources = [
  { label: 'Al Jazeera Palestine', url: 'https://www.aljazeera.com/tag/palestine/' },
  { label: 'UNRWA', url: 'https://www.unrwa.org/' },
  { label: 'BDS Movement', url: 'https://bdsmovement.net/' },
  { label: 'Amnesty International', url: 'https://www.amnesty.org/en/what-we-do/countries/middle-east-and-north-africa/israel-and-occupied-palestinian-territories/' },
  { label: 'Human Rights Watch', url: 'https://www.hrw.org/middle-east/north-africa/israel/palestine' },
  { label: 'Global Sumud Flotilla', url: 'https://globalsumudflotilla.org' },
  { label: 'Palestine Red Crescent', url: 'https://www.palestinercs.org/' },
  { label: 'Visualizing Palestine', url: 'https://visualizingpalestine.org/' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';

  return (
    <>
      <footer style={{ marginTop: 120, paddingBottom: 0, position: 'relative' }}>
        <div style={{
          background: 'var(--bg-alt)',
          borderTop: '1px solid var(--border)',
          padding: '64px 0 0',
        }}>
          <div style={{
            height: 3, width: '100%',
            background: 'linear-gradient(90deg, var(--red) 0%, var(--green) 50%, transparent 80%)',
            marginBottom: 0,
          }} />
          <div className="container" style={{ paddingTop: 48, paddingBottom: 0 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
              gap: 48,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <a href={`/${locale}`} style={{ display: 'block', textDecoration: 'none' }}>
                  <PalestineLogo variant="vertical" />
                </a>
                <p style={{
                  fontSize: '.85rem', color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 380,
                }}>
                  {t('disclaimer')}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{
                  fontSize: '.68rem', fontWeight: 700, color: 'var(--red)',
                  textTransform: 'uppercase', letterSpacing: '.1em',
                  fontFamily: 'var(--font-mono)', marginBottom: 2,
                }}>
                  {tn('learn')}
                </span>
                {learnLinks.map((link) => (
                  <a
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="footer-link"
                    style={{
                      color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '.88rem',
                      transition: 'all .2s', display: 'inline-block',
                    }}
                  >
                    {tn(link.key)}
                  </a>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{
                  fontSize: '.68rem', fontWeight: 700, color: 'var(--gold)',
                  textTransform: 'uppercase', letterSpacing: '.1em',
                  fontFamily: 'var(--font-mono)', marginBottom: 2,
                }}>
                  {tn('act')}
                </span>
                {actLinks.map((link) => (
                  <a
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="footer-link"
                    style={{
                      color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '.88rem',
                      transition: 'all .2s', display: 'inline-block',
                    }}
                  >
                    {tn(link.key)}
                  </a>
                ))}
                <div style={{ height: 4 }} />
                <span style={{
                  fontSize: '.68rem', fontWeight: 700, color: 'var(--green)',
                  textTransform: 'uppercase', letterSpacing: '.1em',
                  fontFamily: 'var(--font-mono)', marginBottom: 2,
                }}>
                  Resources
                </span>
                {resourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={`/${locale}${link.href}`}
                    className="footer-link"
                    style={{
                      color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '.88rem',
                      transition: 'all .2s', display: 'inline-block',
                    }}
                  >
                    {tn(link.key)}
                  </a>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{
                  fontSize: '.68rem', fontWeight: 700, color: 'var(--green)',
                  textTransform: 'uppercase', letterSpacing: '.1em',
                  fontFamily: 'var(--font-mono)', marginBottom: 8,
                }}>
                  Resources
                </span>
                {resources.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                    style={{
                      color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '.88rem',
                      transition: 'all .2s', display: 'inline-block',
                    }}
                  >
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginLeft: 4, verticalAlign: 'middle', opacity: 0.5 }}>
                      <path d="M7 7h10v10" /><path d="M7 17L21 3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border)', margin: '48px 0 24px' }} />

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: 12, paddingBottom: 32,
            }}>
              <p style={{
                fontSize: '.78rem', color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}>
                {t('credit')}
              </p>
              <a href="https://sejed.dev" target="_blank" rel="noopener noreferrer" style={{
                fontSize: '.72rem', color: 'var(--text-muted)', opacity: 0.6,
                textDecoration: 'none', transition: 'color .2s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                {t('attribution')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
