import { mkdir, cp, copyFile, stat, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

async function copyDirRequired(src, dest) {
  if (!(await exists(src))) {
    throw new Error(`Missing required directory: ${src}`);
  }
  await ensureDir(dest);
  await cp(src, dest, { recursive: true });
  console.log(`✔ Copied ${src} -> ${dest}`);
}

async function main() {
  const cwd = process.cwd(); // libs/ui-components
  const outRoot = path.resolve(cwd, "../../dist/ui-components");

  // Clean output
  await rm(outRoot, { recursive: true, force: true });
  await ensureDir(outRoot);

  // Copy entire dist folder from libs/ui-components/dist to dist/ui-components/dist
  await copyDirRequired(
    path.resolve(cwd, "dist"), 
    path.join(outRoot, "dist")
  );

  // Copy loader folder
  await copyDirRequired(
    path.resolve(cwd, "loader"), 
    path.join(outRoot, "loader")
  );

  // Copy package.json
  await copyFile(
    path.resolve(cwd, "package.json"), 
    path.join(outRoot, "package.json")
  );
  console.log(`✔ Copied package.json`);

  console.log("✅ publish-ui-components completed");
}

main().catch((err) => {
  console.error("❌ publish-ui-components failed:", err);
  process.exit(1);
});
