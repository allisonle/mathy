/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#a295b7",
        button: "#beb2ff",
        tile: "#e0d6f1",
      },
    },
  },
  plugins: [],
};
