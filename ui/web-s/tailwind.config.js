/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    './_components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      screens: {
        'x-sm': '413px',
        'xx-sm': '364px',
        '3xl': '1792px',
        '4xl': '2048px',
        '5xl': '2304px',
        '6xl': '2560px',
      },
      zIndex: {
        '-50': '-50 !important',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('short', '@media (max-height: 430px)');
      addVariant('tall', '@media (min-height: 431px)');
    }),
  ],
};
