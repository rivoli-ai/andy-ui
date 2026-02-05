const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../../tsconfig.base.json');

module.exports = {
  displayName: 'angular-app',
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  transform: {
    '^.+\\.(ts|html)$': 'jest-preset-angular',
    '^.+\\.mjs$': 'babel-jest',
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/../../',
    }),
    '^@omnifex/identity-angular$': '<rootDir>/../../libs/identity-angular/src/public-api.ts',
    '^@omnifex/identity-angular/(.*)\\.js$': '<rootDir>/../../libs/identity-angular/src/$1.ts',
    '^@omnifex/styles-angular$': '<rootDir>/../../libs/styles-angular/src/public-api.ts',
    '^@omnifex/styles-angular/(.*)\\.js$': '<rootDir>/../../libs/styles-angular/src/$1.ts',
    '^@omnifex/identity$': '<rootDir>/../../libs/identity/src/public-api.ts',
    '^@omnifex/identity/(.*)\\.js$': '<rootDir>/../../libs/identity/src/$1.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|rxjs))',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  coverageDirectory: '../../coverage/apps/angular-app',
};


