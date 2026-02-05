import { mkdir, copyFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

async function main() {
  const [, , srcArg, destDirArg] = process.argv;

  if (!srcArg || !destDirArg) {
    console.error("Usage: node copy-file.mjs <source-file> <destination-directory>");
    process.exit(1);
  }

  const src = path.resolve(srcArg);
  const destDir = path.resolve(destDirArg);
  const fileName = path.basename(src);
  const dest = path.join(destDir, fileName);

  // Ensure source exists
  await access(src);

  // Ensure destination directory exists
  await mkdir(destDir, { recursive: true });

  // Copy file
  await copyFile(src, dest);

  console.log(`✔ Copied ${src} → ${dest}`);
}

main().catch((err) => {
  console.error("❌ copy-file failed:", err.message);
  process.exit(1);
});