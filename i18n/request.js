import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const baseLocale = locale.split('-')[0];
  const supported = ['en', 'ar', 'fr', 'he'];

  if (!supported.includes(baseLocale)) {
    return {
      locale: 'en',
      messages: (await import(`../messages/en.json`)).default,
    };
  }

  return {
    locale: baseLocale,
    messages: (await import(`../messages/${baseLocale}.json`)).default,
  };
});
