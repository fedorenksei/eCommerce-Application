/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-color': '#FFFFFF',

        'text-color': '#252B42',
        'second-text-color': '#737373',

        //DARK THEME
        'dt-bg-color': '#252B42',

        'dt-text-color': '#FFFFFF',
        'dt-second-text-color': '#FFFFFF',

        //COMMON
        'primary-color': '#23A6F0',
        'accent-color': '#23856D',
        'hover-color': '#2A7CC7',
        'disable-color': '#8EC2F2',
        'success-color': '#2DC071',
        'alert-color': '#E77C40',
        'danger-color': '#E74040',
      },
      fontFamily: {
        primary: ['Montserrat'],
      },
    },
  },
  plugins: [],
};
