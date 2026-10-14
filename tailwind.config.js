/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nx: {
          blue: '#1F4E9C',
          glow: '#3B7BEA',
          black: '#05070D',
          card: '#0D111A',
          white: '#F5F7FA',
          gray: '#8A93A6',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(59,123,234,0.45), 0 0 60px rgba(59,123,234,0.15)',
        'glow-lg': '0 0 30px rgba(59,123,234,0.6), 0 0 90px rgba(59,123,234,0.25)',
      },
      backgroundImage: {
        'nx-gradient': 'linear-gradient(135deg, #1F4E9C 0%, #3B7BEA 100%)',
      },
    },
  },
  plugins: [],
}
