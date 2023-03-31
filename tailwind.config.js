/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#1d4ed8",
          dark: "#1e40af",
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
