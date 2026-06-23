import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair:  ['var(--font-playfair)',  'Georgia', 'Times New Roman', 'serif'],
        inter:     ['var(--font-inter)',     'system-ui', '-apple-system', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#17324D',
          50:  '#EBF1F7',
          100: '#BACFDF',
          200: '#89ADC8',
          300: '#588BB0',
          400: '#2E6B97',
          500: '#1E4F72',
          600: '#17324D',
          700: '#0E2035',
          800: '#081422',
          900: '#030A12',
        },
        gold: {
          DEFAULT: '#C9983A',
          50:  '#FDF7EC',
          100: '#F5E4B8',
          200: '#EDD08A',
          300: '#E4B86A',
          400: '#D4A24A',
          500: '#C9983A',
          600: '#A87D2C',
          700: '#876220',
          800: '#654814',
          900: '#422E0A',
        },
        ivory: {
          DEFAULT: '#FAF8F3',
          100: '#FAF8F3',
          200: '#F2EDE2',
          300: '#E9E3D4',
          400: '#DDD6C5',
          500: '#CFC7B5',
        },
        lavender: {
          DEFAULT: '#E4DEFF',
          100: '#F2EFFF',
          200: '#E4DEFF',
          300: '#C9BFFF',
          400: '#A898F0',
          500: '#8470DC',
        },
        /* shadcn tokens */
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card:        { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover:     { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary:     { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted:       { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border:  'hsl(var(--border))',
        input:   'hsl(var(--input))',
        ring:    'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        gold:         '0 0 32px rgba(201,152,58,0.18)',
        'gold-lg':    '0 0 64px rgba(201,152,58,0.26)',
        'card-hover': '0 20px 48px rgba(23,50,77,0.10)',
        glass:        '0 8px 24px rgba(23,50,77,0.07)',
        navy:         '0 4px 24px rgba(23,50,77,0.20)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
