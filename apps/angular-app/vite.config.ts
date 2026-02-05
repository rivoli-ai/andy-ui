import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  resolve: {
    dedupe: ['oidc-client-ts'],
    alias: {
      '@omnifex/identity': resolve(__dirname, '../../libs/identity/src/public-api.ts'),
      '@omnifex/identity-angular': resolve(__dirname, '../../libs/identity-angular/src/public-api.ts'),
      '@omnifex/styles': resolve(__dirname, '../../libs/styles/src/public-api.ts'),
      '@omnifex/styles-angular': resolve(__dirname, '../../libs/styles-angular/src/public-api.ts'),
      '@omnifex/ui-components': resolve(__dirname, '../../libs/ui-components/src/public-api.ts'),
    },
    preserveSymlinks: false,
  },
  optimizeDeps: {
    // Pre-bundle packages for better performance
    // Include oidc-client-ts since it's a dependency of @omnifex/identity
    include: ['oidc-client-ts', '@omnifex/identity', '@omnifex/identity-angular', '@omnifex/ui-components'],
    // Exclude @omnifex/styles-angular from optimization - let Angular handle it
    exclude: ['@omnifex/styles-angular'],
    esbuildOptions: {
      // Allow require() in CommonJS modules
      keepNames: true,
      // Transform dynamic requires to static imports
      legalComments: 'none',
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // Include oidc-client-ts in CommonJS transformation so it gets bundled
      include: [/oidc-client-ts/, /node_modules\/oidc-client-ts/],
      // Handle require() calls properly
      requireReturnsDefault: 'auto',
      // Transform dynamic requires
      dynamicRequireTargets: [
        // Transform any dynamic requires in oidc-client-ts
        /node_modules\/oidc-client-ts/,
      ],
    },
    rollupOptions: {
      // Ensure oidc-client-ts is bundled, not externalized
      external: [],
      output: {
        // Handle dynamic requires in output
        format: 'es',
      },
    },
  },
  ssr: {
    // Don't externalize packages for SSR
    // Exclude @omnifex/styles-angular so Angular's compiler can handle it
    noExternal: ['@omnifex/identity', '@omnifex/identity-angular', '@omnifex/ui-components'],
  },
});


