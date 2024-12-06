// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#a855f7',
        'custom-pink': '#ec4899',
        'custom-red': '#f87171',
      },
    },
  },
  plugins: [require("daisyui")],
}
