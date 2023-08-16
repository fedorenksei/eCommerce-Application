/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'card-color': '#ECECEC',
        'primary-color': '#23A6F0',
        'secondary-color': '#FAFAFA',
        'accent-color': '#23856D',
        'hover-color': '#2A7CC7',
        'disable-color': '#8EC2F2',
        'success-color': '#2DC071',
        'alert-color': '#E77C40',
        'danger-color': '#E74040',
        'fade-text-color': '#737373',

        //DARK THEME
        'dt-card-color': '#3C403D',
        'dt-primary-color': '#23A6F0',
        'dt-secondary-color': '#252B42',
        'dt-accent-color': '#23856D',
        'dt-hover-color': '#2A7CC7',
        'dt-disable-color': '#8EC2F2',
        'dt-success-color': '#2DC071',
        'dt-alert-color': '#E77C40',
        'dt-danger-color': '#E74040',
        'dt-fade-text-color': '#737373',
      },
    },
  },
  plugins: [],
};
