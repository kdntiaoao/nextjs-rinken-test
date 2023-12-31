import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        error: {
          50: '#ffeff2',
          100: '#ffdce2',
          200: '#ffbfcb',
          300: '#ff92a6',
          400: '#ff5473',
          500: '#ff1f48',
          600: '#ff002e',
          700: '#db0028',
          800: '#b00020',
          900: '#940821',
        },
      },
    },
  },
  plugins: [],
};
export default config;
