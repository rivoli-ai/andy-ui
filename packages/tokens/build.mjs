// Concatenate the source CSS into a single distributable stylesheet and copy
// the individual layers so consumers can cherry-pick. No bundler needed.
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, "src");
const dist = join(root, "dist");

const ORDER = ["tokens.css", "base-components.css", "andy-ui-layer.css", "andy-extras.css", "andy-shell.css"];

await mkdir(dist, { recursive: true });

let bundle = `/* @andy-ui/tokens — generated bundle. Do not edit. */\n`;
for (const file of ORDER) {
  const css = await readFile(join(src, file), "utf8");
  bundle += `\n/* ===== ${file} ===== */\n${css}\n`;
  await copyFile(join(src, file), join(dist, file));
}
await writeFile(join(dist, "andy-ui.css"), bundle, "utf8");

console.log(`[@andy-ui/tokens] built dist/andy-ui.css (${(bundle.length / 1024).toFixed(1)} kB) + ${ORDER.length} layer files`);
