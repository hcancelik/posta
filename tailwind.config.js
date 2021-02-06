module.exports = {
  purge: [
    "./public/**/*.html",
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.js",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        88: "22rem",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      translate: ["active"],
      outline: ["active"],
      boxShadow: ["active"],
      borderWidth: ["first"],
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};
