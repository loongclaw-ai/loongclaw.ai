// src/contexts/ThemeContext.tsx
import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { ThemeContext, THEMES, type Theme } from './ThemeContextValue';

const STORAGE_KEY = 'loongclaw-theme';

// Get initial theme from localStorage or system preference
const getInitialTheme = (): Theme => {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (savedTheme && (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT)) {
      return savedTheme;
    }
  } catch {
    // localStorage not available (private browsing, etc.)
  }

  // Check system preference
  if (typeof window !== 'undefined') {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? THEMES.LIGHT : THEMES.DARK;
  }

  return THEMES.DARK;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage not available
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };