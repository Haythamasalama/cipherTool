/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5194FF',
        secondary: '#7981E6',
        gray: {
          100: '#fafafa',
          200: '#575757',
          300: '#999999',
          400: '#888888',
          500: '#24292F',
          600: '#1B1F24',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
      },
      boxShadow: {
        DEFAULT: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans],
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme('colors.gray.500'),
      }),
    },
  },
  plugins: [],
};
