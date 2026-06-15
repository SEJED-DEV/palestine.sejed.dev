'use client';
import { Fragment } from 'react';

const glossary = [
  { key: 'Nakba', def: 'The "catastrophe" of 1948, when over 750,000 Palestinians were expelled or fled during the establishment of Israel.' },
  { key: 'Naksa', def: 'The "setback" of 1967, when Israel occupied the remaining Palestinian territories (West Bank, Gaza, East Jerusalem).' },
  { key: 'BDS', def: 'Boycott, Divestment and Sanctions — a Palestinian-led movement for freedom, justice, and equality.' },
  { key: 'Intifada', def: 'Arabic for "shaking off" — Palestinian uprisings against Israeli occupation (1987 and 2000).' },
  { key: 'UNRWA', def: 'UN Relief and Works Agency — provides education, health, and aid to Palestinian refugees.' },
  { key: 'Apartheid', def: 'Institutionalized racial segregation. Human rights organizations have concluded Israel practices apartheid against Palestinians.' },
  { key: 'Sumud', def: 'Arabic for "steadfastness" — a Palestinian ethos of resilience and nonviolent resistance.' },
];

export default function GlossaryText({ text }) {
  if (!text) return text;

  const sorted = [...glossary].sort((a, b) => b.key.length - a.key.length);
  const parts = [];
  let remaining = text;

  while (remaining.length > 0) {
    let found = false;
    for (const entry of sorted) {
      const idx = remaining.indexOf(entry.key);
      if (idx === -1) continue;
      if (idx > 0) parts.push(remaining.slice(0, idx));
      const beforeKey = remaining.slice(0, idx);
      const afterKey = remaining.slice(idx + entry.key.length);
      parts.push(
        <span key={parts.length} style={{ position: 'relative', display: 'inline' }}>
          <span className="glossary-term">{entry.key}</span>
          <span className="glossary-tip">{entry.def}</span>
        </span>
      );
      remaining = afterKey;
      found = true;
      break;
    }
    if (!found) { parts.push(remaining); break; }
  }

  return <>{parts}</>;
}
