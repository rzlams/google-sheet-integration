/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: "ts-jest",
  testEnvironment: "node",
  // setupFiles: ["dotenv/config"],
  verbose: true,
  rootDir: "src",
  testMatch: ["**/*.spec.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleFileExtensions: ["js", "json", "ts"],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: [
    ".d.ts",
    ".interface.ts",
    ".exception.ts",
    ".repository.ts",
    ".enum.ts$",
    ".spec.ts$",
    "types.ts$",
    ".mock.ts$",
    ".dto.ts$",
    ".json.ts$",
    "/__mocks__/",
    "/repositories/",
    "src/test",
  ],
  coverageProvider: "babel",
  coverageReporters: ["json", "lcov", "text", "html", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 82,
      functions: 90,
      lines: 99,
      statements: -10,
    },
  },
  prettierPath: require.resolve("prettier-2"),
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/$1",
  },
};
