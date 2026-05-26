import type { Preview } from '@storybook/web-components';
import { defineCustomElements } from '../../../dist/ui-components/loader/index.js';
import '../src/global/theme.css';
import { resolveDocsSource } from './docs-source';

defineCustomElements();

const preview: Preview = {
  parameters: {
    layout: 'centered',
    a11y: {
      test: 'todo',
    },
    docs: {
      source: {
        language: 'html',
        type: 'dynamic',
        transform: (code, context) => resolveDocsSource(code, context),
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals['theme'] ?? 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      return story();
    },
  ],
};

export default preview;
