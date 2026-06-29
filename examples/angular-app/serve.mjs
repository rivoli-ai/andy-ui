// Minimal static server for the production build (no HMR socket), used to
// preview the Angular example. Run: node examples/angular-app/serve.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "dist", "browser");
const PORT = 4300;
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = join(root, url === "/" ? "index.html" : url);
    let body;
    try {
      body = await readFile(file);
    } catch {
      // SPA fallback
      file = join(root, "index.html");
      body = await readFile(file);
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
}).listen(PORT, () => console.log(`Angular example (static) on http://localhost:${PORT}`));
