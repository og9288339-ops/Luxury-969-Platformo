/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ============================================================================
      // CUSTOM COLOR PALETTE - LUXURY THEME
      // ============================================================================
      colors: {
        // Luxury Base Colors
        charcoal: {
          50: '#F5F5F5',
          100: '#E8E8E8',
          200: '#D1D1D1',
          300: '#A8A8A8',
          400: '#757575',
          500: '#525252',
          600: '#404040',
          700: '#262626',
          800: '#1A1A1A',
          900: '#121212',
          950: '#0A0A0A',
        },
        gold: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#D4AF37',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
          950: '#422006',
        },
        silver: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#C0C0C0',
          600: '#64748B',
          700: '#475569',
          800: '#334155',
          900: '#1E293B',
          950: '#0F172A',
        },
        // Glassmorphism Colors
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.05)',
          dark: 'rgba(0, 0, 0, 0.3)',
        },
      },

      // ============================================================================
      // CUSTOM TYPOGRAPHY - ELEGANT FONTS
      // ============================================================================
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
      },

      // ============================================================================
      // CUSTOM BOX SHADOW - GLASSMORPHISM & LUXURY
      // ============================================================================
      boxShadow: {
        'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-xl': '0 32px 128px rgba(0, 0, 0, 0.2), 0 16px 64px rgba(0, 0, 0, 0.12)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
        'neon-gold': '0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
        'luxury': '0 4px 24px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.04)',
        'luxury-lg': '0 8px 48px rgba(0, 0, 0, 0.12), 0 4px 24px rgba(0, 0, 0, 0.08)',
      },

      // ============================================================================
      // CUSTOM SPACING - BALANCED LUXURY LAYOUT
      // ============================================================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ============================================================================
      // CUSTOM KEYFRAMES - ANIMATIONS
      // ============================================================================
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'fade-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'smooth-scale': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-1000px 0',
          },
          '100%': {
            backgroundPosition: '1000px 0',
          },
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)',
          },
        },
      },

      // ============================================================================
      // CUSTOM ANIMATION PRESETS
      // ============================================================================
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'fade-in-left': 'fade-in-left 0.6s ease-out',
        'fade-in-right': 'fade-in-right 0.6s ease-out',
        'smooth-scale': 'smooth-scale 0.5s ease-out',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },

      // ============================================================================
      // CUSTOM BACKDROP BLUR
      // ============================================================================
      backdropBlur: {
        'xs': '2px',
      },

      // ============================================================================
      // CUSTOM BORDER RADIUS
      // ============================================================================
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ============================================================================
      // CUSTOM GRADIENTS
      // ============================================================================
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #121212 0%, #1A1A1A 50%, #262626 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #FACC15 50%, #CA8A04 100%)',
        'silver-gradient': 'linear-gradient(135deg, #C0C0C0 0%, #E2E8F0 50%, #94A3B8 100%)',
      },
    },
  },
  plugins: [],
};
