const { defineConfig } = require("cypress");
const path = require("node:path");

module.exports = defineConfig({
	e2e: {
		defaultCommandTimeout: 10000,
		setupNodeEvents(on, _config) {
			on("before:browser:launch", (_browser, launchOptions) => {
				launchOptions.extensions.push(path.resolve(__dirname, "dist"));
				return launchOptions;
			});
		},
	},
});
