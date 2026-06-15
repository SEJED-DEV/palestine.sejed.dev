export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Timeline of Palestine — Key Events and History',
    ar: 'الجدول الزمني لفلسطين — الأحداث الرئيسية والتاريخ',
    fr: 'Chronologie de la Palestine — Événements Clés et Histoire',
    he: 'ציר הזמן של פלסטין — אירועים מרכזיים והיסטוריה',
  };
  const descriptions = {
    en: 'A chronological timeline of key events in Palestine\'s history, from ancient Canaan through the British Mandate, Nakba, occupation, and the ongoing struggle.',
    ar: 'جدول زمني للأحداث الرئيسية في تاريخ فلسطين، من كنعان القديمة عبر الانتداب البريطاني والنكبة والاحتلال والنضال المستمر.',
    fr: 'Une chronologie des événements clés de l\'histoire de la Palestine, de l\'ancien Canaan au mandat britannique, en passant par la Nakba, l\'occupation et la lutte continue.',
    he: 'ציר זמן כרונולוגי של אירועים מרכזיים בהיסטוריה של פלסטין, מכנען העתיקה דרך המנדט הבריטי, הנכבה, הכיבוש והמאבק המתמשך.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/timeline` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/timeline`,
    },
  };
}

export default function TimelineLayout({ children }) {
  return children;
}
