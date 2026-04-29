/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-container': '#F59E0B',
        'surface': '#F9FAFB',
        'background': '#F9FAFB',
        'on-background': '#221A12',
        'on-surface': '#221A12',
        'on-primary-container': '#613B00',
        'outline-variant': '#D8C3AD',
        'surface-container-low': '#FFF1E5',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['30px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      spacing: {
        'stack-sm': '12px',
        'stack-md': '24px',
        'stack-lg': '48px',
        'gutter': '24px',
        'margin-page': '40px',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      },
      boxShadow: {
        'card': '0px 4px 20px rgba(0,0,0,0.03)',
      },
      maxWidth: {
        'content': '1024px',
      },
    },
  },
  plugins: [],
}
