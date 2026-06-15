export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Gaza Films — Documentaries and Cinema from Gaza',
    ar: 'أفلام غزة — أفلام وثائقية وسينما من غزة',
    fr: 'Films de Gaza — Documentaires et Cinéma de Gaza',
    he: 'סרטי עזה — סרטים תיעודיים וקולנוע מעזה',
  };
  const descriptions = {
    en: 'A curated collection of documentaries and films about Gaza, showcasing Palestinian resilience, the human cost of occupation, and the struggle for freedom.',
    ar: 'مجموعة منتقاة من الأفلام الوثائقية والأفلام عن غزة، تعرض الصمود الفلسطيني، والتكلفة البشرية للاحتلال، والنضال من أجل الحرية.',
    fr: 'Une collection organisée de documentaires et de films sur Gaza, mettant en valeur la résilience palestinienne, le coût humain de l\'occupation et la lutte pour la liberté.',
    he: 'אוסף curated של סרטים תיעודיים וסרטים על עזה, המציגים את החוסן הפלסטיני, המחיר האנושי של הכיבוש, והמאבק לחופש.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/gaza-films`,
      languages: {
        en: `${baseUrl}/en/gaza-films`,
        ar: `${baseUrl}/ar/gaza-films`,
        fr: `${baseUrl}/fr/gaza-films`,
        he: `${baseUrl}/he/gaza-films`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/gaza-films`,
    },
  };
}

export default function GazaFilmsLayout({ children }) {
  return children;
}
