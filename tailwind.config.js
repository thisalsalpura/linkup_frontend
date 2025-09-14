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
      },
      fontFamily: {
        EncodeSansCondensedBlack: ["EncodeSansCondensedBlack", "sans-serif"],
        EncodeSansCondensedBold: ["EncodeSansCondensedBold", "sans-serif"],
        EncodeSansCondensedExtraBold: ["EncodeSansCondensedExtraBold", "sans-serif"],
        EncodeSansCondensedExtraLight: ["EncodeSansCondensedExtraLight", "sans-serif"],
        EncodeSansCondensedLight: ["EncodeSansCondensedLight", "sans-serif"],
        EncodeSansCondensedMedium: ["EncodeSansCondensedMedium", "sans-serif"],
        EncodeSansCondensedRegular: ["EncodeSansCondensedRegular", "sans-serif"],
        EncodeSansCondensedSemiBold: ["EncodeSansCondensedSemiBold", "sans-serif"],
        EncodeSansCondensedThin: ["EncodeSansCondensedThin", "sans-serif"],
      }
    },
  },
  plugins: [],
}