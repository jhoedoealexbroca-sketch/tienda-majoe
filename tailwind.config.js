/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dc',
          300: '#d4cdc0',
          400: '#b8a898',
          500: '#9d8670',
          600: '#8a6f56',
          700: '#735b47',
          800: '#5e4a3c',
          900: '#4d3d33',
        },
        dark: {
          50: '#f8f7f4',
          100: '#f0ede7',
          200: '#ddd6c7',
          300: '#c4b89f',
          400: '#a89375',
          500: '#947a5a',
          600: '#7d6348',
          700: '#68523c',
          800: '#574535',
          900: '#4a3b30',
        },
        accent: {
          50: '#fdf8f3',
          100: '#faeee1',
          200: '#f3dbc2',
          300: '#eac298',
          400: '#dfa16c',
          500: '#d6844a',
          600: '#c8703f',
          700: '#a75a36',
          800: '#854833',
          900: '#6d3c2c',
        },
        luxury: {
          50: '#fdfcfb',
          100: '#faf8f4',
          200: '#f2ede4',
          300: '#e6dbc8',
          400: '#d4c3a0',
          500: '#c0a876',
          600: '#a8925a',
          700: '#8a7548',
          800: '#70603c',
          900: '#5c4f34',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'system-ui', 'serif'],
        modern: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

