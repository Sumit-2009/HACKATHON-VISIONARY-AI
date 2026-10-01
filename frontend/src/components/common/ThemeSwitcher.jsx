import React from 'react';
import { Sun, Moon, Contrast } from 'lucide-react';
import { useTheme, THEMES } from '../../context/ThemeContext';

export const ThemeSwitcher = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  const options = [
    { key: THEMES.LIGHT, label: 'Light', icon: Sun },
    { key: THEMES.DARK, label: 'Dark', icon: Moon },
    { key: THEMES.MONOCHROME, label: 'Mono', icon: Contrast },
  ];

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full border transition-all duration-300 theme-switcher-container ${className}`}
      role="radiogroup"
      aria-label="Theme mode switcher"
      style={{
        background: 'var(--switcher-bg, rgba(255, 255, 255, 0.9))',
        borderColor: 'var(--border-color, #E5E7EB)'
      }}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => setTheme(opt.key)}
            role="radio"
            aria-checked={isActive}
            title={`Switch to ${opt.label} Mode`}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? 'shadow-xs theme-switcher-active'
                : 'theme-switcher-inactive hover:opacity-100 opacity-65'
            }`}
            style={{
              background: isActive ? 'var(--switcher-active-bg, #111827)' : 'transparent',
              color: isActive ? 'var(--switcher-active-text, #FFFFFF)' : 'var(--text-secondary, #4B5563)'
            }}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
