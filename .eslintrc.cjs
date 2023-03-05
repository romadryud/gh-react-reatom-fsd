const { configure, presets } = require("eslint-kit");

module.exports = configure({
	presets: [
		presets.imports({
			sort: {
				newline: true,
			},
			alias: {
				root: "./src",
			},
		}),
		presets.node(),
		presets.prettier(),
		presets.typescript(),
		presets.react({
			version: "detect",
			newJSXTransform: true,
		}),
	],
	extend: {
		rules: {
			"prettier/prettier": [
				"error",
				{
					singleQuote: false,
				},
			],
			"padding-line-between-statements": [
				"error",
				{ blankLine: "always", prev: "*", next: "return" },
			],
			"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
			"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		},
	},
});
