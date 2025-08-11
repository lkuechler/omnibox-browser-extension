import Fuse from "fuse.js";

import { DuplicateActiveTab } from "./component.js";

const commandString = "> duplicate active tab";

const fuse = new Fuse([commandString], {
	includeScore: true,
});

export async function duplicateActiveTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuse.search(query);
	if (results.length === 0) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new DuplicateActiveTab(activeTabs[0], results[0].score)];
}
