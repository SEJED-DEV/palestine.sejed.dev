export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Search — Palestine',
    ar: 'بحث — فلسطين',
    fr: 'Recherche — Palestine',
    he: 'חיפוש — פלסטין',
  };
  const descs = {
    en: 'Search across all educational content about Palestine: history, culture, activism, voices, and more.',
    ar: 'ابحث في جميع المحتويات التعليمية عن فلسطين: التاريخ والثقافة والنشاط والأصوات والمزيد.',
    fr: 'Recherchez dans tout le contenu éducatif sur la Palestine : histoire, culture, activisme, voix et plus.',
    he: 'חפשו בכל התכנים החינוכיים על פלסטין: היסטוריה, תרבות, אקטיביזם, קולות ועוד.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/search`,
      languages: {
        en: `${baseUrl}/en/search`,
        ar: `${baseUrl}/ar/search`,
        fr: `${baseUrl}/fr/search`,
        he: `${baseUrl}/he/search`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descs[locale] || descs.en,
      url: `${baseUrl}/${locale}/search`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
