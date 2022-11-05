/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6faf3',
          100: '#e9f5e3',
          200: '#d3eac8',
          300: '#afd89d',
          400: '#82bd69',
          500: '#61a146',
          600: '#4c8435',
          700: '#3d692c',
          800: '#345427',
          900: '#2b4522',
        },
        secondary: {
          50: '#f2fbf9',
          100: '#d2f5ee',
          200: '#a6e9df',
          300: '#71d7cb',
          400: '#41b9af',
          500: '#2aa29a',
          600: '#1f827d',
          700: '#1d6865',
          800: '#1c5352',
          900: '#1b4645',
        },
      },
      animation: {
        'fade-in': 'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
