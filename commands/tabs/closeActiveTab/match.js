import Fuse from "fuse.js";

import { CloseActiveTab } from "./component.js";

const commandString = "> close active tab";

const fuse = new Fuse([commandString], {
	includeScore: true,
});

export async function closeActiveTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuse.search(query);
	if (results.length === 0) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new CloseActiveTab(activeTabs[0], results[0].score)];
}
