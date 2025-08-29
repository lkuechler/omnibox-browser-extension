import fuzzysort from "fuzzysort";

import { escapeHTMLTags } from "../../utils/escapeHTMLTags.js";
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
	const escapedTabs = tabs.map((tab) => ({
		...tab,
		title: escapeHTMLTags(tab.title),
	}));
	const results = fuzzysort
		.go(query, escapedTabs, {
			key: "title",
		})
		.map((result) => ({
			...result.obj,
			score: result.score,
			titleHighlighted: result.highlight() ?? result.obj.title,
		}));

	return results.map((result) => new TabMatch(result, result.score));
}
