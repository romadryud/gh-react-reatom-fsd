import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { generateAlias } from "./src/shared/lib/generateAlias";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	envPrefix: "GH",
	plugins: [react()],
	resolve: {
		alias: generateAlias(),
	},
});
