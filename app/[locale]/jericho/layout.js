export async function generateMetadata({ params }) {
  const { locale } = await params;
  const baseUrl = 'https://palestine.sejed.dev';
  const titles = {
    en: 'Jericho — The Oldest City in the World',
    ar: 'أريحا — أقدم مدينة في العالم',
    fr: 'Jéricho — La Plus Ancienne Ville du Monde',
    he: 'יריחו — העיר העתיקה בעולם',
  };
  const descriptions = {
    en: 'Discover Jericho, the oldest continuously inhabited city in the world, located in the heart of Palestine. History, archaeology, and resilience.',
    ar: 'اكتشف أريحا، أقدم مدينة مأهولة بالسكان في العالم، الواقعة في قلب فلسطين. تاريخ، آثار، وصمود.',
    fr: 'Découvrez Jéricho, la plus ancienne ville habitée en continu au monde, située au cœur de la Palestine. Histoire, archéologie et résilience.',
    he: 'גלו את יריחו, העיר העתיקה ביותר בעולם המאוכלסת ברציפות, הממוקמת בלב פלסטין. היסטוריה, ארכאולוגיה וחוסן.',
  };
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/jericho`,
      languages: {
        en: `${baseUrl}/en/jericho`,
        ar: `${baseUrl}/ar/jericho`,
        fr: `${baseUrl}/fr/jericho`,
        he: `${baseUrl}/he/jericho`,
      },
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}/jericho`,
    },
  };
}

export default function JerichoLayout({ children }) {
  return children;
}
