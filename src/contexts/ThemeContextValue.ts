// src/contexts/ThemeContextValue.ts
import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export const THEMES = {
  DARK: 'dark' as const,
  LIGHT: 'light' as const,
};

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
