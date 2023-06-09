/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./container/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#19376D",
        secondary: "#f8fafc",
        active: "#2563EB",
        success: "#059669",
        danger: "#e11d48",
        warning: "#ea580c",
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
