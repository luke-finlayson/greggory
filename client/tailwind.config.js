/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,ts,tsx}",
    "./src/**/*.{html,ts,tsx}"
],
  theme: {
    extend: {colors:{
      "gregory-pink-0": "#EFCEFA85"
    }},
  },
  plugins: [],
}
