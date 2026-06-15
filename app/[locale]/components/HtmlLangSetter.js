'use client';
import { useEffect } from 'react';

export default function HtmlLangSetter({ locale, dir }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);
  return null;
}
