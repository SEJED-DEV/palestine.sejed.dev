export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Palestinian Culture — Land, History, and Resistance',
    ar: 'الثقافة الفلسطينية — الأرض والتاريخ والمقاومة',
    fr: 'Culture Palestinienne — Terre, Histoire et Résistance',
    he: 'תרבות פלסטינית — אדמה, היסטוריה והתנגדות',
  };
  const descriptions = {
    en: 'Explore Palestinian culture: poetry of Mahmoud Darwish, traditional tatreez embroidery, dabke dance, olive trees, cuisine, and the vibrant heritage of Palestine.',
    ar: 'استكشف الثقافة الفلسطينية: شعر محمود درويش، التطريز التقليدي، الدبكة، شجر الزيتون، المطبخ، والتراث الحي لفلسطين.',
    fr: 'Explorez la culture palestinienne : la poésie de Mahmoud Darwish, la broderie tatreez traditionnelle, la danse dabke, les oliviers, la cuisine et le patrimoine vibrant de la Palestine.',
    he: 'חקרו את התרבות הפלסטינית: שירת מחמוד דרוויש, רקמת תטריז מסורתית, ריקוד דבקה, עצי זית, מטבח והמורשת התוססת של פלסטין.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/culture` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/culture`,
    },
  };
}

export default function CultureLayout({ children }) {
  return children;
}
