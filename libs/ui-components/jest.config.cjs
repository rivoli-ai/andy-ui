const { getJestPreset } = require('@stencil/core/testing');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  ...getJestPreset(),
  rootDir: __dirname,
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/.storybook/'],
  modulePathIgnorePatterns: ['dist/', 'storybook-static/'],
};
