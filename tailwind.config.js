/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js.ts,jsx,tsx}"],
  theme: {
    extend: {
      input: {
        "no-spinner": {
          "-moz-appearance": "textfield",
          "-webkit-appearance": "none",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-spinner": {
          "-moz-appearance": "textfield", // Firefox
          "-webkit-appearance": "none", // Chrome, Safari, Edge
          margin: "0",
        },
        'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
          {
            "-webkit-appearance": "none",
          },
      });
    },
    require("daisyui"),
  ],
};
