/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        wine: {
          50: '#fdf2f4',
          100: '#fbe6ea',
          200: '#f7d0d9',
          300: '#f0a8b9',
          400: '#e4708d',
          500: '#d44368',
          600: '#b81d42',
          700: '#9e1b38',
          800: '#831730',
          900: '#70172c',
          950: '#420815',
          DEFAULT: '#b81d42',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        'rank-f': 'var(--rank-f)',
        'rank-e': 'var(--rank-e)',
        'rank-d': 'var(--rank-d)',
        'rank-c': 'var(--rank-c)',
        'rank-b': 'var(--rank-b)',
        'rank-a': 'var(--rank-a)',
        'rank-s': 'var(--rank-s)',
        'rank-splus': 'var(--rank-splus)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) * 1.5)',
        '2xl': 'calc(var(--radius) * 2)',
        '3xl': 'calc(var(--radius) * 3)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};