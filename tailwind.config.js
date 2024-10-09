/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "firstColor": "#00241b",
        "secondColor": "#4e878c",
        "thirdColor": "#65b891",
        "fourthColor": "#93e5ab",
        "fifth": "#b5ffe1"

      },
      backgroundImage: {
        "wallpaper": " url('/assets/wallpaper.webp')"
      }
    },
  },
  plugins: [],
}

