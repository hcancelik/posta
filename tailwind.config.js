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
      boxShadow: {
        light: "0 1px 2px 0 rgba(255, 255, 255, 0.05)",
      },
      fontSize: {
        md: "0.95rem",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      translate: ["active"],
      outline: ["active"],
      boxShadow: ["active", "dark"],
      borderWidth: ["first"],
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};
