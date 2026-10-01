/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'flow-bg': '#F7F8FA',
        'flow-card': '#FFFFFF',
        'flow-primary': '#101828',
        'flow-secondary': '#667085',
        'flow-muted': '#98A2B3',
        'flow-border': '#E6E8EC',
        'flow-navy': '#14213D',
        'flow-blue': '#2563EB',
        'flow-blue-soft': '#EEF4FF',
        'flow-indigo': '#6366F1',
        'flow-ai-bg': '#F4F2FF',
        'flow-ai-border': '#DDD6FE',
        'flow-ai-text': '#4F46E5',
        'flow-success': '#15803D',
        'flow-warning': '#B45309',
        'flow-danger': '#DC2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 24, 40, 0.04), 0 1px 2px -1px rgba(16, 24, 40, 0.04)',
        'card': '0 2px 8px -2px rgba(16, 24, 40, 0.05), 0 1px 4px -1px rgba(16, 24, 40, 0.03)',
        'float': '0 12px 32px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.03)',
        'drawer': '-8px 0 32px 0 rgba(16, 24, 40, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
