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
        bgHome:"#F6FAFD"
      },
      fontFamily:{
        latoBold: ['Lato-Bold']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'arte-gradient': 'linear-gradient(to bottom, #C5BE62, #E1DB8B)',
        'deportes-gradient': 'linear-gradient(to bottom, #64BCBF, #76C19E)',
        'gastronomia-gradient': 'linear-gradient(to bottom, #DBB67C, #CC5555)'
      },
    },
  },
  plugins: [],
};
export default config;
