/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#19376D",
        secondary: "#1d4ed8",
        danger: {
          border: "#e11d48",
          bg: "#fecdd3",
        },
      },
      screens: {
        sm: { max: "639px" },
        lg: "1440px",
      },
      width: {
        900: "900px",
      },
      height: {
        600: "600px",
      },
      margin: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
