/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'game-gradient':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        'nlw-gradient':
          'linear-gradient(89.86deg, #9572FC 24.57%, #43E7AD 63.94%, #E1D55D 100.08%)',
        galaxy: "url('/background-galaxy.png')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
