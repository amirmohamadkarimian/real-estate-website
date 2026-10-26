/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F1A17',
        cream: '#F7F4EE',
        muted: '#6B6B66',
        gold: {
          DEFAULT: '#C98A4B',
          soft: '#E8A45C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        card: '6px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,26,23,0.04), 0 8px 24px rgba(15,26,23,0.06)',
        lift: '0 18px 40px rgba(15,26,23,0.14)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
