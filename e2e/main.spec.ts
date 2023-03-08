import { test } from "@playwright/test";

test("open page -> find romadryud -> toggle -> find -> roma", async ({
	page,
}) => {
	await page.goto("http://localhost:5173/");
	await page.getByPlaceholder("Enter username").click();
	await page.getByPlaceholder("Enter username").fill("romadryud");
	await page.getByPlaceholder("Enter username").press("Enter");
	await page.getByRole("button", { name: "romadryud romadryud" }).click();
	await page.getByPlaceholder("Enter username").click();
	await page.getByPlaceholder("Enter username").fill("roma");
	await page.getByRole("button", { name: "Search" }).click();
});
