export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Voices of Palestine — Land, History, and Resistance',
    ar: 'أصوات فلسطين — الأرض والتاريخ والمقاومة',
    fr: 'Voix de la Palestine — Terre, Histoire et Résistance',
    he: 'קולות מפלסטין — אדמה, היסטוריה והתנגדות',
  };
  const descriptions = {
    en: 'Powerful Palestinian voices: Mahmoud Darwish, Ghassan Kanafani, Edward Said, and firsthand testimonies from Gaza, the West Bank, and the diaspora.',
    ar: 'أصوات فلسطينية قوية: محمود درويش، غسان كنفاني، إدوارد سعيد، وشهادات مباشرة من غزة والضفة الغربية والشتات.',
    fr: 'Voix palestiniennes puissantes : Mahmoud Darwish, Ghassan Kanafani, Edward Said, et des témoignages directs de Gaza, de Cisjordanie et de la diaspora.',
    he: 'קולות פלסטיניים רבי עוצמה: מחמוד דרוויש, ע\'סאן כנפאני, אדוארד סעיד, ועדויות ממקור ראשון מעזה, הגדה המערבית והתפוצות.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/voices` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/voices`,
    },
  };
}

export default function VoicesLayout({ children }) {
  return children;
}
