/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        'background-light': '#121212',
        'background-lighter': '#1A1A1A',
        neon: {
          green: '#00FF94',
          pink: '#FF00F5',
        },
        success: {
          light: '#A7F3D0',
          DEFAULT: '#10B981',
          dark: '#047857',
        },
        warning: {
          light: '#FDE68A',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        error: {
          light: '#FECACA',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 10px #00FF94, 0 0 20px rgba(0, 255, 148, 0.5)',
        'neon-pink': '0 0 10px #FF00F5, 0 0 20px rgba(255, 0, 245, 0.5)',
      },
      animation: {
        'glow-green': 'glow-green 2s ease-in-out infinite alternate',
        'glow-pink': 'glow-pink 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-green': {
          '0%': { boxShadow: '0 0 5px rgba(0, 255, 148, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 255, 148, 0.8), 0 0 30px rgba(0, 255, 148, 0.6)' },
        },
        'glow-pink': {
          '0%': { boxShadow: '0 0 5px rgba(255, 0, 245, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 0, 245, 0.8), 0 0 30px rgba(255, 0, 245, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};