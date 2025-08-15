import fuzzysort from "fuzzysort";

import { JumpToLastTab } from "./component.js";

const commandString = "> jump to last tab";

export async function jumpToLastTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const results = fuzzysort.go(query, [commandString]);

	if (results.length === 0) return [];

	const currentWindow = await browser.windows.getCurrent();
	const tabs = await browser.tabs.query({ windowId: currentWindow.id });

	const lastNonHiddenTab = tabs.reverse().find((tab) => !tab.hidden);

	return [new JumpToLastTab(lastNonHiddenTab, results[0].score)];
}
