import { commands } from "./commands/index.js";

export async function runAllCommandsAndCollectMatches(query) {
	const matches = [];

	if (!query || query.trim() === "") {
		return matches;
	}

	for (const command of commands) {
		if (typeof command === "function") {
			const result = await command(query);
			matches.push(...result);
		}
	}

	matches.sort((a, b) => {
		return a.searchScore - b.searchScore;
	});

	return matches;
}
