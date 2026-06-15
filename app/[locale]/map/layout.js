export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Map of Palestine — Historical and Modern Boundaries',
    ar: 'خريطة فلسطين — الحدود التاريخية والحديثة',
    fr: 'Carte de la Palestine — Frontières Historiques et Modernes',
    he: 'מפת פלסטין — גבולות היסטוריים ומודרניים',
  };
  const descriptions = {
    en: 'Explore the map of Palestine, from its historical boundaries to the modern-day occupation, settlements, and Palestinian territories.',
    ar: 'استكشف خريطة فلسطين، من حدودها التاريخية إلى الاحتلال الحديث والمستوطنات والأراضي الفلسطينية.',
    fr: 'Explorez la carte de la Palestine, de ses frontières historiques à l\'occupation moderne, aux colonies et aux territoires palestiniens.',
    he: 'חקרו את מפת פלסטין, מגבולותיה ההיסטוריים ועד הכיבוש המודרני, ההתנחלויות והשטחים הפלסטיניים.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/map` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/map`,
    },
  };
}

export default function MapLayout({ children }) {
  return children;
}
