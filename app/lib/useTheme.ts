'use client';

import { useSyncExternalStore } from 'react';

// data-theme attribute (set before paint by the inline script in layout.tsx) is the source of truth
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};
const getSnapshot = () => document.documentElement.getAttribute('data-theme') === 'dark';
const getServerSnapshot = () => false;

export function useTheme() {
  const darkMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleDark = () => {
    const theme = darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return { darkMode, toggleDark };
}
