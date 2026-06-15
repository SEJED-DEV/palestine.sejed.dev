export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Palestinian Refugees — The Right of Return',
    ar: 'اللاجئون الفلسطينيون — حق العودة',
    fr: 'Réfugiés Palestiniens — Le Droit au Retour',
    he: 'פליטים פלסטינים — זכות השיבה',
  };
  const descriptions = {
    en: 'Over 6 million Palestinian refugees, displaced since the 1948 Nakba, continue to demand their UN-sanctioned right of return. Learn their story.',
    ar: 'أكثر من 6 ملايين لاجئ فلسطيني، ممن شردتهم نكبة 1948، يواصلون المطالبة بحقهم في العودة الذي كفلته الأمم المتحدة. تعرف على قصتهم.',
    fr: 'Plus de 6 millions de réfugiés palestiniens, déplacés depuis la Nakba de 1948, continuent d\'exiger leur droit au retour sanctionné par l\'ONU. Découvrez leur histoire.',
    he: 'למעלה מ-6 מיליון פליטים פלסטינים, שנעקרו מאז הנכבה של 1948, ממשיכים לדרוש את זכות השיבה שאושרה על ידי האו"ם. למדו את סיפורם.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/refugees`,
      languages: {
        en: `${baseUrl}/en/refugees`,
        ar: `${baseUrl}/ar/refugees`,
        fr: `${baseUrl}/fr/refugees`,
        he: `${baseUrl}/he/refugees`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/refugees`,
    },
  };
}

export default function RefugeesLayout({ children }) {
  return children;
}
