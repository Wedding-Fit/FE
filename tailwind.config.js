/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], 
  theme: {
    extend: {
      colors: {
        red: {
          light: '#F5B7B1',
          default: '#DE9790',
          dark: '#DC7267',
          strong: '#E80B26',
        },
        purple: {
          light: '#E6B8C2',
          default: '#CDB4DB',
        },
        yellow: '#FFB02E',
        gray: {
          100: '#F5EFE6',
          200: '#DAD2C7',
          300: '#B6AEA3',
          400: '#A0978A',
          500: '#5F5950',
          600: '#BDC3C7',
          700: '#B1B1B1',
          800: '#626262',
        },
        navy: {
          light: '#2C3E50',
          dark: '#060071',
        },
        black: '#000000',
        white: '#ffffff',
      },
      fontSize: {
        dDay:['36px', { fontWeight: '700', lineHeight: '32px' }],
        title: ['22px', { fontWeight: '700', lineHeight: '32px' }],
        buttonTitle:['20px', { fontWeight: '700', lineHeight: '32px' }],
        subTitle: ['16px', { fontWeight: '700', lineHeight: '24px' }],
        placehold:['16px', { fontWeight: '600', lineHeight: '24px' }],
        bodyBold: ['14px', { fontWeight: '700', lineHeight: '20px' }],
        body: ['14px', { fontWeight: '500', lineHeight: '20px' }],
        caption: ['10px', { fontWeight: '500', lineHeight: '14px' }],
      },
      fontWeight: {
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        dark: '0 0 4px rgba(0, 0, 0, 0.25)', 
      },
    },
  },
  plugins: [],
}