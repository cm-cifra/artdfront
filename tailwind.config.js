/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#d1934d',
          600: '#C98C47',
          700: '#bf833f',
        },
        black: {
          400: '#0f0f0f',
          500: '#070707',
        }
      },
      brightness: {
        10: '.10',
        25: '.25',
        175: '1.75',
      },
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
