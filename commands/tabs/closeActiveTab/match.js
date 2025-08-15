import fuzzysort from "fuzzysort";

import { CloseActiveTab } from "./component.js";

const commandString = "> close active tab";

export async function closeActiveTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuzzysort.go(query, [commandString]);
	if (results.length === 0) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new CloseActiveTab(activeTabs[0], results[0].score)];
}
