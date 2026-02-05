import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    // Ensure oidc-client-ts can be resolved
    dedupe: ['oidc-client-ts'],
  },
  optimizeDeps: {
    // Include oidc-client-ts for pre-bundling during dev
    include: ['oidc-client-ts'],
    esbuildOptions: {
      // Allow require() in CommonJS modules
      keepNames: true,
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // Include oidc-client-ts in CommonJS transformation so it gets bundled
      include: [/oidc-client-ts/, /node_modules/],
      // Handle require() calls properly
      requireReturnsDefault: 'auto',
    },
  },
});
