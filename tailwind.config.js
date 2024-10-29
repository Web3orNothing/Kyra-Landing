/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chakra: ['"Chakra Petch"', "sans-serif"],
        orbitron: ['"Orbitron"', "sans-serif"],
        gridlite: ['"gridlite-pe-variable"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
