/** @type {import('@jest/types/build/Config').ProjectConfig} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!ramda/.*)'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styles.js',
  },
}
