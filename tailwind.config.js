/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "slow-spin": "spin 60s linear infinite",
        "slow-spin-reverse": "spin 50s linear infinite reverse",
        "fade-in": "fadeIn 0.5s ease-out",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
