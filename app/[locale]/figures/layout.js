export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Palestinian Figures — Leaders, Poets, and Revolutionaries',
    ar: 'شخصيات فلسطينية — قادة وشعراء وثوار',
    fr: 'Figures Palestiniennes — Leaders, Poètes et Révolutionnaires',
    he: 'דמויות פלסטיניות — מנהיגים, משוררים ומהפכנים',
  };
  const descriptions = {
    en: 'Learn about the key Palestinian figures who shaped the struggle for justice — from Yasser Arafat to Mahmoud Darwish, Leila Khaled, and Edward Said.',
    ar: 'تعرف على الشخصيات الفلسطينية الرئيسية التي شكلت النضال من أجل العدالة — من ياسر عرفات إلى محمود درويش، ليلى خالد، وإدوارد سعيد.',
    fr: 'Découvrez les figures palestiniennes clés qui ont façonné la lutte pour la justice — de Yasser Arafat à Mahmoud Darwish, Leila Khaled et Edward Said.',
    he: 'למדו על הדמויות הפלסטיניות המרכזיות שעיצבו את המאבק לצדק — מיאסר ערפאת ועד מחמוד דרוויש, לילה ח\'אלד ואדוארד סעיד.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: { canonical: `${baseUrl}/${locale}/figures` },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/figures`,
    },
  };
}

export default function FiguresLayout({ children }) {
  return children;
}
