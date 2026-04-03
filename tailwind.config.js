/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#f5f5f5",
        accent: "#111111",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
