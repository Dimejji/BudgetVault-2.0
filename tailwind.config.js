/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        bvgreen: '#073f32',
        bvgreen2: '#0b5a46',
        bvmint: '#dff5eb',
        bvgold: '#f4bf08',
        bvcream: '#f7f5ef',
        bvink: '#10201d',
        bvmuted: '#74807c',
        bvline: '#e7e7e1',
        bvnav: '#0d1c2f',
        bvnav2: '#13243c',
        bvblue: '#4f79ff',
        bvpurple: '#7a61d8',
        bvpink: '#d84f83',
        bvorange: '#d97812',
        // vault dark theme tones
        vdark: '#091323',
        vpanel: '#111f34',
        vpanelborder: '#20314d',
      },
      boxShadow: {
        card: '0 12px 34px rgba(18,34,29,.07)',
      },
      borderRadius: {
        xl2: '22px',
      },
    },
  },
  plugins: [],
}
