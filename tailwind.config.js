/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      "poppins": 'Poppins',
    },
    colors: {
      "primary": "#fffffe",
      "secondary": "#078080",
      "danger": "#f25042",
      "header" : "#0e172c",
      "info" : "#f9bc60",
      "warn" : "#ff8906"
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
};
export const plugins = [];


