export default function sitemap() {
  const baseUrl = 'https://palestine.sejed.dev';
  const locales = ['en', 'ar', 'fr', 'he'];
  const lastMod = new Date();

  const pages = [
    { path: '', priority: 1.0, changefreq: 'weekly' },
    { path: '/history', priority: 0.9, changefreq: 'monthly' },
    { path: '/culture', priority: 0.9, changefreq: 'monthly' },
    { path: '/al-quds', priority: 0.8, changefreq: 'monthly' },
    { path: '/gaza', priority: 0.8, changefreq: 'monthly' },
    { path: '/gaza-films', priority: 0.8, changefreq: 'monthly' },
    { path: '/jericho', priority: 0.8, changefreq: 'monthly' },
    { path: '/refugees', priority: 0.8, changefreq: 'monthly' },
    { path: '/voices', priority: 0.8, changefreq: 'monthly' },
    { path: '/act', priority: 0.8, changefreq: 'monthly' },
    { path: '/boycott', priority: 0.8, changefreq: 'monthly' },
    { path: '/hind-rajab', priority: 0.7, changefreq: 'monthly' },
    { path: '/timeline', priority: 0.8, changefreq: 'monthly' },
    { path: '/figures', priority: 0.8, changefreq: 'monthly' },
    { path: '/map', priority: 0.7, changefreq: 'monthly' },
    { path: '/sources', priority: 0.7, changefreq: 'weekly' },
    { path: '/search', priority: 0.6, changefreq: 'monthly' },
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: lastMod,
      changeFrequency: page.changefreq,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
        ),
      },
    }))
  );
}
