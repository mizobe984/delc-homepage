/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeInUp: 'fadeInUp 1s ease-out',
      },
      // フォントスタック: 欧文は Cabin / Open Sans、和文は Noto Sans JP にフォールバック
      fontFamily: {
        sans: ['Open Sans Variable', 'Noto Sans JP Variable', 'sans-serif'],
        body: ['Cabin Variable', 'Noto Sans JP Variable', 'sans-serif'],
        heading: ['Cabin Variable', 'Noto Sans JP Variable', 'sans-serif'],
        pre: ['Open Sans Variable', 'Noto Sans JP Variable', 'sans-serif'],
      },
      // タイポグラフィスケール: 見出し h1〜h3 / 本文 / キャプション
      // 和文の可読性のため本文系は line-height を広めに取る
      fontSize: {
        'heading-1': [
          '2.25rem',
          { lineHeight: '1.3', fontWeight: '700', letterSpacing: '0.02em' },
        ],
        'heading-2': [
          '1.5rem',
          { lineHeight: '1.4', fontWeight: '700', letterSpacing: '0.02em' },
        ],
        'heading-3': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.9' }],
        caption: ['0.875rem', { lineHeight: '1.6' }],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0px 1px 2px darkgrey',
        },
        '.text-shadow-md': {
          textShadow: '0px 3px 3px darkgrey',
        },
        '.text-shadow-lg': {
          textShadow: '0px 5px 3px darkgrey',
        },
        '.text-shadow-xl': {
          textShadow: '0px 7px 3px darkgrey',
        },
        '.text-shadow-2xl': {
          textShadow: '0px 10px 3px darkgrey',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }

      addUtilities(newUtilities)
    },
    require('tailwindcss-animate'),
  ],
}
