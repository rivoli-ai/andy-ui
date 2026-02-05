import type { Config } from 'jest';

const config: Config = {
  displayName: 'react-app',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        allowJs: true,
      },
    ],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/react-app',

  transformIgnorePatterns: [
    'node_modules/(?!@omnifex)',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    // IMPORTANT: add styles + keep identity
    '^@omnifex/styles$': '<rootDir>/../../libs/styles/src/public-api.ts',
    '^@omnifex/identity$': '<rootDir>/../../libs/identity/src/public-api.ts',

    // Framework adapters (if you use them in React app)
    '^@omnifex/styles-react$': '<rootDir>/../../libs/styles-react/src/public-api.ts',
    '^@omnifex/identity-react$': '<rootDir>/../../libs/identity-react/src/public-api.ts',

    // Styles in tests
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  resolver: '@nx/jest/plugins/resolver',
};

export default config;
