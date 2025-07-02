/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        magenta: {
          400: '#ec4899',
          500: '#d946ef',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
    },
  },
  plugins: [],
}
