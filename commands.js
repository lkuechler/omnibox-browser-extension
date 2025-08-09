import { commands } from "./commands/index.js";

export async function runAllCommandsAndCollectMatches(query) {
	const matches = [];

	if (!query || query.trim() === "") {
		return matches;
	}

	for (const command of commands) {
		if (typeof command === "function") {
			const result = await command(query);
			if (Array.isArray(result)) {
				matches.push(...result);
			} else if (result) {
				matches.push(result);
			}
		}
	}
	return matches;
}
