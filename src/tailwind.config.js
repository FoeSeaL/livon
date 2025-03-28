/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'brand-primary': '#FF6B6B',
          'brand-secondary': '#4ECDC4',
          'brand-background': '#F7FFF7',
        },
        fontFamily: {
          'sans': ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }