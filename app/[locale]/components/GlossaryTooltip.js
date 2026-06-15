'use client';
import { useState } from 'react';

const glossary = {
  nakba: {
    term: 'Nakba',
    def: 'The "catastrophe" of 1948, when over 750,000 Palestinians were expelled or fled from their homes during the establishment of Israel.',
  },
  naksa: {
    term: 'Naksa',
    def: 'The "setback" of 1967, when Israel occupied the remaining Palestinian territories (West Bank, Gaza, East Jerusalem) along with Syrian Golan and Egyptian Sinai.',
  },
  bds: {
    term: 'BDS',
    def: 'Boycott, Divestment and Sanctions — a Palestinian-led movement for freedom, justice, and equality, modeled on the South African anti-apartheid campaign.',
  },
  intifada: {
    term: 'Intifada',
    def: 'Arabic for "shaking off" — refers to Palestinian uprisings against Israeli occupation. The First Intifada (1987) and Second Intifada (2000).',
  },
  PRCS: { term: 'PRCS', def: 'Palestine Red Crescent Society — the Palestinian equivalent of the Red Cross, providing emergency medical services in Palestine.' },
  UNRWA: { term: 'UNRWA', def: 'United Nations Relief and Works Agency — provides education, health, and aid to registered Palestinian refugees across the region.' },
  apartheid: { term: 'Apartheid', def: 'A system of institutionalized racial segregation and discrimination. Multiple human rights organizations have concluded Israel practices apartheid against Palestinians.' },
  'oslo-accords': {
    term: 'Oslo Accords',
    def: 'A 1993-1995 set of agreements between Israel and the PLO that created the Palestinian Authority and divided the West Bank into Areas A, B, and C.',
  },
};

export default function GlossaryTooltip({ term, children }) {
  const entry = glossary[term.toLowerCase()];
  const [show, setShow] = useState(false);

  if (!entry) return children;

  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          borderBottom: '1px dashed var(--red-dim)',
          color: 'var(--red)', cursor: 'help',
          fontWeight: 500,
        }}
      >
        {children}
      </span>
      {show && (
        <span style={{
          position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
          marginBottom: 8, zIndex: 9999,
          padding: '8px 12px', borderRadius: 8,
          background: 'var(--bg-alt)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          fontSize: '.78rem', color: 'var(--text-secondary)',
          lineHeight: 1.5, width: 260,
          pointerEvents: 'none',
        }}>
          <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 2 }}>{entry.term}</strong>
          {entry.def}
        </span>
      )}
    </span>
  );
}
