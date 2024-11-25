import type { Config } from "tailwindcss";

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#000000',
          surface: '#121212',
          primary: '#BB86FC',
          secondary: '#03DAC6',
          text: '#E1E1E1',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
