/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        // Semantic tokens — resolve to CSS variables that flip with the theme.
        ink: "var(--c-ink)",
        fg: "var(--c-fg)",
        muted: "var(--c-muted)",
        faint: "var(--c-faint)",
        surface: "var(--c-surface)",
        "surface-2": "var(--c-surface-2)",
        hair: "var(--c-hair)",
        "hair-strong": "var(--c-hair-strong)",
        page: "var(--c-bg)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
