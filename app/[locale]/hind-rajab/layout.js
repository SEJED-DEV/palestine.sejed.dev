export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Hind Rajab — Palestine',
    ar: 'هند رجب — فلسطين',
    fr: 'Hind Rajab — Palestine',
    he: 'הינד רג\'ב — פלסטין',
  };
  const descs = {
    en: 'The story of six-year-old Hind Rajab, killed in Gaza. Watch the documentary film that ensures the world remembers her name.',
    ar: 'قصة الطفلة هند رجب البالغة من العمر ست سنوات والتي قتلت في غزة. شاهد الفيلم الوثائقي.',
    fr: 'L\'histoire de Hind Rajab, six ans, tuée à Gaza. Regardez le film documentaire.',
    he: 'סיפורה של הינד רג\'ב, ילדה בת שש, שנהרגה בעזה. צפו בסרט התיעודי.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: { canonical: `${baseUrl}/${locale}/hind-rajab` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descs[locale] || descs.en,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
