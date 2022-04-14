module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/typings"
  ],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!**/resources/**',
    '**src/**',
  ],

  coverageDirectory: 'coverage',

  reporters: [ "default", "jest-junit" ],

  coverageReporters: ["json-summary", "cobertura"],

  coverageThreshold: {
    global: {
        lines: 30,
    },
  },
}
