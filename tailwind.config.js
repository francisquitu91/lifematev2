/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
  // removed 'mexicana' custom font family; use default Tailwind fonts (font-sans) or add new families as needed
  fontFamily: {},
    },
  },
  plugins: [],
};
