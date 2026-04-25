import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/components/**/*.{vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.ts',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ce619',
          dark: '#3db814',
        },
        'text-main': '#131811',
        'text-muted': '#6c8863',
        'background-light': '#f6f8f6',
        'background-cream': '#FDFBF7',
        'background-dark': '#152111',
        'accent-brown': '#8D7B68',
        'surface-light': '#ffffff',
        'surface-dark': '#1e2b1a',
        'border-light': '#f1f4f0',
        'border-soft': '#dee5dc',
        'dark-card': '#1a2c15',
        'dark-card-alt': '#1e2e1a',
        'dark-nav': '#2a3625',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', '"Noto Sans JP"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"Noto Sans JP"', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
        wide: '1280px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config
