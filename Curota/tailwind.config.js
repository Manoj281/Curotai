/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        'white': '0 0 4px rgba(255, 255, 255, 0.4)',
      },
    },
    screens: {
      'xs': '343px',    // Extra small devices
      'sm': '640px',    // Small devices
      'md': '768px',    // Medium devices
      'lg': '1030px',   // Large devices
      'xl': '1280px',   // Extra large devices
      '2xl': '1536px',  // 2X large devices
    },
  },
  plugins: [],
};