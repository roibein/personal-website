/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "rgb(var(--void-rgb) / <alpha-value>)",
        iron: "rgb(var(--iron-rgb) / <alpha-value>)",
        steel: "rgb(var(--steel-rgb) / <alpha-value>)",
        signal: "rgb(var(--signal-rgb) / <alpha-value>)",
        ghost: "rgb(var(--ghost-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', "sans-serif"],
        display: ['"DM Serif Display"', "serif"],
        mono: ['"Space Mono"', "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      transitionTimingFunction: {
        magnetic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};
