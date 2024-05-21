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
        third: '#fbad6d',
        fourth: '#e9d8fd',
        error: '#FF0000',
        bgGray: '#E5E5E5'
      },
      screens: {
        sm: { max: '768px' },
        vsm: { max: '414px' }
      },
      gridColumn: {
        'span-0.5': 'span 0.5 / span 0.5'
      }
    }
  },
  plugins: []
}
