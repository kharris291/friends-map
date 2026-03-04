module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // Toggle dark-mode based on .dark class or data-mode="dark"
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        downloadBlack: "#0A0A0A",
        downloadRed: "#B11226",
        downloadGrey: "#2B2B2B",
        downloadBone: "#F2F2F0",
      },
    },
  },
  plugins: [],
};
