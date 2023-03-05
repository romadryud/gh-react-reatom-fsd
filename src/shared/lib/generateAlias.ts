import { readdirSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath, URL } from "node:url";

export const generateAlias = () => {
	const filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(filename);
	const dirPath = path.resolve(dirname, "../../");
	const alias: Record<string, string> = {};

	readdirSync(dirPath, {
		withFileTypes: true,
	}).forEach((f) => {
		if (f.isDirectory()) {
			alias[f.name] = fileURLToPath(
				new URL(`${dirPath}/${f.name}`, import.meta.url)
			);
		}
	});

	return alias;
};
