/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: "Inter, sans-serif",
      },

      borderRadius: {
        none: "0",
        sm: ".125rem",
        DEFAULT: ".25rem",
        lg: ".5rem",
        full: "9999px",
      },
    },
  },
  purge: {
    options: {
      safelist: [
        "bg-violet-500",
        "bg-violet-200",
        "bg-gray-500",
        "bg-gray-200",
        "bg-green-500",
        "bg-green-200",
        "bg-blue-500",
        "bg-blue-200",
        "bg-rose-500",
        "bg-rose-200",
        "bg-purple-500",
        "bg-purple-200",
        "w-11/12",
        "w-8/12",
        "w-4/12",
      ],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
