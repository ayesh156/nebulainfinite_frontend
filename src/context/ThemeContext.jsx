import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * @typedef {'dark' | 'light' | 'system'} ThemeMode
 *
 * @typedef {Object} ThemeContextValue
 * @property {ThemeMode} theme - Current active theme mode setting
 * @property {'dark' | 'light'} resolvedTheme - Actual rendered theme (dark or light)
 * @property {(mode: ThemeMode) => void} setTheme - Function to switch theme mode
 * @property {() => void} cycleTheme - Cycles through dark -> light -> system
 */

const ThemeContext = createContext(null);

const STORAGE_KEY = 'nebula-theme-preference';

/**
 * ThemeProvider component managing Dark, Light, and System color schemes.
 * Persists user choice in localStorage and dynamically syncs with OS preferences.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light' || stored === 'system') {
        return stored;
      }
    } catch {
      // localStorage unavailable or restricted
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch {
      // Default fallback
    }
    return 'dark';
  });

  // Apply theme class to <html> root and synchronize with document head & OS preferences
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    /**
     * Resolves the active theme ('dark' | 'light') based on user choice or OS media query,
     * and updates HTML class attributes, color-scheme style, and meta theme-color.
     */
    const applyTheme = () => {
      let active = theme;
      if (theme === 'system') {
        active = mediaQuery.matches ? 'dark' : 'light';
      }

      setResolvedTheme(active);

      if (active === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }

      // Sync mobile browser status bar color with active theme
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', active === 'dark' ? '#050814' : '#f8fafc');
      }
    };

    applyTheme();

    /**
     * Listener for OS-level theme preference shifts when 'system' mode is active.
     */
    const handleSystemChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
      return () => mediaQuery.removeListener(handleSystemChange);
    }
  }, [theme]);

  /**
   * Sets new theme mode and updates localStorage.
   *
   * @param {ThemeMode} mode
   */
  const setTheme = (mode) => {
    setThemeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore write errors
    }
  };

  /**
   * Cycle helper for one-click toggle: Dark -> Light -> System -> Dark
   */
  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to consume theme context across components.
 *
 * @returns {ThemeContextValue}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
