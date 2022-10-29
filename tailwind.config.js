/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        50: '#ecf2ff',
        100: '#dce7ff',
        200: '#c0d2ff',
        300: '#9bb3ff',
        400: '#7389ff',
        500: '#5261ff',
        600: '#3334f8',
        700: '#2927db',
        800: '#2222b1',
        900: '#272a96',
      },
    },
    extend: {},
  },
  plugins: [],
}
