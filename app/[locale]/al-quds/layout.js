export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Al-Quds (Jerusalem) — Palestine\'s Eternal Capital',
    ar: 'القدس — عاصمة فلسطين الأبدية',
    fr: 'Al-Quds (Jérusalem) — La Capitale Éternelle de la Palestine',
    he: 'אל-קודס (ירושלים) — בירתה הנצחית של פלסטין',
  };
  const descriptions = {
    en: 'Explore the history and significance of Al-Quds (Jerusalem), Palestine\'s eternal capital — a sacred city at the heart of the Palestinian struggle.',
    ar: 'استكشف تاريخ وأهمية القدس، عاصمة فلسطين الأبدية — مدينة مقدسة في قلب النضال الفلسطيني.',
    fr: 'Découvrez l\'histoire et la signification d\'Al-Quds (Jérusalem), la capitale éternelle de la Palestine — une ville sacrée au cœur de la lutte palestinienne.',
    he: 'חקרו את ההיסטוריה והמשמעות של אל-קודס (ירושלים), בירתה הנצחית של פלסטין — עיר קדושה בלב המאבק הפלסטיני.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/al-quds`,
      languages: {
        en: `${baseUrl}/en/al-quds`,
        ar: `${baseUrl}/ar/al-quds`,
        fr: `${baseUrl}/fr/al-quds`,
        he: `${baseUrl}/he/al-quds`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/al-quds`,
    },
  };
}

export default function AlQudsLayout({ children }) {
  return children;
}
