const fs = require('fs');
const path = require('path');
const https = require('https');

const PAGES = {
  en: { history: ['History_of_Palestine'], culture: ['Culture_of_Palestine'], activism: ['Boycott,_Divestment_and_Sanctions'], voices: ['Palestinians'], boycott: ['Boycott,_Divestment_and_Sanctions'] },
  ar: { history: ['تاريخ_فلسطين'], culture: ['ثقافة_فلسطين'], activism: ['مقاطعة_إسرائيل'], voices: ['فلسطينيون'], boycott: ['مقاطعة_إسرائيل'] },
  fr: { history: ['Histoire_de_la_Palestine'], culture: ['Palestine_(État)'], activism: ['Boycott,_désinvestissement_et_sanctions'], voices: ['Palestiniens'], boycott: ['Boycott,_désinvestissement_et_sanctions'] },
  he: { history: ['פלסטין'], culture: ['תרבות_פלסטינית'], activism: ['פלסטינים'], voices: ['פלסטינים'], boycott: ['פלסטינים'] },
};

const BASE_URLS = {
  en: 'en.wikipedia.org', ar: 'ar.wikipedia.org', fr: 'fr.wikipedia.org', he: 'he.wikipedia.org',
};

const SECTION_LABELS = {
  en: { history: 'History of Palestine', culture: 'Palestinian Culture', activism: 'Activism & Solidarity', voices: 'About Palestinians', boycott: 'BDS & Divestment' },
  ar: { history: 'تاريخ فلسطين', culture: 'ثقافة فلسطينية', activism: 'نشاط التضامن', voices: 'عن الفلسطينيين', boycott: 'المقاطعة وسحب الاستثمارات' },
  fr: { history: 'Histoire de la Palestine', culture: 'Culture palestinienne', activism: 'Solidarité & Activisme', voices: 'À propos des Palestiniens', boycott: 'BDS & Désinvestissement' },
  he: { history: 'היסטוריה של פלסטין', culture: 'תרבות פלסטינית', activism: 'סולידריות ואקטיביזם', voices: 'על פלסטינים', boycott: 'BDS והשקעה' },
};

const RSS_FEEDS = {
  en: [
    { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'aljazeera', topics: ['history|culture|voices|activism'] },
    { url: 'https://www.hrw.org/feed/all.xml', source: 'hrw', topics: ['activism|voices|history'] },
    { url: 'https://www.middleeasteye.net/rss', source: 'mee', topics: ['history|culture|voices|activism'] },
    { url: 'https://www.972mag.com/feed/', source: 'nine72', topics: ['activism|voices|history|culture'] },
  ],
};

const RSS_KEYWORDS = {
  history: ['gaza|west bank|jerusalem|nakba|1948|occupation|balfour|mandate|ottoman|canaanite|refugee|naksa|intifada|oslo|settlement|palestinian|israel|war|ceasefire|border|blockade'],
  culture: ['culture|heritage|embroidery|tatreez|cuisine|food|dabke|music|poetry|art|tradition|olive|keffiyeh|thobe|coffee|cinema|storytelling|hikaye|artist|writer|film|book|dance|cook|chef'],
  activism: ['activism|boycott|bds|sanctions|divestment|protest|solidarity|humanitarian|aid|resistance|sumud|flotilla|blockade|gaza|genocide|icj|unrwa|prisoner|detention|human rights|ceasefire|campus|student|rally|march|strike'],
  voices: ['testimony|witness|story|survivor|diaspora|journalist|poet|writer|child|family|mother|father|home|return|key|memory|identity|sumud|steadfast|grief|loss|hope|interview|profile|poem|letter'],
  boycott: ['boycott|bds|divestment|sanctions|settlements|settler|company|corporation|investment|pension|fund|university|academic|cultural|sport|isolation|apartheid|complicit|profiting|occupation|military|arms|weapons|embargo|campus'],
};

const UA = 'PalestineSite/1.0 (build-time; https://palestine.sejed.dev)';

function fetchURL(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      https.get(url, { headers: { 'User-Agent': UA }, timeout: 15000 }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', (e) => {
        if (n > 0) return setTimeout(() => attempt(n - 1), 3000);
        reject(e);
      });
    };
    attempt(retries);
  });
}

function fetchJSON(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      https.get(url, { headers: { 'User-Agent': UA }, timeout: 15000 }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (data.startsWith('<!') || data.startsWith('<') || data.startsWith('You are')) {
            if (n > 0) return setTimeout(() => attempt(n - 1), 4000);
            return reject(new Error('Rate limited'));
          }
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error(`Parse: ${e.message.slice(0, 80)}`)); }
        });
      }).on('error', (e) => {
        if (n > 0) setTimeout(() => attempt(n - 1), 2000);
        else reject(e);
      });
    };
    attempt(retries);
  });
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

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
    const desc = rawDesc
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'").replace(/&apos;/g, "'")
      .replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ')
      .replace(/\s+/g, ' ').trim();
    const pubDate = get('pubDate');
    const date = pubDate ? new Date(pubDate).toISOString() : null;
    if (title && title.length > 5 && desc && desc.length > 40) {
      items.push({ title: title.slice(0, 200), desc: desc.slice(0, 600), link, date });
    }
  }
  return items;
}

function parseSections(text) {
  const lines = text.split('\n');
  const sections = [];
  let current = { heading: 'Introduction', content: [] };
  for (const line of lines) {
    const m = line.match(/^={2,}\s*(.+?)\s*={2,}$/);
    if (m) {
      if (current.content.length > 0) {
        const joined = current.content.join(' ').replace(/\s+/g, ' ').trim();
        if (joined.length > 80) sections.push({ heading: current.heading, text: joined });
      }
      current = { heading: m[1].trim(), content: [] };
    } else if (line.trim()) {
      current.content.push(line.trim());
    }
  }
  if (current.content.length > 0) {
    const joined = current.content.join(' ').replace(/\s+/g, ' ').trim();
    if (joined.length > 80) sections.push({ heading: current.heading, text: joined });
  }
  return sections.slice(0, 30);
}

async function fetchWikipedia(locale, pageTitle) {
  const host = BASE_URLS[locale];
  const encoded = encodeURIComponent(pageTitle);
  const url = `https://${host}/w/api.php?action=query&prop=extracts&explaintext=1&exsectionformat=wiki&titles=${encoded}&format=json&exlimit=1`;
  try {
    const data = await fetchJSON(url);
    const pages = data.query && data.query.pages || {};
    for (const pid of Object.keys(pages)) {
      if (pid === '-1') continue;
      const p = pages[pid];
      if (p && p.extract && p.extract.length > 100) {
        const sections = parseSections(p.extract);
        return sections.map((s) => ({
          ...s, source: 'wikipedia', sourceUrl: `https://${host}/wiki/${encodeURIComponent(p.title.replace(/ /g, '_'))}`,
          date: '1900-01-01',
        }));
      }
    }
  } catch {}
  return [];
}

async function fetchRSS(feeds, pageKey, locale) {
  const items = [];
  const kw = RSS_KEYWORDS[pageKey];
  if (!kw) return [];
  const kwPattern = new RegExp(kw, 'i');
  for (const feed of feeds) {
    try {
      const xml = await fetchURL(feed.url);
      const parsed = simpleXML(xml);
      for (const item of parsed) {
        if (kwPattern.test(item.title + ' ' + item.desc)) {
          const sourceKey = feed.source;
          items.push({
            heading: item.title,
            text: item.desc,
            source: sourceKey,
            sourceUrl: item.link,
            date: item.date || new Date().toISOString().split('T')[0],
          });
        }
      }
    } catch {}
    await sleep(800);
  }
  return items;
}

async function main() {
  const outDir = path.join(__dirname, '..', 'public', 'content');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const locales = Object.keys(PAGES);
  let total = 0, ok = 0, skip = 0, err = 0;

  for (const locale of locales) {
    const localeDir = path.join(outDir, locale);
    if (!fs.existsSync(localeDir)) fs.mkdirSync(localeDir, { recursive: true });

    const pages = PAGES[locale];
    const labels = SECTION_LABELS[locale];
    const feeds = RSS_FEEDS[locale] || RSS_FEEDS.en || [];

    for (const [pageKey, titles] of Object.entries(pages)) {
      total++;
      process.stdout.write(`  [${locale}/${pageKey}] `);

      try {
        const allSections = [];

        // Wikipedia reference content
        for (const title of titles) {
          const wiki = await fetchWikipedia(locale, title);
          allSections.push(...wiki);
          await sleep(1200);
        }

        // RSS live content — disabled; news is fetched live via /api/news on the client side
        // const rss = await fetchRSS(feeds, pageKey, locale);
        // allSections.push(...rss);
        const rss = [];

        if (allSections.length === 0) {
          console.log('⚠ no content');
          skip++;
          continue;
        }

        // Sort by date descending (newest first) — Wikipedia entries have 1900-01-01 so they sink to bottom
        allSections.sort((a, b) => (b.date || '1900-01-01').localeCompare(a.date || '1900-01-01'));

        const output = { label: labels[pageKey] || pageKey, sections: allSections };
        fs.writeFileSync(path.join(localeDir, `${pageKey}.json`), JSON.stringify(output, null, 2), 'utf-8');
        console.log(`${allSections.length} sections ✓`);
        ok++;
      } catch (e) {
        console.log(`✗ ${e.message}`);
        err++;
      }
      await sleep(1000);
    }
  }
  console.log(`\nDone: ${ok} OK, ${skip} skipped, ${err} errors (${total} total)`);
}

main().catch(console.error);
