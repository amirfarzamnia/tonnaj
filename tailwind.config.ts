import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        bg: '2px 10px 50px'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui({})]
};

export default config;
