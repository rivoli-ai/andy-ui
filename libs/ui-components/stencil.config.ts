import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ui-components',
  taskQueue: 'async',
  srcDir: 'src/lib',
  outputTargets: [
    // Build to default dist folder, then publish script will copy to root dist
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
