import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

import { generateAlias } from "./src/shared/lib/generateAlias";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	envPrefix: "GH",
	plugins: [react()],
	resolve: {
		alias: generateAlias(),
	},
	test: {
		exclude: [...configDefaults.exclude, "e2e/*"],
		environment: "happy-dom",
	},
});
