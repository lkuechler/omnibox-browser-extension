import fuzzysort from "fuzzysort";

import { JumpToLastTab } from "./component.js";

const commandString = "jump to last tab";

export async function jumpToLastTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const queryWithoutPrefix = query.replace(/^>\s?/, "");

	const currentWindow = await browser.windows.getCurrent();
	const tabs = await browser.tabs.query({ windowId: currentWindow.id });

	const lastNonHiddenTab = tabs.reverse().find((tab) => !tab.hidden);

	if (queryWithoutPrefix.length === 0) {
		return [
			new JumpToLastTab(
				{ ...lastNonHiddenTab, titleHighlighted: commandString },
				0,
			),
		];
	}

	const results = fuzzysort.go(queryWithoutPrefix, [commandString]);

	if (results.length === 0) return [];

	return [
		new JumpToLastTab(
			{ ...lastNonHiddenTab, titleHighlighted: results[0].highlight() },
			results[0].score,
		),
	];
}
