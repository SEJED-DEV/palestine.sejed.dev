export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Sources & Further Reading — Palestine',
    ar: 'المصادر وقراءات إضافية — فلسطين',
    fr: 'Sources et Lectures Complémentaires — Palestine',
    he: 'מקורות וקריאה נוספת — פלסטין',
  };
  const descs = {
    en: 'Supplementary content sourced from Wikipedia, Al Jazeera, and other verified sources across history, culture, activism, and voices.',
    ar: 'محتوى إضافي من ويكيبيديا والجزيرة ومصادر موثقة أخرى عبر التاريخ والثقافة والنشاط والأصوات.',
    fr: 'Contenu supplémentaire provenant de Wikipédia, Al Jazeera et d\'autres sources vérifiées sur l\'histoire, la culture, l\'activisme et les voix.',
    he: 'תוכן משלים ממקורות ויקיפדיה, אל-ג\'זירה ומקורות מאומתים נוספים בנושאי היסטוריה, תרבות, אקטיביזם וקולות.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: { canonical: `${baseUrl}/${locale}/sources` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descs[locale] || descs.en,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
