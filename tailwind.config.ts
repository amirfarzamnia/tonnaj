import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        bg: '2px 10px 50px'
      }
    }
  },
  darkMode: 'class'
};

export default config;
