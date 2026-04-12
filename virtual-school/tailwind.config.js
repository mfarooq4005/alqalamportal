/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9e7',
          100: '#fdf3cf',
          200: '#fae79f',
          300: '#f8d76f',
          400: '#f5c33f',
          500: '#d4a017', // Golden main
          600: '#b8860b',
          700: '#916b0f',
          800: '#75560f',
          900: '#61470d',
        },
        dark: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529', // Dark background
          950: '#1a1d21',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(to bottom right, rgba(26, 29, 33, 0.95), rgba(33, 37, 41, 0.9)), url('/school-bg.jpg')",
      }
    },
  },
  plugins: [],
}
