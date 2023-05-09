/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{html,ts}',
            './src/routes/*.svelte',
            './src/routes/**/*.svelte',
            './src/lib/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
}
