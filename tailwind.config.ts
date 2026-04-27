import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#e7e9ef",
          100: "#c3c8d7",
          200: "#9ba4bc",
          300: "#7380a1",
          400: "#55648c",
          500: "#374978",
          600: "#314270",
          700: "#293965",
          800: "#22305b",
          900: "#0f172a",
          950: "#0a0f1c",
        },
        electric: {
          50: "#e3f2ff",
          100: "#bbdeff",
          200: "#8fc9ff",
          300: "#5fb3ff",
          400: "#3ba2ff",
          500: "#1e90ff",
          600: "#1a82f0",
          700: "#1470dc",
          800: "#0f5fc9",
          900: "#0541a9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
