import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: {
    channel: "chrome",
    headless: true,
    baseURL: "http://localhost:3000",
  },
});
