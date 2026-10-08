import { expect, test, type Page } from "@playwright/test";

/** Console errors and uncaught exceptions for the whole test. */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(e.message));
  return errors;
}

/** Scroll to a point in the logo dive, 0 at the opening frame and 1 on the board. */
async function diveTo(page: Page, progress: number) {
  await page.evaluate((p) => {
    const portal = document.querySelector<HTMLElement>(".lp")!;
    const length = parseFloat(getComputedStyle(portal).getPropertyValue("--lp-length"));
    window.scrollTo(0, portal.offsetTop + window.innerHeight * length * p);
  }, progress);
}

const roll = (page: Page) =>
  page.locator("[data-lp-overlay]").evaluate((el) => Number(/rotate\(([^)]+)\)/.exec(el.getAttribute("transform") ?? "")?.[1] ?? NaN));

test("loads with no errors and the security headers", async ({ page }) => {
  const errors = watchErrors(page);
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  const headers = res!.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["x-frame-options"]).toBe("DENY");
  await expect(page).toHaveTitle(/Off The L/);
  await expect(page.locator(".halftone")).toHaveAttribute("data-mode", /^(gl|video)$/);
  expect(errors).toEqual([]);
});

test("the footage replaces the loading state", async ({ page }) => {
  await page.goto("/");
  // init is the plain loading color; gl is the halftone and video its fallback.
  await expect(page.locator(".halftone")).toHaveAttribute("data-mode", /^(gl|video)$/);
});

test("the dive banks on the way in and lands level on the board", async ({ page }) => {
  await page.goto("/");
  const portal = page.locator(".lp");
  await expect(portal).toHaveAttribute("data-lp-motion", "on");

  await diveTo(page, 0.4);
  await expect.poll(async () => Math.abs(await roll(page)), { message: "camera roll mid-dive" }).toBeGreaterThan(1);

  await diveTo(page, 0.97);
  await expect(portal).toHaveAttribute("data-lp-entered", "true");
  await expect.poll(() => roll(page), { message: "camera roll on landing" }).toBe(0);
  await expect(page.locator("#board-title")).toBeInViewport();
});

test("every past party shows all its photos", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tablist", { name: "Past parties" }).getByRole("tab");
  const count = await tabs.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const tab = tabs.nth(i);
    const name = (await tab.innerText()).split("\n")[0];
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    const photos = page.getByRole("tabpanel").locator("img");
    await expect(photos.first()).toBeVisible();
    const n = await photos.count();
    for (let j = 0; j < n; j++) {
      const photo = photos.nth(j);
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() => photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), { message: `${name}, photo ${j + 1}` })
        .toBe(true);
    }
  }
});

test("no sideways scroll", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("holds a still frame with no dive and no roll", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".lp")).toHaveAttribute("data-lp-motion", "off");
    expect(await roll(page)).toBe(0);
  });
});
