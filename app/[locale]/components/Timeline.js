'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Timeline({ events }) {
  const [expanded, setExpanded] = useState({});

  if (!events || events.length === 0) return null;

  return (
    <div style={{ position: 'relative' }}>
      {/* Center line */}
      <div style={{
        position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
        background: 'linear-gradient(180deg, var(--red-dim), var(--red), var(--red-dim))',
        transform: 'translateX(-50%)', display: 'none',
      }} className="timeline-line" />

      {events.map((event, i) => {
        const isEven = i % 2 === 0;
        const isExpanded = expanded[i];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .5, delay: i * .08 }}
            onClick={() => setExpanded((p) => ({ ...p, [i]: !p[i] }))}
            style={{
              display: 'flex', gap: 24, marginBottom: 24,
              cursor: 'pointer', position: 'relative',
            }}
          >
            {/* Year badge */}
            <div style={{
              flexShrink: 0, width: 100, textAlign: 'right', paddingTop: 8,
            }}>
              <span style={{
                display: 'inline-block',
                fontSize: '.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                color: 'var(--red)', background: 'var(--red-dim)',
                padding: '4px 12px', borderRadius: 9999,
                whiteSpace: 'nowrap',
              }}>
                {event.year}
              </span>
            </div>

            {/* Content card */}
            <div style={{
              flex: 1, minWidth: 0,
              padding: '20px 24px', borderRadius: 14,
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderLeft: `3px solid var(--red)`,
              transition: 'border-color .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--red)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>
                {event.title}
              </h3>
              <p style={{
                fontSize: '.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0,
                display: isExpanded ? 'block' : '-webkit-box',
                WebkitBoxOrient: isExpanded ? 'unset' : 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: isExpanded ? 'none' : 3,
              }}>
                {event.desc}
              </p>
              {event.desc && event.desc.length > 200 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded((p) => ({ ...p, [i]: !p[i] })); }}
                  style={{
                    marginTop: 10, padding: '4px 12px', borderRadius: 6,
                    border: '1px solid var(--border)', background: 'transparent',
                    color: 'var(--text-muted)', cursor: 'pointer',
                    fontSize: '.72rem', fontFamily: 'var(--font-mono)',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red-dim)'; e.currentTarget.style.color = 'var(--red)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {isExpanded ? '▲ Show less' : '▼ Read more'}
                </button>
              )}
              {event.sources && event.sources.length > 0 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  {event.sources.map((src, si) => (
                    <a
                      key={si}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        fontSize: '.7rem', color: 'var(--text-muted)',
                        textDecoration: 'none', padding: '2px 8px',
                        borderRadius: 4, background: 'var(--border)',
                        transition: 'color .15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      {src.name} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
