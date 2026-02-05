import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './apps/angular-app/src/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
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
