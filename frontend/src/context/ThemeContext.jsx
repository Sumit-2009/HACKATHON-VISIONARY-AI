import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  MONOCHROME: 'monochrome'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('flowmind-theme');
      if (saved && Object.values(THEMES).includes(saved)) {
        return saved;
      }
    } catch (e) {
      // Fallback
    }
    return THEMES.LIGHT;
  });

  const setTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setThemeState(newTheme);
      try {
        localStorage.setItem('flowmind-theme', newTheme);
      } catch (e) {
        console.warn('Failed to persist theme:', e);
      }
    }
  };

  const cycleTheme = () => {
    const list = [THEMES.LIGHT, THEMES.DARK, THEMES.MONOCHROME];
    const currentIndex = list.indexOf(theme);
    const nextIndex = (currentIndex + 1) % list.length;
    setTheme(list[nextIndex]);
  };

  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('theme-light', 'theme-dark', 'theme-monochrome', 'dark');

    // Add active theme class
    root.classList.add(`theme-${theme}`);

    // If dark mode, also add standard Tailwind 'dark' class
    if (theme === THEMES.DARK) {
      root.classList.add('dark');
    }

    // Set dataset attribute for CSS selectors
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      cycleTheme,
      isDark: theme === THEMES.DARK,
      isMono: theme === THEMES.MONOCHROME,
      isLight: theme === THEMES.LIGHT
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
