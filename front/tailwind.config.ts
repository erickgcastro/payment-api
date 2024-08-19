import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        defaultText: '#222',
      },
    },
  },
  plugins: [],
};
export default config;
