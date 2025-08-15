import fuzzysort from "fuzzysort";

import { CloseTabsToTheLeft } from "./component.js";

const commandString = "> close tabs to the left";

export async function closeTabsToTheLeft(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuzzysort.go(query, [commandString]);

	if (results.length === 0) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new CloseTabsToTheLeft(activeTabs[0], results[0].score)];
}
