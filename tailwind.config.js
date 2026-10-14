/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          surface: 'rgb(var(--color-bg-surface) / <alpha-value>)',
          card: 'rgb(var(--color-bg-card) / <alpha-value>)',
          cardHover: 'rgb(var(--color-bg-card-hover) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          borderHover: 'rgb(var(--color-border-hover) / <alpha-value>)',
          cyan: 'rgb(var(--color-cyan) / <alpha-value>)',
          teal: '#06b6d4',
          blue: '#2563eb',
          sky: '#38bdf8',
          accent: '#00e5ff',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          text: 'rgb(var(--color-text-primary) / <alpha-value>)',
          textSecondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 0%, var(--hero-gradient-center) 0%, var(--hero-gradient-edge) 75%)',
        'radial-glow': 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
