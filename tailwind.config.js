/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Playfair: ["Playfair Display", "sans-serif"],
        Merri: ["Merriweather", "serif"],
        Open: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"], // Poppins font
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#003366",   
        secondary: "#14B8A6", 
        accent: "#F59E0B",
        background: "#F3F4F6",
        text: "#1F2937",  
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};

