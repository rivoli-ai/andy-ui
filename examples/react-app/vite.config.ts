import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// PUBLIC_BASE lets CI build under a subpath (e.g. /andy-ui/react/ on GitHub
// Pages) while local dev stays at "/".
export default defineConfig({
  base: process.env.PUBLIC_BASE || "/",
  plugins: [react()],
});
