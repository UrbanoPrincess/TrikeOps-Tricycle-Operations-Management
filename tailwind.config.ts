import type { Config } from 'tailwindcss';

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        red: '#FF0000ff',
        engineeringOrange: '#CC0404ff',
        black: '#000000ff',
        schoolBusYellow: '#FDDB22ff',
      },
      fontFamily: {
        'newsreader': ['Newsreader', 'serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), 
  ],
} satisfies Config;
