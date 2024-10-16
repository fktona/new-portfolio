import { b } from "framer-motion/client";
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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryBlue: "#5700ef",
      },
      fontFamily: {
        arsenal: "var(--font-arsenal)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        /* Hide Scrollbar */
        ".hide-scrollbar": {
          overflow: "auto",
          "scrollbar-width": "none" /* For Firefox */,
          "-ms-overflow-style": "none" /* For Internet Explorer and Edge */,
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none" /* For Chrome, Safari, and Opera */,
        },

        /* Hover Background Expand */
        ".bg-clip-text": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
          color: "transparent" /* Make text transparent to show background */,
        },
        ".hover-bg-expand": {
          "background-size": "0px 100%" /* Initial background size */,
          "background-position": "left" /* Initial background position */,
          "background-repeat": "no-repeat",
          transition:
            "background-size 0.4s ease" /* Smooth transition on hover */,
        },
        ".hover-bg-expand:hover": {
          "background-size": "100% 100%" /* Expand background on hover */,
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
export default config;
