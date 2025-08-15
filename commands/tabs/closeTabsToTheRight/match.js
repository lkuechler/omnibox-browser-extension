import fuzzysort from "fuzzysort";

import { CloseTabsToTheRight } from "./component.js";

const commandString = "> close tabs to the right";

export async function closeTabsToTheRight(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuzzysort.go(query, [commandString]);

	if (results.length === 0) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new CloseTabsToTheRight(activeTabs[0], results[0].score)];
}
