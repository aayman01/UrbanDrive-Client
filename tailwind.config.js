import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Playfair: ["Playfair Display", "sans-serif"],
        Merri: ["Merriweather", "serif"],
        Open: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#003366",   
        secondary: "#14B8A6", 
        accent: "#F59E0B",
        background: "#F8FAFC",
        text: "#1E293B",
        "glass-border": "rgba(255, 255, 255, 0.3)",
        "glass-border-dark": "rgba(255, 255, 255, 0.1)",
        "glass-bg": "rgba(255, 255, 255, 0.7)",
        "glass-bg-dark": "rgba(15, 23, 42, 0.75)",
        "glass-card": "rgba(255, 255, 255, 0.65)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.08)",
        "glass-lg": "0 16px 48px 0 rgba(15, 23, 42, 0.12)",
        "glass-glow": "0 0 25px rgba(20, 184, 166, 0.25)",
        "glass-glow-accent": "0 0 25px rgba(245, 158, 11, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
        glass: "16px",
        "glass-heavy": "24px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
