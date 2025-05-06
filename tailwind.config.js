/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend: {
        colors: {
          cocoaBrown: '#D66604',
          brown: '#A04C03',
          oxfordBlue: '#14213D',
          platinum: '#E5E5E5'
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  };
  