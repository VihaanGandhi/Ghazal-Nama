import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f5f0e6",
        parch: "#ece3d1",
        ink: "#17140f",
        graphite: "#5b5243",
        faint: "#8d8371",
        rule: "#dcd2bd",
        accent: "#bf3b21",
        ember: "#e2664a",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Fraunces", "Georgia", "serif"],
        body: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
        urdu: ['"Noto Nastaliq Urdu"', '"Geeza Pro"', "serif"],
      },
      letterSpacing: {
        kicker: "0.28em",
      },
      maxWidth: {
        sheet: "70rem",
      },
    },
  },
  plugins: [],
};

export default config;
