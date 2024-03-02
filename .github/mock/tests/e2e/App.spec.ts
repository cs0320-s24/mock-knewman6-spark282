import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("on page load, i see a button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Submit")).toBeVisible();
});

test("switching to 'verbose' mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Mode switched to verbose")).toBeVisible();
});

test("in 'verbose' mode, command is displayed with the result", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("test command");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Command: test command")).toBeVisible();
});

// test("in 'verbose' mode, results are displayed", async ({ page }) => {
  
//   await page.goto("http://localhost:8000/");
//   await page.getByLabel("Login").click();
//   await page.getByLabel("Command input").fill("mode");
//   await page.getByLabel("Submit").click();
//   await page.getByLabel("Command input").fill("view");
//   await page.getByLabel("Submit").click();
//   await expect(page.getByText("Results")).toBeVisible();
// });

test("initially, no data is loaded", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("No CSV data is currently loaded.")
  ).toBeVisible();
});

test("loading data and viewing it", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file csv1");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("CSV content from csv1 loaded successfully.")
  ).toBeVisible();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByRole("table")).toBeVisible();
});

test("load changes the csv", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file csv1");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Item1")).toBeVisible();
  await page.getByLabel("Command input").fill("load_file csv2");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Item3")).toBeVisible();
});

test("searching data with exact match", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file csv1");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("search name Item1");
  await page.getByLabel("Submit").click();
  await expect(page.getByText("Item1")).toBeVisible();
});

test("searching data with too many params", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file csv1");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("search name Item1 toomuch");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Error: Please provide a column and a value to search for.")
  ).toBeVisible();
});

test("searching data with too few params", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file csv1");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("search toofew");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Error: Please provide a column and a value to search for.")
  ).toBeVisible();
});

test("searching data with no params", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("load_file csv1");
  await page.getByLabel("Submit").click();
  await page.getByLabel("Command input").fill("search");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Error: Please provide a column and a value to search for.")
  ).toBeVisible();
});

test("invalid commands show error message", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").fill("invalid_command");
  await page.getByLabel("Submit").click();
  await expect(
    page.getByText("Command not found: invalid_command")
  ).toBeVisible();
});


