/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "6rem",
        xl: "10rem",
      },
    },
    extend: {
      colors: {
        primary: "#16ABF8",
        secondary: "#ED4C5C",
      },
      fontFamily: {
        sans: ["Poppins", "sans serif"],
      },
    },
  },

  daisyui: {
    themes: [{ mytheme: { primary: "#16ABF8", secondary: "#ED4C5C" } }],
  },
  plugins: [require("daisyui")],
};
