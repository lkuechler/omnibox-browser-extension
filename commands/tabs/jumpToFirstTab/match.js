import fuzzysort from "fuzzysort";

import { JumpToFirstTab } from "./component.js";

const commandString = "jump to first tab";

export async function jumpToFirstTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const queryWithoutPrefix = query.replace(/^>\s?/, "");

	const currentWindow = await browser.windows.getCurrent();
	const tabs = await browser.tabs.query({ windowId: currentWindow.id });

	const firstNonHiddenTab = tabs.find((tab) => !tab.hidden);

	if (queryWithoutPrefix.length === 0) {
		return [
			new JumpToFirstTab(
				{ ...firstNonHiddenTab, titleHighlighted: commandString },
				0,
			),
		];
	}

	const results = fuzzysort.go(queryWithoutPrefix, [commandString]);

	if (results.length === 0) return [];

	return [
		new JumpToFirstTab(
			{ ...firstNonHiddenTab, titleHighlighted: results[0].highlight() },
			results[0].score,
		),
	];
}
