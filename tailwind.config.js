/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      norwester: ['Norwester'],
    },
    colors: {
      ...colors,
      grey: {
        light: '#989898',
        DEFAULT: '#87878F',
        dark: '#47525E',
      },
      background: {
        DEFAULT: '#fafafa',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
