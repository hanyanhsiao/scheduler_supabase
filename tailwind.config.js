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
            third:'#fb923c',
            fourth:'#fae8ff'
        }
      }
    },
    plugins: []
  }