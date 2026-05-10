/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary dark backgrounds
        dark: {
          950: '#04040a',
          900: '#0a0a0f',
          800: '#0f0f1a',
          700: '#14141f',
          600: '#1a1a2e',
          500: '#16213e',
        },
        // Violet accent (primary brand)
        violet: {
          950: '#1e0048',
          900: '#2e0075',
          800: '#4a00b4',
          700: '#5c0fd9',
          600: '#7c3aed',
          500: '#8b5cf6',
          400: '#a78bfa',
          300: '#c4b5fd',
          200: '#ddd6fe',
          100: '#ede9fe',
        },
        // Cyan accent (secondary)
        cyan: {
          600: '#0891b2',
          500: '#06b6d4',
          400: '#22d3ee',
          300: '#67e8f9',
        },
        // Amber (XP/achievements)
        gold: {
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
        },
        // Emerald (success/gains)
        gain: {
          600: '#059669',
          500: '#10b981',
          400: '#34d399',
        },
        // Rose (intensity/fire)
        fire: {
          600: '#e11d48',
          500: '#f43f5e',
          400: '#fb7185',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a0533 50%, #0a1628 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.05) 100%)',
        'violet-gradient': 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
        'fire-gradient': 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
        'gain-gradient': 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      },
      boxShadow: {
        'violet-glow': '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.1)',
        'cyan-glow': '0 0 20px rgba(6,182,212,0.4), 0 0 40px rgba(6,182,212,0.1)',
        'fire-glow': '0 0 20px rgba(244,63,94,0.4), 0 0 40px rgba(244,63,94,0.1)',
        'gold-glow': '0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.1)',
        'gain-glow': '0 0 20px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(124,58,237,0.3)' },
          to: { boxShadow: '0 0 30px rgba(124,58,237,0.7), 0 0 60px rgba(124,58,237,0.3)' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    },
  },
  plugins: [],
}
