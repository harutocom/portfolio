'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { type Lang } from '../content';

// The ?lang= query param is the source of truth so the EN version is shareable by URL
const subscribe = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  window.addEventListener('langchange', onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener('langchange', onChange);
  };
};
const getSnapshot = (): Lang =>
  new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ja';
const getServerSnapshot = (): Lang => 'ja';

export const langQuery = (lang: Lang) => (lang === 'en' ? '?lang=en' : '');

export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep <html lang> in sync for assistive tech
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    const url = new URL(window.location.href);
    if (lang === 'ja') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url);
    window.dispatchEvent(new Event('langchange'));
  };

  return { lang, toggleLang };
}
