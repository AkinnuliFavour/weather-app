module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      colors: {
        'placeholder-color': '#374151',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['responsive', 'hover', 'focus', 'placeholder'],
    },
  },
  plugins: [],
}