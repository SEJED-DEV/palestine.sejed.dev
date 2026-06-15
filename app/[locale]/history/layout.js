export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'History of Palestine — Land, History, and Resistance',
    ar: 'تاريخ فلسطين — الأرض والتاريخ والمقاومة',
    fr: 'Histoire de la Palestine — Terre, Histoire et Résistance',
    he: 'היסטוריה של פלסטין — אדמה, היסטוריה והתנגדות',
  };
  const descriptions = {
    en: 'From Canaan and the Ottoman Empire to the Nakba, occupation, and today — a comprehensive timeline of Palestine\'s history with sourced events.',
    ar: 'من كنعان والإمبراطورية العثمانية إلى النكبة والاحتلال واليوم — جدول زمني شامل لتاريخ فلسطين مع أحداث موثقة.',
    fr: 'De Canaan et l\'Empire ottoman à la Nakba, l\'occupation et aujourd\'hui — une chronologie complète de l\'histoire de la Palestine avec des événements sourcés.',
    he: 'מכנען והאימפריה העות\'מאנית אל הנכבה, הכיבוש והיום — ציר זמן מקיף של ההיסטוריה של פלסטין עם אירועים מתועדים.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/history` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/history`,
    },
  };
}

export default function HistoryLayout({ children }) {
  return children;
}
