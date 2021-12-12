/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      norwester: ['Norwester'],
    },
    colors: {
      white: colors.white,
      orange: {
        DEFAULT: colors.red['500'],
        dark: colors.red['700'],
      },
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
