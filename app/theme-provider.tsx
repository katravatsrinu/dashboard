"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    setThemeState(storedTheme || defaultTheme);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (themeToApply: Theme) => {
      const resolved =
        themeToApply === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : themeToApply;

      if (attribute === "class") {
        root.classList.remove("light", "dark");
        root.classList.add(resolved);
      } else {
        root.setAttribute(attribute, resolved);
      }
    };

    applyTheme(theme);

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const systemChangeListener = () => applyTheme("system");
      media.addEventListener("change", systemChangeListener);
      return () => media.removeEventListener("change", systemChangeListener);
    }
  }, [theme, attribute]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
