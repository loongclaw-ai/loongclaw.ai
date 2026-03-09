// src/contexts/useTheme.ts
import { useContext } from "react";
import { ThemeContext, THEMES } from "./ThemeContextValue";

export { THEMES };

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
