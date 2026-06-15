export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Divestment & Boycott Guide — Palestine',
    ar: 'دليل المقاطعة وسحب الاستثمارات — فلسطين',
    fr: 'Guide de Boycott et Désinvestissement — Palestine',
    he: 'מדריך חרם והשקעות — פלסטין',
  };
  const descs = {
    en: 'A continually updated list of companies complicit in violations of Palestinian rights, with verified sources and actionable steps.',
    ar: 'قائمة محدثة باستمرار للشركات المتواطئة في انتهاكات حقوق الفلسطينيين، مع مصادر موثقة وخطوات عملية.',
    fr: 'Une liste continuellement mise à jour des entreprises complices de violations des droits palestiniens, avec des sources vérifiées.',
    he: 'רשימה מתעדכנת של חברות שותפות להפרות זכויות פלסטינים, עם מקורות מאומתים וצעדים מעשיים.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descs[locale] || descs.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/boycott`,
      languages: {
        en: `${baseUrl}/en/boycott`,
        ar: `${baseUrl}/ar/boycott`,
        fr: `${baseUrl}/fr/boycott`,
        he: `${baseUrl}/he/boycott`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descs[locale] || descs.en,
      url: `${baseUrl}/${locale}/boycott`,
    },
  };
}

export default function Layout({ children }) {
  return children;
}
