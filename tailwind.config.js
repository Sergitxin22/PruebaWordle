/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark': 'rgb(18 18 19)',
      },
      fontSize: {
        'text-base': '1rem',
      },
      
    }
  },
  plugins: [],
}