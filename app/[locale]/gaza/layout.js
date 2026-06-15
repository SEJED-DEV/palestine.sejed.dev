export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Gaza — The Largest Open-Air Prison in the World',
    ar: 'غزة — أكبر سجن مفتوح في العالم',
    fr: 'Gaza — La Plus Grande Prison à Ciel Ouvert du Monde',
    he: 'עזה — הכלא הפתוח הגדול בעולם',
  };
  const descriptions = {
    en: 'The story of Gaza: a besieged strip of 2.3 million people, enduring blockade, war, and occupation. Learn about its history, resilience, and struggle.',
    ar: 'قصة غزة: قطاع محاصر يضم 2.3 مليون شخص، يعاني من الحصار والحرب والاحتلال. تعرف على تاريخه وصموده ونضاله.',
    fr: 'L\'histoire de Gaza : une bande assiégée de 2,3 millions de personnes, subissant le blocus, la guerre et l\'occupation. Découvrez son histoire, sa résilience et sa lutte.',
    he: 'הסיפור של עזה: רצועה נצורה של 2.3 מיליון איש, תחת מצור, מלחמה וכיבוש. למדו על ההיסטוריה, החוסן והמאבק.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/gaza`,
      languages: {
        en: `${baseUrl}/en/gaza`,
        ar: `${baseUrl}/ar/gaza`,
        fr: `${baseUrl}/fr/gaza`,
        he: `${baseUrl}/he/gaza`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/gaza`,
    },
  };
}

export default function GazaLayout({ children }) {
  return children;
}
