import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0a0908",
          50: "#1a1613",
          100: "#141110",
          200: "#1b1714",
          300: "#221d18",
          400: "#2c251e",
          500: "#3a3128",
        },
        ember: {
          DEFAULT: "#e8a24c",
          soft: "#f2c57c",
          pale: "#f7ddae",
          deep: "#b3712b",
          ink: "#7c4a17",
        },
        rose: {
          DEFAULT: "#c86b7b",
          deep: "#8e3a4a",
          mute: "#a2576a",
        },
        jade: {
          DEFAULT: "#6fa28f",
          deep: "#3f6a5c",
        },
        bone: {
          DEFAULT: "#f3ede3",
          mute: "#bdb2a2",
          faint: "#8b8071",
          ghost: "#5f574c",
        },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Fraunces", "Georgia", "serif"],
        body: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
        urdu: ['"Noto Nastaliq Urdu"', "Geeza Pro", "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        kicker: "0.32em",
        wideish: "0.16em",
      },
      boxShadow: {
        lift: "0 18px 50px -18px rgba(0,0,0,0.85)",
        glow: "0 0 0 1px rgba(232,162,76,0.35), 0 18px 60px -20px rgba(232,162,76,0.4)",
        dock: "0 -18px 60px -24px rgba(0,0,0,0.95)",
      },
      backgroundImage: {
        "lamp-glow":
          "radial-gradient(60% 55% at 50% 0%, rgba(232,162,76,0.22), transparent 70%)",
        "hairline-fade":
          "linear-gradient(90deg, transparent, rgba(243,237,227,0.28), transparent)",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "rise-in": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "soft-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "wipe-in": {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        breathe: {
          "0%,100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.06)" },
        },
        bars: {
          "0%,100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
      },
      animation: {
        platter: "spin 3.6s linear infinite",
        "rise-in": "rise-in 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "soft-in": "soft-in 0.6s ease-out both",
        "wipe-in": "wipe-in 0.9s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 48s linear infinite",
        breathe: "breathe 7s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
