/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#6b1d20', // Deep burgundy
        secondary: '#cca471', // Gold/tan
        accent: '#fcaba0', // Coral/peach
        'rose-bg': '#ffe5d9', // Light peach top
        success: '#16a34a',
        danger: '#dc2626',
        theme: {
          top: '#ffe5d9',
          mid: '#fcaba0',
          bot: '#fcd9cd',
          text: '#6b1d20',
          gold: '#cca471',
          goldHover: '#b88d5b',
          maroon: '#6b1d20',
          maroonHover: '#521417',
          card: '#fff5f0',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
        'heartbeat': 'heartbeat 1.2s infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'progress-fill': 'progressFill 1.5s ease-out both',
        'pulse-border': 'pulseBorder 2s ease-in-out infinite',
        'counter': 'counter 2s ease-out both',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.2)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--fill-width)' },
        },
        pulseBorder: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(236, 72, 153, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(236, 72, 153, 0)' },
        },
      },
      boxShadow: {
        'pink': '0 4px 20px rgba(236, 72, 153, 0.15)',
        'pink-lg': '0 8px 40px rgba(236, 72, 153, 0.2)',
        'pink-hover': '0 12px 50px rgba(236, 72, 153, 0.3)',
      },
    },
  },
  plugins: [],
}
