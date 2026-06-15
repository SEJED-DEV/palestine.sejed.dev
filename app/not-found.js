'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', gap: 16, textAlign: 'center', padding: '0 24px',
      background: 'var(--bg)',
    }}>
      <span style={{
        fontSize: '5rem', fontWeight: 800,
        background: 'linear-gradient(135deg, #e4312b, #149954)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        404
      </span>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>This page does not exist or has been moved.</p>
      <Link href="/en"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '14px 32px', borderRadius: 9999, fontSize: '.9rem', fontWeight: 600,
          background: '#e4312b', color: '#fff', textDecoration: 'none',
          boxShadow: '0 4px 24px rgba(228,49,43,.35)',
        }}
      >
        Go Home &rarr;
      </Link>
    </div>
  );
}
