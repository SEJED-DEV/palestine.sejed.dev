'use client';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SearchContext = createContext(null);

export function useSearch() {
  return useContext(SearchContext);
}

export default function SearchProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => setOpen(false), []);
  const toggleSearch = useCallback(() => setOpen((p) => !p), []);

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((p) => !p);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    function onOpen() { setOpen(true); }
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('opensearch', onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('opensearch', onOpen);
    };
  }, []);

  return (
    <SearchContext.Provider value={{ open, openSearch, closeSearch, toggleSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
