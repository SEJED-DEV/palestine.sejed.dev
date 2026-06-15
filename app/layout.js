import './globals.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Palestine Awareness',
      url: 'https://palestine.sejed.dev',
      description: 'Educational resource about Palestine: its ancient history, rich culture, and ongoing struggle for justice and freedom.',
      inLanguage: ['en', 'ar', 'fr', 'he'],
      about: { '@type': 'Thing', name: 'Palestine', description: 'Educational resource about Palestine\'s history, culture, and the Palestinian struggle for justice.' },
      potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://palestine.sejed.dev/{locale}/search?q={search_term_string}' }, 'query-input': 'required name=search_term_string' },
    },
    {
      '@type': 'Organization',
      name: 'Palestine Awareness',
      url: 'https://palestine.sejed.dev',
      logo: 'https://palestine.sejed.dev/og-image.png',
      description: 'Educational platform dedicated to raising awareness about Palestine\'s history, culture, and the Palestinian struggle for justice and freedom.',
      sameAs: [],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Hebrew:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
