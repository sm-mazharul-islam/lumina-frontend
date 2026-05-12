import type { Config } from "tailwindcss";

const config: Config = {
  // 1. IMPORTANT: Enable class-based dark mode
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}", // Ensure your shared folder is included
  ],
  theme: {
    extend: {
      colors: {
        // You can map your CSS variables here for better DX
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Ensure your Bento Grid rounded corners are supported
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
