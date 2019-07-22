module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '\\.spec.ts$',
  rootDir: '.',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  setupFiles: ['./jest.setup.js'],
  coverageReporters: ['json', 'lcov', 'text-summary'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/*.interface.ts',
    '!**/node_modules/**',
    '!**/__stubs__/**',
    '!**/__fixture__/**',
  ],
};
