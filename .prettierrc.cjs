/** @type {import("prettier").Config} */
module.exports = {
	trailingComma: "es5",
	useTabs: true,
	tabWidth: 4,
	arrowParens: "avoid",
	overrides: [
		{
			files: "*.md",
			options: {
				useTabs: false,
			},
		},
	],
};
