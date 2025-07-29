import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        background2: "#f2f2f2",
        primary: "#ce1212",
        abu: "#69718e"

      },
      fontFamily: {
        "amatic" :["Amatic SC", "serif"],
        "roboto" : ["Roboto", "serif"]
      },
      textColor : {
        "dasar1" : "rgb(55, 55, 63)"
      },
      container: {
        center: true,
      }
    },
  },
  plugins: [],
} satisfies Config;
