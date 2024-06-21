import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-vector": "url('/images/hero-vector.svg')",
      },
      colors: {
        "primary-color": "#81CAFB",
        "color-one": "#2C3E50",
        "color-two": "#1A252F",
      },
      
    },
  },
  plugins: [],
};
export default config;
