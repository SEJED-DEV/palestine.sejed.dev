export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Reference Library — Palestine',
    ar: 'المكتبة المرجعية — فلسطين',
    fr: 'Bibliothèque de Référence — Palestine',
    he: 'ספריית עזר — פלסטין',
  };
  const descs = {
    en: 'Encyclopedia-style reference content about Palestine sourced from Wikipedia, organized by history, culture, activism, voices, and boycott.',
    ar: 'محتوى مرجعي موسوعي عن فلسطين من ويكيبيديا، منظم حسب التاريخ والثقافة والنشاط والأصوات والمقاطعة.',
    fr: 'Contenu de référence encyclopédique sur la Palestine provenant de Wikipédia, organisé par histoire, culture, activisme, voix et boycott.',
    he: 'תוכן עזר אנציקלופדי על פלסטין ממקור ויקיפדיה, מאורגן לפי היסטוריה, תרבות, אקטיביזם, קולות וחרם.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/references`,
      languages: {
        en: `${baseUrl}/en/references`,
        ar: `${baseUrl}/ar/references`,
        fr: `${baseUrl}/fr/references`,
        he: `${baseUrl}/he/references`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descs[locale] || descs.en,
      url: `${baseUrl}/${locale}/references`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
