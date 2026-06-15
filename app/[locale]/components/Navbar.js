'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import PalestineLogo from './PalestineLogo';
import { useTheme } from './ThemeToggle';
import { useSearch } from './SearchProvider';

const locales = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'he', label: 'עברית', dir: 'rtl' },
];

const itemBase = {
  display: 'inline-flex', alignItems: 'center', height: 64, padding: '0 14px',
  fontSize: '.85rem', fontWeight: 500, color: 'var(--text-secondary)',
  textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit',
  border: 'none', background: 'transparent', borderRadius: 0,
  transition: 'color .2s, background .2s',
  position: 'relative',
};
const itemHover = { color: 'var(--text)', background: 'var(--red-dim)' };
const itemActive = { color: 'var(--red)', background: 'var(--red-dim)' };

const dropdownItemBase = {
  display: 'flex', alignItems: 'center', gap: 10,
  width: '100%', padding: '9px 14px',
  textDecoration: 'none', borderRadius: 8, border: 'none',
  color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '.85rem',
  fontFamily: 'inherit', textAlign: 'left',
  transition: 'all .15s', background: 'transparent',
};

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const { openSearch } = useSearch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const langRef = useRef(null);
  const groupTimer = useRef(null);

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] || 'en';
  const pathWithoutLocale = '/' + segments.slice(1).join('/');

  const navGroups = [
    { key: 'learn', label: t('learn'), children: [
      { href: '/history', label: t('history') },
      { href: '/culture', label: t('culture') },
      { href: '/al-quds', label: t('alQuds') },
      { href: '/gaza', label: t('gaza') },
      { href: '/jericho', label: t('jericho') },
      { href: '/refugees', label: t('refugees') },
      { href: '/voices', label: t('voices') },
      { href: '/timeline', label: t('timeline') },
      { href: '/figures', label: t('figures') },
    ]},
    { key: 'act', label: t('act'), children: [
      { href: '/act', label: t('activism') },
      { href: '/boycott', label: t('boycott') },
    ]},
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  function switchLocale(code) {
    setLangOpen(false);
    setMobileOpen(false);
    router.push(`/${code}${pathWithoutLocale}`);
  }

  function isActive(href) {
    if (href === '/') return pathname === `/${currentLocale}`;
    return pathname.startsWith(`/${currentLocale}${href}`);
  }

  function isGroupActive(group) {
    return group.children.some((c) => isActive(c.href));
  }

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 64,
        display: 'flex', alignItems: 'center',
        background: scrolled ? 'var(--bg-alt)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background .4s ease, border-color .4s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={`/${currentLocale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <PalestineLogo variant="horizontal" size={22} />
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile && (
              <div style={{ display: 'flex', gap: 0, position: 'relative' }}
                onMouseLeave={() => setGroupOpen(null)}
              >
                <a
                  href={`/${currentLocale}`}
                  className="nav-link"
                  style={{
                    ...itemBase,
                    ...(isActive('/') ? itemActive : {}),
                  }}
                  onMouseEnter={(e) => { if (!isActive('/')) { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.color = 'var(--text)'; } }}
                  onMouseLeave={(e) => { if (!isActive('/')) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
                >
                  {t('home')}
                </a>
                {navGroups.map((group) => (
                  <div
                    key={group.key}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => {
                      if (groupTimer.current) clearTimeout(groupTimer.current);
                      groupTimer.current = setTimeout(() => setGroupOpen(group.key), 100);
                    }}
                    onMouseLeave={() => {
                      if (groupTimer.current) clearTimeout(groupTimer.current);
                      groupTimer.current = setTimeout(() => setGroupOpen(null), 200);
                    }}
                  >
                    <button
                      style={{
                        ...itemBase,
                        gap: 4,
                        ...(isGroupActive(group) || groupOpen === group.key ? itemActive : {}),
                      }}
                      onMouseEnter={(e) => { if (!isGroupActive(group) && groupOpen !== group.key) { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.color = 'var(--text)'; } }}
                      onMouseLeave={(e) => { if (!isGroupActive(group) && groupOpen !== group.key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
                      onClick={() => setGroupOpen(groupOpen === group.key ? null : group.key)}
                    >
                      {group.label}
                      <motion.svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                        animate={{ rotate: groupOpen === group.key ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {groupOpen === group.key && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute', top: '100%', left: 0, marginTop: 4,
                            background: 'var(--bg-alt)',
                            border: '1px solid var(--border)',
                            borderRadius: 12, padding: 4, minWidth: 170, zIndex: 100,
                            boxShadow: 'var(--shadow-lg)',
                          }}
                        >
                          {group.children.map((child) => (
                            <a
                              key={child.href}
                              href={`/${currentLocale}${child.href}`}
                              onClick={() => setGroupOpen(null)}
                              style={{
                                ...dropdownItemBase,
                                background: isActive(child.href) ? 'var(--red-dim)' : 'transparent',
                                color: isActive(child.href) ? 'var(--red)' : 'var(--text-secondary)',
                              }}
                              onMouseEnter={(e) => { if (!isActive(child.href)) { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--text)'; } }}
                              onMouseLeave={(e) => { if (!isActive(child.href)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
                            >
                              {isActive(child.href) && (
                                <span style={{
                                  width: 3, height: 16, borderRadius: 2,
                                  background: 'var(--red)', flexShrink: 0,
                                }} />
                              )}
                              <span style={{ marginLeft: isActive(child.href) ? 0 : 13 }}>{child.label}</span>
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {[
                  { href: '/hind-rajab', label: t('hindRajab') },
                  { href: '/gaza-films', label: t('gazaFilms') },
                  { href: '/sources', label: t('sources') },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={`/${currentLocale}${link.href}`}
                    className="nav-link"
                    style={{
                      ...itemBase,
                      ...(isActive(link.href) ? itemActive : {}),
                    }}
                    onMouseEnter={(e) => { if (!isActive(link.href)) { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.color = 'var(--text)'; } }}
                    onMouseLeave={(e) => { if (!isActive(link.href)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: isMobile ? 0 : 8 }}>
              <button
                onClick={openSearch}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: 8,
                  border: '1px solid var(--border)', background: 'transparent',
                  color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem',
                  transition: 'all .2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--red)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                aria-label="Search"
                title="Search (Cmd+K)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              {mounted && (
                <button
                  onClick={toggleTheme}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 36, height: 36, borderRadius: 8,
                    border: '1px solid var(--border)', background: 'transparent',
                    color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--red)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    )}
                  </motion.div>
                </button>
              )}

              <div ref={langRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 12px', borderRadius: 8,
                    border: '1px solid var(--border)', background: 'transparent',
                    color: 'var(--text-secondary)', cursor: 'pointer',
                    fontSize: '.82rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
                    letterSpacing: '.02em', transition: 'all .2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--red)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  aria-label={t('language')}
                >
                  <span style={{ fontFamily: 'inherit' }}>{currentLocale.toUpperCase()}</span>
                  <motion.svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                    animate={{ rotate: langOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: '100%', right: 0, marginTop: 8,
                        background: 'var(--bg-alt)',
                        border: '1px solid var(--border)',
                        borderRadius: 12, padding: 4, minWidth: 160, zIndex: 100,
                        boxShadow: 'var(--shadow-lg)',
                      }}
                    >
                      {locales.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => switchLocale(l.code)}
                          style={{
                            ...dropdownItemBase,
                            background: l.code === currentLocale ? 'var(--red-dim)' : 'transparent',
                            color: l.code === currentLocale ? 'var(--red)' : 'var(--text-secondary)',
                          }}
                          dir={l.dir}
                          onMouseEnter={(e) => { if (l.code !== currentLocale) { e.currentTarget.style.background = 'var(--bg)'; e.currentTarget.style.color = 'var(--text)'; } }}
                          onMouseLeave={(e) => { if (l.code !== currentLocale) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
                        >
                          <span style={{
                            width: 24, height: 16, borderRadius: 2, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '.6rem', fontWeight: 700,
                            background: l.code === currentLocale ? 'var(--red)' : 'var(--border)',
                            color: l.code === currentLocale ? '#fff' : 'var(--text-muted)',
                            flexShrink: 0,
                          }}>
                            {l.code.toUpperCase()}
                          </span>
                          {l.label}
                          {l.code === currentLocale && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  display: isMobile ? 'flex' : 'none',
                  flexDirection: 'column', gap: 5,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: 8, marginLeft: 4,
                }}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  style={{
                    display: 'block', height: 2, background: 'var(--text-secondary)', borderRadius: 1,
                    width: 20, transformOrigin: 'center',
                  }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  style={{
                    display: 'block', height: 2, background: 'var(--text-secondary)', borderRadius: 1,
                    width: 16, transformOrigin: 'center',
                  }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  style={{
                    display: 'block', height: 2, background: 'var(--text-secondary)', borderRadius: 1,
                    width: 20, transformOrigin: 'center',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
              padding: '24px 24px 32px',
              background: 'var(--bg)',
              borderBottom: '1px solid var(--border)',
              zIndex: 999, display: 'flex', flexDirection: 'column', gap: 0,
              overflowY: 'auto',
            }}
          >
            <a
              href={`/${currentLocale}`}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '18px 0',
                color: isActive('/') ? 'var(--red)' : 'var(--text-secondary)',
                textDecoration: 'none', fontSize: '1.05rem',
                fontWeight: isActive('/') ? 600 : 500,
                borderBottom: '1px solid var(--border)',
                transition: 'color .2s',
              }}
            >
              {isActive('/') && <span style={{ width: 3, height: 20, borderRadius: 2, background: 'var(--red)', flexShrink: 0 }} />}
              <span style={{ marginLeft: isActive('/') ? 0 : 15 }}>{t('home')}</span>
            </a>
            {navGroups.map((group) => (
              <div key={group.key}>
                <div style={{
                  fontSize: '.68rem', fontWeight: 700, color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '.1em',
                  fontFamily: 'var(--font-mono)', padding: '16px 0 8px',
                }}>
                  {group.label}
                </div>
                {group.children.map((child, i) => (
                  <motion.a
                    key={child.href}
                    href={`/${currentLocale}${child.href}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 0',
                      color: isActive(child.href) ? 'var(--red)' : 'var(--text-secondary)',
                      textDecoration: 'none', fontSize: '1rem',
                      fontWeight: isActive(child.href) ? 600 : 500,
                      borderBottom: '1px solid var(--border)',
                      transition: 'color .2s',
                    }}
                  >
                    {isActive(child.href) && <span style={{ width: 3, height: 20, borderRadius: 2, background: 'var(--red)', flexShrink: 0 }} />}
                    <span style={{ marginLeft: isActive(child.href) ? 0 : 15 }}>{child.label}</span>
                  </motion.a>
                ))}
              </div>
            ))}
            <div style={{ fontSize: '.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.1em', fontFamily: 'var(--font-mono)', padding: '16px 0 8px' }}>More</div>
            {[
              { href: '/hind-rajab', label: t('hindRajab') },
              { href: '/sources', label: t('sources') },
            ].map((link, i) => (
              <motion.a
                key={link.href}
                href={`/${currentLocale}${link.href}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 0',
                  color: isActive(link.href) ? 'var(--red)' : 'var(--text-secondary)',
                  textDecoration: 'none', fontSize: '1rem',
                  fontWeight: isActive(link.href) ? 600 : 500,
                  borderBottom: '1px solid var(--border)',
                  transition: 'color .2s',
                }}
              >
                {isActive(link.href) && <span style={{ width: 3, height: 20, borderRadius: 2, background: 'var(--red)', flexShrink: 0 }} />}
                <span style={{ marginLeft: isActive(link.href) ? 0 : 15 }}>{link.label}</span>
              </motion.a>
            ))}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 28,
            }}>
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  style={{
                    padding: '14px 12px', borderRadius: 10,
                    border: '1px solid var(--border)',
                    background: l.code === currentLocale ? 'var(--red-dim)' : 'transparent',
                    color: l.code === currentLocale ? 'var(--red)' : 'var(--text-secondary)',
                    cursor: 'pointer', fontSize: '.88rem', fontFamily: 'inherit', fontWeight: 500, textAlign: 'center',
                    transition: 'all .15s',
                  }}
                  dir={l.dir}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
