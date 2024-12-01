/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main_color: "#4B1FFE",
        main_light_color: "#ECE9FF",
      },
    },
  },
  plugins: [],
};
