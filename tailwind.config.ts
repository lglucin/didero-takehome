import { withTV } from 'tailwind-variants/transformer';
import type { Config } from 'tailwindcss';

import { gray } from './src/utils';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray,
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '4rem',
      },
      fontFamily: {
        sans: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        mono: 'SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
      },
      fontSize: {
        xxs: '0.625rem',
      },
      letterSpacing: {
        snug: '-0.01em',
      },
      screens: {
        xxs: '320px',
        xs: '425px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      transitionProperty: {
        combined:
          'background-color, border-color, box-shadow, color, opacity, transform',
      },
      lineHeight: {
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        loose: '1.75',
      },
      spacing: {
        4.5: '1.125rem',
      },
      width: {
        4.5: '1.125rem',
      },
      height: {
        4.5: '1.125rem',
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
      boxShadow: {
        // This is the "sm" shadow, but 1px longer
        'sm-longer': '0 2px 2px 0 rgb(0 0 0 / 0.05)',
        // The input needs a shadow hack to hide Chrome's default ugly autofill
        // color, hence the need for this custom shadow
        'input--resting': `${gray[200]} 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, 0 0 0 30px white inset`,
        'input--focus': `${gray[200]} 0px 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, 0 0 0 30px white inset`,
        'input--resting--dark': `${gray[800]} 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, 0 0 0 30px ${gray[950]} inset`,
        'input--focus--dark': `${gray[800]} 0px 0px 0px 2px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, 0 0 0 30px ${gray[950]} inset`,
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};

export default withTV(config);
