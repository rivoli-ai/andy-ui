import { defineConfig } from "vite";
import { resolve } from "node:path";
import { readdirSync } from "node:fs";

// Build every component as its own entry plus a barrel `index`, so consumers
// can either side-effect import the whole library or cherry-pick one element.
const componentsDir = resolve(__dirname, "src/components");
const componentEntries = Object.fromEntries(
  readdirSync(componentsDir)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => [`components/${f.replace(/\.ts$/, "")}`, resolve(componentsDir, f)])
);

export default defineConfig({
  build: {
    target: "es2021",
    lib: {
      entry: { index: resolve(__dirname, "src/index.ts"), ...componentEntries },
      formats: ["es"],
    },
    rollupOptions: {
      external: [/^lit/],
      output: {
        preserveModules: false,
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
