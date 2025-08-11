import Fuse from "fuse.js";

import { JumpToFirstTab } from "./component.js";

const commandString = "> jump to first tab";
const fuse = new Fuse([commandString], {
	includeScore: true,
});

export async function jumpToFirstTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuse.search(query);

	if (results.length === 0) return [];

	const currentWindow = await browser.windows.getCurrent();
	const tabs = await browser.tabs.query({ windowId: currentWindow.id });

	const firstNonHiddenTab = tabs.find((tab) => !tab.hidden);

	return [new JumpToFirstTab(firstNonHiddenTab, results[0].score)];
}
