module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      signika:"Signika Negative",
      robotomono:"Roboto Mono"
    },
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}