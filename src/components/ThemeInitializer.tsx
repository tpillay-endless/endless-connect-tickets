'use client';

import { useEffect } from 'react';

const DARK_CLASS = 'u-theme-dark';
const LIGHT_CLASS = 'u-theme-light';

const applyTheme = (matcher: MediaQueryList | null) => {
  const prefersDark = matcher?.matches ?? false;
  const nextClass = prefersDark ? DARK_CLASS : LIGHT_CLASS;
  document.body.classList.remove(DARK_CLASS, LIGHT_CLASS);
  document.body.classList.add(nextClass);
};

export function ThemeInitializer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(matcher);
    const handler = () => applyTheme(matcher);
    matcher.addEventListener('change', handler);
    return () => matcher.removeEventListener('change', handler);
  }, []);

  return null;
}
