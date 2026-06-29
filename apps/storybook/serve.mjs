// Static server for the built Storybook (storybook-static), for previewing
// without disturbing a running dev server. Run: node apps/storybook/serve.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "storybook-static");
const PORT = 6007;
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".map": "application/json",
};

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = join(root, url === "/" ? "index.html" : url);
    let body;
    try {
      body = await readFile(file);
    } catch {
      file = join(root, "index.html");
      body = await readFile(file);
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
}).listen(PORT, () => console.log(`Storybook (static) on http://localhost:${PORT}`));
