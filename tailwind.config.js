module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grass': '#78C850',
        'fire': '#F08030',
        'water': '#6890F0',
        'electric': '#F8D030',
        'psychic': '#F85888',
        'ice': '#98D8D8',
        'dragon': '#7038F8',
        'dark': '#705848',
        'fairy': '#EE99AC',
        'flying': '#A890F0',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
