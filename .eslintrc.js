module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  extends: [
    "airbnb-base",
    "plugin:vue/vue3-essential",
    "prettier/vue",
    "plugin:prettier/recommended",
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "prettier/prettier": ["error", { htmlWhitespaceSensitivity: "ignore" }],
  },
};
