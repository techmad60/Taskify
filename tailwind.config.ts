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
        "features-vector": "url('/images/features-vector.svg')",
        "testimonial-vector": "url('/images/testimonial-vector.svg')",
        "desktop-hero": "url('/images/desktop-hero.svg')",
        "footer-vector": "url('/images/footer-vector.svg')",
        "desktop-testimonial": "url('/images/desktop-testimonial.svg')",
      },
      colors: {
        "primary-color": "#81CAFB",
        "color-zero": "#D9D9D9",
        "color-one": "#2C3E50",
        "color-two": "#1A252F",
      },
      
    },
  },
  plugins: [],
};
export default config;
