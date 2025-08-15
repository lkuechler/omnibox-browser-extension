import fuzzysort from "fuzzysort";

import { DuplicateActiveTab } from "./component.js";

const commandString = "> duplicate active tab";

export async function duplicateActiveTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuzzysort.go(query, [commandString]);
	if (results.length === 0) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new DuplicateActiveTab(activeTabs[0], results[0].score)];
}
