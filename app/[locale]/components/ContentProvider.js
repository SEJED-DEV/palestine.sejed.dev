'use client';
import { createContext, useContext, useMemo } from 'react';

const WikiContent = createContext(null);

export function WikiProvider({ children, data }) {
  const value = useMemo(() => data, [data]);
  return <WikiContent.Provider value={value}>{children}</WikiContent.Provider>;
}

export function useWikiContent(page) {
  const ctx = useContext(WikiContent);
  return ctx ? ctx[page] : null;
}
