import { NextResponse } from 'next/server';

const RSS_FEEDS = [
  { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'aljazeera' },
  { url: 'https://www.hrw.org/feed/all.xml', source: 'hrw' },
  { url: 'https://www.middleeasteye.net/rss', source: 'mee' },
  { url: 'https://www.972mag.com/feed/', source: 'nine72' },
];

const RSS_KEYWORDS = {
  history: 'gaza|west bank|jerusalem|nakba|1948|occupation|balfour|mandate|ottoman|canaanite|refugee|naksa|intifada|oslo|settlement|palestinian|israel|war|ceasefire|border|blockade',
  culture: 'culture|heritage|embroidery|tatreez|cuisine|food|dabke|music|poetry|art|tradition|olive|keffiyeh|thobe|coffee|cinema|storytelling|hikaye|artist|writer|film|book|dance|cook|chef',
  activism: 'activism|boycott|bds|sanctions|divestment|protest|solidarity|humanitarian|aid|resistance|sumud|flotilla|blockade|gaza|genocide|icj|unrwa|prisoner|detention|human rights|ceasefire|campus|student|rally|march|strike',
  voices: 'testimony|witness|story|survivor|diaspora|journalist|poet|writer|child|family|mother|father|home|return|key|memory|identity|sumud|steadfast|grief|loss|hope|interview|profile|poem|letter',
  boycott: 'boycott|bds|divestment|sanctions|settlements|settler|company|corporation|investment|pension|fund|university|academic|cultural|sport|isolation|apartheid|complicit|profiting|occupation|military|arms|weapons|embargo|campus',
};

function decodeEntities(str) {
  return str
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#x2F;/g, '/').replace(/&#x27;/g, "'");
}

function simpleXML(text) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRegex.exec(text)) !== null) {
    const block = m[1];
    const get = (tag) => {
      const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
      const x = r.exec(block);
      const raw = x ? x[1].trim() : '';
      return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
    };
    const title = get('title');
    const link = get('link');
    const rawDesc = get('description');
    const desc = decodeEntities(rawDesc).replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').replace(/\s+/g, ' ').trim();
    const pubDate = get('pubDate');
    const date = pubDate ? new Date(pubDate).toISOString() : null;
    if (title && title.length > 5 && desc && desc.length > 40) {
      items.push({ title: title.slice(0, 200), desc: desc.slice(0, 600), link, date });
    }
  }
  return items;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  const page = searchParams.get('page') || 'history';
  const force = searchParams.get('force') === '1';

  const kw = RSS_KEYWORDS[page];
  if (!kw) {
    return NextResponse.json({ sections: [] });
  }

  const kwPattern = new RegExp(kw, 'i');
  const results = [];

  const TIMEOUT_MS = 8000;

  const fetches = RSS_FEEDS.map(async (feed, i) => {
    try {
      const res = await fetch(feed.url, {
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'User-Agent': 'PalestineSite/1.0' },
        next: { revalidate: 0 },
      });
      if (!res.ok) return;
      const xml = await res.text();
      const parsed = simpleXML(xml);
      for (const item of parsed) {
        if (kwPattern.test(item.title + ' ' + item.desc)) {
          results.push({
            heading: item.title,
            text: item.desc,
            source: feed.source,
            sourceUrl: item.link,
            date: item.date || new Date().toISOString().split('T')[0],
          });
        }
      }
    } catch { /* skip failed feeds */ }
  });

  await Promise.allSettled(fetches);

  results.sort((a, b) => (b.date || '1900-01-01').localeCompare(a.date || '1900-01-01'));

  return NextResponse.json({ sections: results, fetchedAt: new Date().toISOString() }, {
    headers: {
      'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
      'Vary': '*',
    },
  });
}
