import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          900: "var(--primary-900)",
          border: "var(--primary-border)",
          "button-fg": "var(--primary-button-fg)",
          "button-bg": "var(--primary-button-bg)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          700: "var(--secondary-700)",
          border: "var(--secondary-border)",
        },
        tertiary: {
          600: "var(--tertiary-600)",
        },
      },
      borderRadius: {
        md: "0.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
