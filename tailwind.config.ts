import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#f4ead6",
          soft: "#f8f1e3",
          deep: "#e8d9b8",
          foxed: "#dcc9a0",
        },
        burgundy: {
          DEFAULT: "#6b2430",
          deep: "#3f141c",
          rose: "#8a3a44",
          mute: "#9a5c62",
        },
        gold: {
          DEFAULT: "#b08d3e",
          mute: "#c4a574",
          pale: "#e4d3a4",
          ink: "#7a5e28",
        },
        ink: {
          DEFAULT: "#1c1612",
          soft: "#3d3226",
          fade: "#6b5c4a",
          ghost: "#8a7b68",
        },
        olive: {
          DEFAULT: "#5e5c3e",
          mute: "#7a7858",
        },
        sepia: {
          DEFAULT: "#6a4e32",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "Palatino Linotype", "serif"],
        body: ["Source Sans 3", "Source Sans Pro", "system-ui", "sans-serif"],
        urdu: ["Noto Nastaliq Urdu", "Geeza Pro", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        masthead: "0.42em",
        wideish: "0.18em",
      },
      boxShadow: {
        print: "0 1px 0 rgba(28,22,18,0.08)",
        photo: "0 1px 2px rgba(28,22,18,0.14), 0 14px 32px rgba(63,20,28,0.12)",
        sleeve: "0 2px 4px rgba(28,22,18,0.12), 0 18px 40px rgba(28,22,18,0.14)",
      },
      backgroundImage: {
        "paper-fade":
          "linear-gradient(180deg, rgba(244,234,214,0.2), rgba(232,217,184,0.55))",
      },
      keyframes: {
        "vinyl-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "reel-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        vinyl: "vinyl-spin 18s linear infinite",
        reel: "reel-spin 4.5s linear infinite",
        "fade-up": "fade-up 0.9s ease-out both",
        "soft-in": "soft-in 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
