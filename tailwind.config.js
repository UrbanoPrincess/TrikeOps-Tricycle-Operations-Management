/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,svelte,ts,js}",
    "./node_modules/flowbite-svelte/**/*.{html,svelte,ts,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
