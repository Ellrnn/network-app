/** @type {import('jest').Config} */
module.exports = {
  rootDir: "..",
  testMatch: ["<rootDir>/e2e/**/*.test.ts"],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: "detox/runners/jest/globalSetup",
  globalTeardown: "detox/runners/jest/globalTeardown",
  reporters: ["detox/runners/jest/reporter"],
  testEnvironment: "detox/runners/jest/testEnvironment",
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/e2e/init.ts"],
  preset: "ts-jest",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
