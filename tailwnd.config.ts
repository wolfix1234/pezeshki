/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Vazirmatn', 'sans-serif'],
          vazir: ['Vazirmatn', 'sans-serif'],
        },
        backgroundColor: {
          'site': '#F5F5F5',
        },
      },
    },
    plugins: [],
  }
  