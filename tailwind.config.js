const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "media", // "class",
  content: ["./pages/**/*.tsx", "./components/**/*.tsx", "./app/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
