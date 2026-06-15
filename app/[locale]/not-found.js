'use client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  const pathname = usePathname();
  const locale = pathname.split('/').filter(Boolean)[0] || 'en';

  return (
    <div style={notFoundStyles.container}>
      <span style={notFoundStyles.code}>404</span>
      <h1 style={notFoundStyles.title}>{t('title')}</h1>
      <p style={notFoundStyles.desc}>{t('desc')}</p>
      <Link href={`/${locale}`} className="btn btn-primary">
        {t('cta')} &rarr;
      </Link>
    </div>
  );
}

const notFoundStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    gap: 16,
    textAlign: 'center',
    padding: '0 24px',
  },
  code: {
    fontSize: '5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, var(--red), var(--green))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontFamily: "'JetBrains Mono', monospace",
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  desc: {
    color: 'var(--text-secondary)',
    marginBottom: 8,
  },
};
