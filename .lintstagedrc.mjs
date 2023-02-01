export default {
	"*.{js,jsx,ts,tsx,cjs,cts,json,md,yml,css}": "prettier --write",
	"src/**/*.{js,jsx,ts,tsx}": "eslint",
	"src/**/*.{js,jsx,ts,tsx}": () => "pnpm lint:tsc",
};
