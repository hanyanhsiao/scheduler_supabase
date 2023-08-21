/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fffbeb',
        secondary: '#fed7aa',
        third: '#fb923c',
        fourth: '#e9d8fd'
      },
      screens: {
        sm: { max: '768px' }
      },
      gridColumn: {
        'span-0.5': 'span 0.5 / span 0.5'
      }
    }
  },
  plugins: []
}
