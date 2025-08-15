import fuzzysort from "fuzzysort";

import { CloseOtherTabs } from "./component.js";

const commandString = "> close other tabs";

export async function closeOtherTabs(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuzzysort.go(query, [commandString]);

	if (results.length === 0) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new CloseOtherTabs(activeTabs[0], results[0].score)];
}
