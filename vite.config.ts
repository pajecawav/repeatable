import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
	name: "Repeatable",
	short_name: "Repeatable",
	description: "Habit tracker PWA",
	icons: [
		{
			src: "/android-chrome-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			src: "/android-chrome-512x512.png",
			sizes: "512x512",
			type: "image/png",
		},
	],
	theme_color: "#171717",
	background_color: "#ffffff",
	display: "standalone",
	orientation: "portrait",
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest,
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
		}),
		visualizer({ filename: "stats/stats.html" }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
