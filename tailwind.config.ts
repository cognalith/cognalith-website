import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0C0E12",
          secondary: "#111318",
          tertiary: "#1A1D24",
          card: "#16181F",
        },
        amber: {
          DEFAULT: "#F6AD55",
          deep: "#DD6B20",
          light: "#FEFCBF",
        },
        // Keep old names for compat
        accent: {
          cyan: "#F6AD55",
          purple: "#DD6B20",
          green: "#FEFCBF",
        },
        text: {
          primary: "#E8E6E3",
          secondary: "#9A9689",
          muted: "#6B6760",
        },
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: ["DM Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
