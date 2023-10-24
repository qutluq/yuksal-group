/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        translate: {
          '0%': { transform: 'translateX(-50%);' },
          '100%': { transform: 'translateX(0%);' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        wiggle: {
          '0%, 25%, 50%, 75%, 100%': { transform: 'rotate(-3deg)' },
          '12%, 37%, 62%, 87%': { transform: 'rotate(3deg)' },
        },

        zoom: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '12%': {
            transform: 'scale(3)',
          },
          '25%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(3)',
          },
          '62%': {
            transform: 'scale(1)',
          },
          '75%': {
            transform: 'scale(3)',
          },
        },

        scaling: {
          '0%': {
            transform: 'scale(1)',
            '-webkit-transform': 'scale(1)',
            opacity: 0.9,
          },

          '100%': {
            transform: 'scale(2.5)',
            '-webkit-transform': 'scale(2.5)',
            opacity: 0.0,
          },
        },
      },
      animation: {
        translateX: 'translate 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
