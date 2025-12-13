import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f5',
        brown: '#8b7355',
        terracotta: '#c67b5c',
        sage: '#a8b5a0',
        charcoal: '#3a3a3a',
      },
      fontFamily: {
        serif: ['var(--font-crimson)', 'Georgia', 'serif'],
        handwritten: ['var(--font-caveat)', 'cursive'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#3a3a3a',
            maxWidth: 'none',
            a: {
              color: '#c67b5c',
              '&:hover': {
                color: '#8b7355',
              },
            },
            h1: {
              color: '#8b7355',
              fontFamily: 'var(--font-caveat), cursive',
            },
            h2: {
              color: '#8b7355',
            },
            h3: {
              color: '#8b7355',
            },
            blockquote: {
              borderLeftColor: '#c67b5c',
              color: '#3a3a3a',
              fontStyle: 'italic',
            },
            code: {
              color: '#c67b5c',
              backgroundColor: '#faf8f5',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
