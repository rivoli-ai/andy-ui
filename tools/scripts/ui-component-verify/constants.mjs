import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ROOT = join(__dirname, '..', '..', '..');
export const UI_LIB = join(ROOT, 'libs', 'ui-components');
export const UI_SRC = join(UI_LIB, 'src', 'lib');
export const UI_DIST = join(ROOT, 'dist', 'ui-components');
export const STORYBOOK_DIR = join(UI_LIB, '.storybook');

export const MIN_TOUCH_PX = 44;
export const VIEWPORTS = [
  { name: 'mobile', width: 360 },
  { name: 'tablet', width: 768 },
  { name: 'desktop', width: 1280 },
];

/** Components that must meet full Definition of Done (publishable). Others get warnings for gaps. */
export const PUBLISHABLE_COMPONENTS = new Set(['button', 'icon']);

export const SEVERITY = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};
