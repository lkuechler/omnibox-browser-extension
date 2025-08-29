import fuzzysort from "fuzzysort";

import { CloseActiveTab } from "./component.js";

const commandString = "close active tab";

export async function closeActiveTab(query) {
	if (!query || !query.startsWith(">")) return [];

	const queryWithoutPrefix = query.replace(/^>\s?/, "");

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	if (queryWithoutPrefix.length === 0) {
		return [
			new CloseActiveTab(
				{ ...activeTabs[0], titleHighlighted: commandString },
				0,
			),
		];
	}

	const results = fuzzysort.go(queryWithoutPrefix, [commandString]);
	if (results.length === 0) return [];

	return [
		new CloseActiveTab(
			{ ...activeTabs[0], titleHighlighted: results[0].highlight() },
			results[0].score,
		),
	];
}
