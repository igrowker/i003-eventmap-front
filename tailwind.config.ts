import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3BDCE2",
        secondary: "#57D99C",
        tertiary: "#FF3130",
        light: "#F7FAFC",
        dark: "#08121F",
        bgHome:"#F6FAFD",
        createEventButton: "#6750A4",
        newsletter: "#E8DEF8",
        massive: "#B41D1D",
        high: "#B4611D",
        medium: "#4F72CA",
        normal: "#0B8A8A",
      },
      fontFamily:{
        latoBold: ['Lato-Bold'],
        cocomatPro: ['CocomatPro-Bold']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'arte-gradient': 'linear-gradient(to bottom, #C5BE62, #E1DB8B)',
        'deportes-gradient': 'linear-gradient(to bottom, #64BCBF, #76C19E)',
        'gastronomia-gradient': 'linear-gradient(to bottom, #DBB67C, #CC5555)',
        'navbar-gradient': 'linear-gradient(to right, #8C64BF, #271E3E)'
      },
    },
  },
  plugins: [],
};
export default config;
