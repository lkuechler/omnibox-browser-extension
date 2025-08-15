import fuzzysort from "fuzzysort";

import { TabMatch } from "../tabMatchComponent.js";

export async function searchTabsByTitle(query) {
	if (
		!query ||
		query.startsWith(">") ||
		query.startsWith(":") ||
		query.startsWith("@")
	)
		return [];
	const tabs = await browser.tabs.query({});
	const results = fuzzysort.go(query, tabs, {
		key: "title",
	});
	return results.map((result) => new TabMatch(result.obj, result.score));
}
