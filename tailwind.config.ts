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
          DEFAULT: '#B5AF7D',
          dark: '#928D63',
        },
        'text-main': '#181712',
        'text-muted': '#7A7563',
        'background-light': '#F8F7F2',
        'background-cream': '#FDFBF7',
        'background-dark': '#1F1D15',
        'accent-brown': '#8D7B68',
        'surface-light': '#FFFFFF',
        'surface-dark': '#2A2820',
        'border-light': '#F2F1EB',
        'border-soft': '#E2DFD2',
        'dark-card': '#26241B',
        'dark-card-alt': '#2C2A20',
        'dark-nav': '#37342A',
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