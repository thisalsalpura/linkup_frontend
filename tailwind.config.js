/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: "#EDEDE9",
          100: "#D6CCC2",
          200: "#F5EBE0",
          300: "#E3D5CA",
          400: "#D5BDAF"
        },
      }
    },
  },
  plugins: [],
}