module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { "main-color": "#FFFFF0", "sub-color": "#EEE8AA" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
