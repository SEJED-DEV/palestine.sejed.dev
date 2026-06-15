import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar', 'fr', 'he'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
