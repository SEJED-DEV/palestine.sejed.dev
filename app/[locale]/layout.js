import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContextMenu from './components/ContextMenu';
import LanguageModal from './components/LanguageModal';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';
import PreFooter from './components/PreFooter';
import ShortcutsModal from './components/ShortcutsModal';
import SearchProvider from './components/SearchProvider';
import SearchModal from './components/SearchModal';
import ThemeProvider from './components/ThemeToggle';
import HtmlLangSetter from './components/HtmlLangSetter';

const locales = ['en', 'ar', 'fr', 'he'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
  const baseUrl = 'https://palestine.sejed.dev';

  const titles = {
    en: 'Palestine — Land, History, and Resistance',
    ar: 'فلسطين — الأرض والتاريخ والمقاومة',
    fr: 'Palestine — Terre, Histoire et Résistance',
    he: 'פלסטין — אדמה, היסטוריה והתנגדות',
  };

  const descriptions = {
    en: 'Learn about Palestine: its ancient history, rich culture, and ongoing struggle for justice and freedom.',
    ar: 'تعرف على فلسطين: تاريخها العريق، ثقافتها الغنية، ونضالها المستمر من أجل العدالة والحرية.',
    fr: 'Découvrez la Palestine : son histoire ancienne, sa riche culture et la lutte continue pour la justice et la liberté.',
    he: 'למדו על פלסטין: ההיסטוריה העתיקה שלה, תרבותה העשירה, והמאבק המתמשך לצדק וחופש.',
  };

  const ogLocales = { en: 'en_US', ar: 'ar_SA', fr: 'fr_FR', he: 'he_IL' };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: { en: '/en', ar: '/ar', fr: '/fr', he: '/he' },
    },
    openGraph: {
      type: 'website', url: `${baseUrl}/${locale}`,
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      siteName: 'Palestine Awareness',
      locale: ogLocales[locale] || 'en_US',
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'Palestine — Land, History, and Resistance' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [`${baseUrl}/og-image.png`],
      site: '@sejeddev',
      creator: '@sejeddev',
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  return (
    <>
      <HtmlLangSetter locale={locale} dir={dir} />
      <ScrollProgressBar />
      <ShortcutsModal />
      <ThemeProvider>
        <NextIntlClientProvider messages={messages}>
          <SearchProvider>
            <ContextMenu />
            <LanguageModal />
            <SearchModal />
            <Navbar />
          <main style={{ flex: 1, paddingTop: 64 }}>
            {children}
            <PreFooter />
          </main>
          <Footer />
          <BackToTop />
          </SearchProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  );
}
