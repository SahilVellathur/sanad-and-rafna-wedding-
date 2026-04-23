/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'imperial-navy': '#001220',
        'emerald-royal': '#003322',
        'charcoal': '#121212',
        'gold': '#D4AF37',
        'parchment': '#FDFCF0',
        'champagne': '#F7E7CE',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'bodoni': ['"Bodoni Moda"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
