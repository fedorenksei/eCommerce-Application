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

        'input-bg': '#FFFFFF',

        //DARK THEME
        'dt-bg-color': '#252B42',

        'dt-text-color': '#FFFFFF',
        'dt-second-text-color': '#FFFFFF',

        'dt-input-bg': '#394267',

        //COMMON
        'primary-color': '#23A6F0',
        'accent-color': '#23856D',
        'hover-color': '#2A7CC7',
        'disabled-color': '#8EC2F2',
        'success-color': '#2DC071',
        'alert-color': '#E77C40',
        'danger-color': '#E74040',
        'danger-hover-color': '#A83B3B',
        'danger-disabled-color': '#DE7979',
      },
      fontFamily: {
        primary: ['Montserrat'],
      },
    },
    screens: {
      'form-bp': '600px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
