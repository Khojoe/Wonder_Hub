/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#e6f4ee",
          100: "#c0e4d1",
          500: "#1D6B4A",
          600: "#175a3e",
          700: "#0f4a32",
        },
      },
    },
  },
  plugins: [],
};
