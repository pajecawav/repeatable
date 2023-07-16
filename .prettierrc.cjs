/** @type {import("prettier").Config} */
module.exports = {
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
