module.exports = {
  purge: [
    "./public/**/*.html",
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.js",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      translate: ["active"],
    },
  },
  plugins: [],
};
