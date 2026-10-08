import { defineConfig } from "@playwright/test";

// Its own port, never a reused server: another project's dev server once answered on a shared one.
const PORT = Number(process.env.E2E_PORT ?? 4317);
const CI = !!process.env.CI;

// Smoke tests against the production build. Run `npm run build` first; CI does.
export default defineConfig({
  testDir: "e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  forbidOnly: CI,
  // A test that only passes on retry still fails CI, so an intermittent bug can't auto-merge.
  retries: CI ? 1 : 0,
  failOnFlakyTests: CI,
  reporter: CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    browserName: "chromium",
    trace: "retain-on-failure",
    // Software WebGL, so the halftone renders on CI machines without a GPU.
    launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] },
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "phone", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
