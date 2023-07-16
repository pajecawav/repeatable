import { defineConfig, devices, Project } from "@playwright/test";

const projects: Project[] = [
	{
		name: "chromium",
		use: {
			...devices["Desktop Chrome"],
		},
	},
];

if (process.env.CI) {
	projects.push(
		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
			},
		},
		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
			},
		},
	);
}

export default defineConfig({
	testDir: "./tests",
	timeout: 10 * 1000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? "html" : "line",
	use: {
		baseURL: "http://localhost:5173",
		actionTimeout: 0,
		trace: "on-first-retry",
	},
	webServer: {
		command: "pnpm dev",
		port: 5173,
		timeout: 20 * 1000,
		reuseExistingServer: !process.env.CI,
	},
	outputDir: "test-results/",
	projects,
});
