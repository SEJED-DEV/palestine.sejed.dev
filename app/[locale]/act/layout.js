export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Take Action for Palestine — Land, History, and Resistance',
    ar: 'اتخذ إجراءً من أجل فلسطين — الأرض والتاريخ والمقاومة',
    fr: 'Agir pour la Palestine — Terre, Histoire et Résistance',
    he: 'פעלו למען פלסטין — אדמה, היסטוריה והתנגדות',
  };
  const descriptions = {
    en: 'Verified organizations supporting Palestine: PRCS, UNRWA, MAP, BDS movement. Boycott list, digital advocacy toolkit, and meaningful ways to take action.',
    ar: 'منظمات موثوقة تدعم فلسطين: جمعية الهلال الأحمر الفلسطيني، الأونروا، مشروع إغاثة الشرق الأوسط، حركة المقاطعة. قائمة المقاطعة، أدوات المناصرة الرقمية، وطرق هادفة لاتخاذ إجراء.',
    fr: 'Organisations vérifiées soutenant la Palestine : PRCS, UNRWA, MAP, mouvement BDS. Liste de boycott, boîte à outils de plaidoyer numérique et façons significatives d\'agir.',
    he: 'ארגונים מאומתים התומכים בפלסטין: הסהר האדום הפלסטיני, אונר"א, פרויקט סיוע למזרח התיכון, תנועת BDS. רשימת חרם, ערכת כלים דיגיטלית ודרכים משמעותיות לפעולה.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/act` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/act`,
    },
  };
}

export default function ActLayout({ children }) {
  return children;
}
