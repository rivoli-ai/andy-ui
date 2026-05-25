import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './apps/angular-app/src/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: 'var(--stroke-0)',
        0: 'var(--stroke-0)',
        1: 'var(--stroke-0)',
        2: 'var(--stroke-1)',
        4: 'var(--stroke-2)',
        6: 'var(--stroke-3)',
        8: 'var(--stroke-4)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        1: 'var(--radius-1)',
        2: 'var(--radius-2)',
        3: 'var(--radius-3)',
        4: 'var(--radius-4)',
        5: 'var(--radius-5)',
        6: 'var(--radius-6)',
        7: 'var(--radius-7)',
        8: 'var(--radius-8)',
        full: 'var(--radius-full)',
      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
      },
      fontSize: {
        h1: ['var(--font-h1-size)', { lineHeight: 'var(--font-h1-line-height)', fontWeight: 'var(--font-h1-weight)' }],
        h2: ['var(--font-h2-size)', { lineHeight: 'var(--font-h2-line-height)', fontWeight: 'var(--font-h2-weight)' }],
        h3: ['var(--font-h3-size)', { lineHeight: 'var(--font-h3-line-height)', fontWeight: 'var(--font-h3-weight)' }],
        h4: ['var(--font-h4-size)', { lineHeight: 'var(--font-h4-line-height)', fontWeight: 'var(--font-h4-weight)' }],
        h5: ['var(--font-h5-size)', { lineHeight: 'var(--font-h5-line-height)', fontWeight: 'var(--font-h5-weight)' }],
        h6: ['var(--font-h6-size)', { lineHeight: 'var(--font-h6-line-height)', fontWeight: 'var(--font-h6-weight)' }],
        h7: ['var(--font-h7-size)', { lineHeight: 'var(--font-h7-line-height)', fontWeight: 'var(--font-h7-weight)' }],
        b1: ['var(--font-b1-size)', { lineHeight: 'var(--font-b1-line-height)', fontWeight: 'var(--font-b1-weight)' }],
        b2: ['var(--font-b2-size)', { lineHeight: 'var(--font-b2-line-height)', fontWeight: 'var(--font-b2-weight)' }],
        b3: ['var(--font-b3-size)', { lineHeight: 'var(--font-b3-line-height)', fontWeight: 'var(--font-b3-weight)' }],
        b4: ['var(--font-b4-size)', { lineHeight: 'var(--font-b4-line-height)', fontWeight: 'var(--font-b4-weight)' }],
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        bold: 'var(--font-weight-bold)',
      },
      spacing: {
        0: 'var(--space-0)',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
        10: 'var(--space-10)',
      },
      colors: {
        // Theme colors using CSS variables
        theme: {
          bg: {
            primary: 'var(--theme-bg-primary)',
            secondary: 'var(--theme-bg-secondary)',
            tertiary: 'var(--theme-bg-tertiary)',
            inverse: 'var(--theme-bg-inverse)',
          },
          text: {
            primary: 'var(--theme-text-primary)',
            secondary: 'var(--theme-text-secondary)',
            tertiary: 'var(--theme-text-tertiary)',
            inverse: 'var(--theme-text-inverse)',
            muted: 'var(--theme-text-muted)',
          },
          border: {
            primary: 'var(--theme-border-primary)',
            secondary: 'var(--theme-border-secondary)',
            accent: 'var(--theme-border-accent)',
          },
          accent: {
            primary: 'var(--theme-accent-primary)',
            secondary: 'var(--theme-accent-secondary)',
            hover: 'var(--theme-accent-hover)',
            light: 'var(--theme-accent-light)',
          },
          status: {
            success: 'var(--theme-status-success)',
            warning: 'var(--theme-status-warning)',
            error: 'var(--theme-status-error)',
            info: 'var(--theme-status-info)',
          },
          surface: {
            primary: 'var(--theme-surface-primary)',
            secondary: 'var(--theme-surface-secondary)',
            elevated: 'var(--theme-surface-elevated)',
            hover: 'var(--theme-surface-hover)',
          },
        },
      },
    },
  },
};

export default config;
