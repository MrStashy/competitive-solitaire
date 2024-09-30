/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'card-height': '10rem', 
      },
      width: {
        'card-width': '6rem', 
      },
    },
  },
  plugins: [],
}

