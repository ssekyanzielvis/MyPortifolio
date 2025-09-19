/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a777e3',
          DEFAULT: '#8662e3',
          dark: '#6e8efb',
        }
      },
    },
  },
  plugins: [],
}