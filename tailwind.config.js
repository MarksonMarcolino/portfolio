/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080b12',
        surface: '#0f1520',
        'surface-elevated': '#141d2e',
        accent: '#00d2ff',
        purple: '#7b2ff7',
        amber: '#f59e0b',
        'text-primary': '#e8eaf0',
        'text-secondary': '#7b8ba4',
        'text-muted': '#3d4f6b',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      borderColor: {
        subtle: 'rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
}
