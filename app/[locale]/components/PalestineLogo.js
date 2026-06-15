'use client';

export default function PalestineLogo({ variant = 'horizontal', size = 24, style: extStyle }) {
  const flagSize = variant === 'favicon' ? size : size;
  const flag = (
    <svg
      width={flagSize}
      height={flagSize * (2 / 3)}
      viewBox="0 0 900 600"
      style={{ borderRadius: variant === 'horizontal' ? 3 : 4, flexShrink: 0 }}
      aria-label="Flag of Palestine"
    >
      <rect width="900" height="600" fill="#000" />
      <rect y="200" width="900" height="200" fill="#fff" />
      <rect y="400" width="900" height="200" fill="#149954" />
      <polygon points="0,0 300,300 0,600" fill="#e4312b" />
    </svg>
  );

  if (variant === 'favicon') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={extStyle} aria-label="Palestine">
        <rect width="24" height="24" fill="#000" />
        <rect y="8" width="24" height="8" fill="#fff" />
        <rect y="16" width="24" height="8" fill="#149954" />
        <polygon points="0,0 12,12 0,24" fill="#e4312b" />
      </svg>
    );
  }

  if (variant === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, ...extStyle }}>
        <svg width={48} height={32} viewBox="0 0 900 600" aria-label="Flag of Palestine" style={{ borderRadius: 4 }}>
          <rect width="900" height="600" fill="#000" />
          <rect y="200" width="900" height="200" fill="#fff" />
          <rect y="400" width="900" height="200" fill="#149954" />
          <polygon points="0,0 300,300 0,600" fill="#e4312b" />
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #e4312b, #149954)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            Palestine
          </div>
          <div style={{
            fontSize: '0.68rem',
            color: '#888',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginTop: 2,
          }}>
            Land · History · Resistance
          </div>
        </div>
      </div>
    );
  }

  // horizontal (default)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...extStyle }}>
      {flag}
      <div>
        <div style={{
          fontSize: variant === 'sm' ? '0.95rem' : '1.05rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #e4312b, #149954)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}>
          Palestine
        </div>
        <div style={{
          fontSize: '0.6rem',
          color: '#777',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginTop: 1,
        }}>
          Land · History · Resistance
        </div>
      </div>
    </div>
  );
}
