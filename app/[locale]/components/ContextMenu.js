'use client';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ITEM_DEFS = [
  { id: 'top', type: 'nav', icon: '↑', labelKey: 'common.top' },
  { type: 'divider' },
  { id: 'home', type: 'nav', icon: '⌂', labelKey: 'nav.home' },
  { type: 'group', labelKey: 'nav.learn', icon: '📖', children: [
    { id: 'history', icon: '📜', labelKey: 'nav.history' },
    { id: 'culture', icon: '🎭', labelKey: 'nav.culture' },
    { id: 'gaza', icon: '🌊', labelKey: 'nav.gaza' },
    { id: 'al-quds', icon: '🕌', labelKey: 'nav.alQuds' },
    { id: 'jericho', icon: '🏛️', labelKey: 'nav.jericho' },
    { id: 'refugees', icon: '🔑', labelKey: 'nav.refugees' },
    { id: 'voices', icon: '🗣️', labelKey: 'nav.voices' },
    { id: 'timeline', icon: '📊', labelKey: 'nav.timeline' },
    { id: 'figures', icon: '👤', labelKey: 'nav.figures' },
  ]},
  { type: 'group', labelKey: 'nav.act', icon: '✊', children: [
    { id: 'act', icon: '✊', labelKey: 'nav.activism' },
    { id: 'boycott', icon: '🚫', labelKey: 'nav.boycott' },
    { id: 'hind-rajab', icon: '🕊️', labelKey: 'nav.hindRajab' },
  ]},
  { type: 'group', labelKey: 'common.resources', icon: '📚', children: [
    { id: 'sources', icon: '📰', labelKey: 'nav.sources' },
    { id: 'search', icon: '🔍', labelKey: 'nav.search' },
  ]},
  { type: 'divider' },
  { id: 'copy', type: 'nav', icon: '🔗', labelKey: 'common.copyLink' },
  { id: 'close', type: 'nav', icon: '✕', labelKey: 'common.closeMenu' },
];

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [menuFocus, setMenuFocus] = useState(-1);
  const [subFocus, setSubFocus] = useState(-1);
  const [openGroup, setOpenGroup] = useState(null);
  const [subPosition, setSubPosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const subRef = useRef(null);
  const rawPosRef = useRef({ x: 0, y: 0 });
  const positionedRef = useRef(false);
  const closeTimeoutRef = useRef(null);
  const tn = useTranslations('nav');
  const tc = useTranslations('common');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const locale = pathname.split('/').filter(Boolean)[0] || 'en';

  const items = useMemo(() => ITEM_DEFS.map((d) => {
    if (d.type === 'divider') return d;
    if (d.type === 'group') {
      const label = d.labelKey.startsWith('nav.') ? tn(d.labelKey.slice(4)) : tc(d.labelKey.slice(7));
      const children = d.children.map((c) => ({
        ...c,
        label: c.labelKey.startsWith('nav.') ? tn(c.labelKey.slice(4)) : tc(c.labelKey.slice(7)),
      }));
      return { ...d, label, children };
    }
    return { ...d, label: d.labelKey.startsWith('nav.') ? tn(d.labelKey.slice(4)) : tc(d.labelKey.slice(7)) };
  }), [tn, tc]);

  const filteredItems = items.filter((i) => !(i.id === 'top' && !scrolled));
  const actionableMain = filteredItems.filter((i) => i.type !== 'divider');

  const isCurrentPage = useCallback((id) => {
    if (id === 'top' || id === 'copy' || id === 'close') return false;
    if (id === 'home') return pathname === `/${locale}`;
    return pathname === `/${locale}/${id}`;
  }, [pathname, locale]);

  useEffect(() => {
    if (!visible) {
      setMenuFocus(-1);
      setSubFocus(-1);
      setOpenGroup(null);
      positionedRef.current = false;
      return;
    }
    setMenuFocus(0);
  }, [visible]);

  useEffect(() => {
    if (!visible || !menuRef.current || positionedRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    let x = rawPosRef.current.x;
    let y = rawPosRef.current.y;
    const gap = 8;
    if (x + rect.width + gap > window.innerWidth) {
      x = window.innerWidth - rect.width - gap;
    }
    if (y + rect.height + gap > window.innerHeight) {
      y = window.innerHeight - rect.height - gap;
    }
    x = Math.max(gap, x);
    y = Math.max(gap, y);
    if (x + rect.width > window.innerWidth) {
      x = window.innerWidth - rect.width - gap;
    }
    if (y + rect.height > window.innerHeight) {
      y = window.innerHeight - rect.height - gap;
    }
    x = Math.max(gap, x);
    y = Math.max(gap, y);
    if (x + rect.width > window.innerWidth) x = gap;
    if (y + rect.height > window.innerHeight) y = gap;
    if (x !== position.x || y !== position.y) {
      setPosition({ x, y });
    }
    positionedRef.current = true;
  }, [visible]);

  const handleGroupEnter = useCallback((labelKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const btn = menuRef.current.querySelector(`[data-group-key="${labelKey}"]`);
      const btnRect = btn ? btn.getBoundingClientRect() : menuRect;
      const subW = 190;
      let sx = menuRect.right + 4;
      const sy = Math.max(4, btnRect.top);
      if (sx + subW + 8 > window.innerWidth) {
        sx = menuRect.left - subW - 4;
      }
      setSubPosition({ x: sx, y: sy });
    }
    setOpenGroup(labelKey);
    setSubFocus(-1);
  }, []);

  const handleGroupLeave = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpenGroup(null);
      setSubFocus(-1);
      closeTimeoutRef.current = null;
    }, 150);
  }, []);

  const handleSubEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleSubLeave = useCallback(() => {
    setOpenGroup(null);
    setSubFocus(-1);
  }, []);

  function handleAction(id) {
    setVisible(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'copy') {
      navigator.clipboard.writeText(window.location.href);
    } else if (id === 'close') {
      return;
    } else if (id === 'search') {
      window.dispatchEvent(new CustomEvent('opensearch'));
    } else {
      const target = `/${locale}/${id === 'home' ? '' : id}`;
      if (window.location.pathname !== target) {
        window.location.href = target;
      }
    }
  }

  useEffect(() => {
    function onContextMenu(e) {
      if (window.matchMedia('(max-width: 768px)').matches) return;
      e.preventDefault();
      const gap = 8;
      const w = 210;
      const maxH = Math.min(480, window.innerHeight - gap * 2);
      let x = e.clientX, y = e.clientY;
      if (x + w + gap > window.innerWidth) x = window.innerWidth - w - gap;
      if (y + maxH > window.innerHeight) y = window.innerHeight - maxH;
      x = Math.max(gap, x);
      y = Math.max(gap, y);
      rawPosRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x, y });
      positionedRef.current = false;
      setVisible(true);
    }

    function onClick(e) {
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      if (subRef.current && subRef.current.contains(e.target)) return;
      setVisible(false);
    }

    function onKey(e) {
      if (!visible) return;
      const openGroupData = openGroup ? items.find((i) => i.type === 'group' && i.labelKey === openGroup) : null;
      const actionableSub = openGroupData?.children || [];
      const isSubLevel = openGroup !== null && actionableSub.length > 0;
      const lastMain = actionableMain.length - 1;
      const lastSub = actionableSub.length - 1;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          if (isSubLevel) {
            setOpenGroup(null);
            setSubFocus(-1);
          } else {
            setVisible(false);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (isSubLevel) {
            setSubFocus((p) => (p >= lastSub ? 0 : p + 1));
          } else {
            setMenuFocus((p) => (p >= lastMain ? 0 : p + 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isSubLevel) {
            setSubFocus((p) => (p <= 0 ? lastSub : p - 1));
          } else {
            setMenuFocus((p) => (p <= 0 ? lastMain : p - 1));
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!isSubLevel && menuFocus >= 0 && menuFocus < actionableMain.length) {
            const item = actionableMain[menuFocus];
            if (item.type === 'group') {
              handleGroupEnter(item.labelKey);
            }
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (isSubLevel) {
            setOpenGroup(null);
            setSubFocus(-1);
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isSubLevel) {
            if (subFocus >= 0 && subFocus < actionableSub.length) {
              handleAction(actionableSub[subFocus].id);
            }
          } else {
            if (menuFocus >= 0 && menuFocus < actionableMain.length) {
              const item = actionableMain[menuFocus];
              if (item.type === 'group') {
                if (openGroup === item.labelKey) {
                  setOpenGroup(null);
                } else {
                  handleGroupEnter(item.labelKey);
                }
              } else {
                handleAction(item.id);
              }
            }
          }
          break;
        case 'Tab':
          e.preventDefault();
          if (isSubLevel) {
            if (e.shiftKey) {
              setSubFocus((p) => (p <= 0 ? lastSub : p - 1));
            } else {
              setSubFocus((p) => (p >= lastSub ? 0 : p + 1));
            }
          } else {
            if (e.shiftKey) {
              setMenuFocus((p) => (p <= 0 ? lastMain : p - 1));
            } else {
              setMenuFocus((p) => (p >= lastMain ? 0 : p + 1));
            }
          }
          break;
      }
    }

    window.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [visible, menuFocus, subFocus, openGroup]);

  const openGroupData = openGroup ? items.find((i) => i.type === 'group' && i.labelKey === openGroup) : null;

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={menuRef}
            role="menu"
            aria-label="Navigation menu"
            style={{
              ...menuStyle,
              top: position.y,
              left: position.x,
            }}
            initial={{ opacity: 0, scale: 0.93, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: -4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
          >
            <div style={headerStyle}>
              <svg width="12" height="8" viewBox="0 0 900 600" style={{ borderRadius: 1 }}>
                <rect width="900" height="600" fill="#000" />
                <rect y="200" width="900" height="200" fill="#fff" />
                <rect y="400" width="900" height="200" fill="#149954" />
                <polygon points="0,0 300,300 0,600" fill="#e4312b" />
              </svg>
              <span>Navigate</span>
            </div>
            {filteredItems.map((item, i) => {
              if (item.type === 'divider') {
                return <div key={'d' + i} style={dividerStyle} />;
              }
              const actionableIdx = actionableMain.indexOf(item);
              const focused = actionableIdx === menuFocus;

              if (item.type === 'group') {
                const isOpen = openGroup === item.labelKey;
                return (
                  <button
                    key={'g' + item.labelKey}
                    role="menuitem"
                    data-group-key={item.labelKey}
                    onClick={() => {
                      if (isOpen) {
                        setOpenGroup(null);
                      } else {
                        handleGroupEnter(item.labelKey);
                      }
                    }}
                    onMouseEnter={() => handleGroupEnter(item.labelKey)}
                    onMouseLeave={handleGroupLeave}
                    style={{
                      ...itemStyle,
                      background: focused
                        ? 'var(--red-dim)'
                        : isOpen
                          ? 'rgba(228,49,43,0.1)'
                          : 'transparent',
                    }}
                  >
                    <div style={{
                      position: 'absolute', left: 0, top: 4, bottom: 4, width: 3,
                      borderRadius: '0 2px 2px 0',
                      background: focused || isOpen ? 'var(--red)' : 'transparent',
                      transition: 'background .15s',
                    }} />
                    <span style={{
                      width: 20, textAlign: 'center', fontSize: '0.85rem', flexShrink: 0,
                    }}>
                      {item.icon}
                    </span>
                    <span style={{
                      flex: 1, fontSize: '0.82rem',
                      fontWeight: isOpen ? 600 : 500,
                      color: isOpen ? 'var(--red)' : undefined,
                    }}>
                      {item.label}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        fontSize: '0.75rem',
                        opacity: isOpen ? 0.8 : 0.45,
                        marginLeft: 'auto',
                        color: isOpen ? 'var(--red)' : undefined,
                      }}
                    >
                      ▶
                    </motion.span>
                  </button>
                );
              }

              const active = isCurrentPage(item.id);
              const isClose = item.id === 'close';
              const isCopy = item.id === 'copy';

              return (
                <button
                  key={item.id}
                  role="menuitem"
                  onClick={() => handleAction(item.id)}
                  onMouseEnter={() => {
                    const idx = actionableMain.indexOf(item);
                    if (idx >= 0) setMenuFocus(idx);
                  }}
                  style={{
                    ...itemStyle,
                    ...(active ? activeItemStyle : {}),
                    ...(isClose ? closeItemStyle : {}),
                    ...(isCopy ? copyItemStyle : {}),
                    background: focused
                      ? 'var(--red-dim)'
                      : active
                        ? 'rgba(228,49,43,0.06)'
                        : 'transparent',
                  }}
                >
                  <div style={{
                    position: 'absolute', left: 0, top: 4, bottom: 4, width: 3,
                    borderRadius: '0 2px 2px 0',
                    background: focused ? 'var(--red)' : 'transparent',
                    transition: 'background .15s',
                  }} />
                  <span style={{
                    width: 20, textAlign: 'center', fontSize: '0.85rem', flexShrink: 0,
                  }}>
                    {item.icon}
                  </span>
                  <span style={{
                    flex: 1, fontSize: '0.82rem', fontWeight: active ? 600 : 500,
                  }}>
                    {item.label}
                  </span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {isCopy && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                      {typeof navigator !== 'undefined' && navigator.platform?.includes('Mac') ? '⌘C' : 'Ctrl+C'}
                    </span>
                  )}
                </button>
              );
            })}
            <div style={dividerStyle} />
            <div style={{
              padding: '4px 10px 2px',
              fontSize: '0.6rem', color: 'var(--text-muted)', opacity: 0.5,
              fontFamily: 'var(--font-mono)', textAlign: 'right',
            }}>
              v1.0
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {visible && openGroupData && (
          <motion.div
            ref={subRef}
            role="menu"
            aria-label={openGroupData.label}
            style={{
              ...menuStyle,
              width: 190,
              top: subPosition.y,
              left: subPosition.x,
            }}
            initial={{ opacity: 0, scale: 0.93, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: -4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            onMouseEnter={handleSubEnter}
            onMouseLeave={handleSubLeave}
          >
            {openGroupData.children.map((child, i) => {
              const active = isCurrentPage(child.id);
              const focused = i === subFocus;

              return (
                <button
                  key={child.id}
                  role="menuitem"
                  onClick={() => handleAction(child.id)}
                  onMouseEnter={() => setSubFocus(i)}
                  style={{
                    ...itemStyle,
                    ...(active ? activeItemStyle : {}),
                    background: focused
                      ? 'var(--red-dim)'
                      : active
                        ? 'rgba(228,49,43,0.06)'
                        : 'transparent',
                  }}
                >
                  <div style={{
                    position: 'absolute', left: 0, top: 4, bottom: 4, width: 3,
                    borderRadius: '0 2px 2px 0',
                    background: focused ? 'var(--red)' : 'transparent',
                    transition: 'background .15s',
                  }} />
                  <span style={{
                    width: 20, textAlign: 'center', fontSize: '0.85rem', flexShrink: 0,
                  }}>
                    {child.icon}
                  </span>
                  <span style={{
                    flex: 1, fontSize: '0.82rem', fontWeight: active ? 600 : 500,
                  }}>
                    {child.label}
                  </span>
                  {active && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const menuStyle = {
  position: 'fixed',
  zIndex: 99999,
  width: 195,
  padding: 4,
  background: 'var(--bg-alt)',
  backdropFilter: 'blur(32px)',
  WebkitBackdropFilter: 'blur(32px)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  boxShadow: 'var(--shadow-lg), 0 0 0 1px rgba(0,0,0,.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  outline: 'none',
  maxHeight: 'calc(100vh - 16px)',
  overflowY: 'auto',
};

const headerStyle = {
  padding: '6px 10px',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.62rem',
  color: 'var(--text-muted)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const dividerStyle = {
  height: 1,
  background: 'var(--border)',
  margin: '2px 0',
};

const itemStyle = {
  position: 'relative',
  background: 'transparent',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 10px 6px 12px',
  width: '100%',
  textAlign: 'left',
  fontSize: '0.78rem',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'background 0.12s ease, padding 0.12s ease',
  fontFamily: 'inherit',
  outline: 'none',
};

const activeItemStyle = {
  color: 'var(--red)',
};

const closeItemStyle = {
  color: 'var(--text-muted)',
  fontSize: '0.78rem',
};

const copyItemStyle = {};
