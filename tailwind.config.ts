import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-tint": "var(--surface-tint)",

        // Numbered scale used by existing components, redefined in OKLCH and tinted toward cyan.
        ink: {
          50: "oklch(0.97 0.012 220)",
          100: "oklch(0.94 0.018 220)",
          200: "oklch(0.88 0.022 220)",
          300: "oklch(0.78 0.028 220)",
          400: "oklch(0.62 0.034 225)",
          500: "oklch(0.5 0.042 228)",
          600: "oklch(0.4 0.048 230)",
          700: "oklch(0.32 0.05 230)",
          800: "oklch(0.23 0.05 230)",
          900: "oklch(0.18 0.048 230)",
          950: "oklch(0.13 0.045 230)",
        },
        grass: {
          300: "oklch(0.85 0.14 145)",
          400: "oklch(0.78 0.16 145)",
          500: "oklch(0.68 0.18 145)",
          600: "oklch(0.6 0.17 145)",
          700: "oklch(0.52 0.16 145)",
          800: "oklch(0.44 0.14 145)",
        },
        cyan: {
          DEFAULT: "oklch(0.65 0.13 220)",
          soft: "oklch(0.72 0.09 220)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        hero: ["var(--type-hero)", { lineHeight: "1.02", letterSpacing: "-0.028em" }],
        "display-1": ["var(--type-display-1)", { lineHeight: "1.05", letterSpacing: "-0.022em" }],
        "display-2": ["var(--type-display-2)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        lead: ["var(--type-lead)", { lineHeight: "1.55" }],
      },
      boxShadow: {
        soft: "0 1px 0 oklch(0.15 0.045 230 / 0.04), 0 6px 18px -10px oklch(0.15 0.045 230 / 0.18)",
        card: "0 1px 0 oklch(0.15 0.045 230 / 0.04), 0 18px 40px -20px oklch(0.15 0.045 230 / 0.22)",
        lift: "0 1px 0 oklch(0.15 0.045 230 / 0.04), 0 30px 60px -25px oklch(0.15 0.045 230 / 0.35)",
        glow: "0 40px 80px -30px oklch(0.65 0.13 220 / 0.55)",
        ring: "0 0 0 1px oklch(0.65 0.13 220 / 0.18), 0 24px 60px -24px oklch(0.65 0.13 220 / 0.4)",
        commit: "0 18px 40px -16px oklch(0.52 0.16 145 / 0.55)",
      },
      keyframes: {
        "blob-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-40px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 oklch(0.68 0.18 145 / 0.55)" },
          "100%": { boxShadow: "0 0 0 14px oklch(0.68 0.18 145 / 0)" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 18s cubic-bezier(0.45, 0, 0.55, 1) infinite",
        marquee: "marquee 42s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(oklch(0.65 0.13 220 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.13 220 / 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-32": "32px 32px",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
