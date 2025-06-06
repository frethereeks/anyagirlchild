import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // './node_modules/antd/dist/reset.css',
  ],
  // darkMode: ["class", "selector"],
  darkMode: "class",
  theme: {
    extend: {
      screen: {
        'xs': '360px'
      },
      colors: {
        background: '#f2f2f2',
        backdrop: '#f1f2f4',
        primary: '#0d182d',
        secondary: '#16a394',
        success: "#09dba0",
        danger: "#f34f7c",
        text: "#64748b",
        "dark-text": "#584455",
      },
      fontFamily: {
        mulish: "var(--mulish)",
        inter: "var(--inter)",
      }
    },
  },
  plugins: [],
} satisfies Config;
