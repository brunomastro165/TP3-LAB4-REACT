/*eslint-env node*/

var require: NodeRequire;
(id: string) => any;

/**  @type {import('tailwindcss').Config}  */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
