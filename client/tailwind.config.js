/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,ts,tsx}",
    "./src/**/*.{html,ts,tsx}"
],
  theme: {
    extend: {colors:{
      //{Pink}
      "greggory-pink-0": "#EFCEFA85",

      //{Grey}
      "greggory-grey-0": "#5c5c5c"
    },fontFamily:{
        "gregory-title" : "Play"
    }
  
  },
  },
  plugins: [],
}
