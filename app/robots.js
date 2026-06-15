export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
        crawlDelay: 5,
      },
    ],
    sitemap: 'https://palestine.sejed.dev/sitemap.xml',
  };
}
