import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { UI_SRC } from './constants.mjs';

const SKIP_DIRS = new Set(['shared', 'components.d.ts']);

/**
 * @returns {Promise<Array<{ id: string, dir: string, tsx: string, css: string | null, readme: string | null }>>}
 */
export async function discoverComponents(filterId = null) {
  const entries = await readdir(UI_SRC, { withFileTypes: true });
  const components = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;
    if (filterId && entry.name !== filterId) continue;

    const dir = join(UI_SRC, entry.name);
    const id = entry.name;
    const tsx = join(dir, `${id}.tsx`);
    const css = join(dir, `${id}.css`);
    const readme = join(dir, 'readme.md');

    let hasTsx = false;
    try {
      await stat(tsx);
      hasTsx = true;
    } catch {
      continue;
    }

    let cssPath = null;
    try {
      await stat(css);
      cssPath = css;
    } catch {
      /* optional */
    }

    let readmePath = null;
    try {
      await stat(readme);
      readmePath = readme;
    } catch {
      /* optional */
    }

    components.push({ id, dir, tsx, css: cssPath, readme: readmePath });
  }

  return components.sort((a, b) => a.id.localeCompare(b.id));
}
