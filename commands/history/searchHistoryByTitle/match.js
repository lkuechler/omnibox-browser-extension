import fuzzysort from "fuzzysort";
import { HistoryMatchComponent } from "./component.js";

export async function searchHistoryByTitle(query) {
	if (!query || !query.startsWith("$")) return [];
	const searchTerm = query.slice(1).toLowerCase();

	// Fetch history items (limit to last 1000 for performance)
	const historyItems = await browser.history.search({
		text: "",
		maxResults: 1000,
		startTime: 0,
	});

	const fuseTitle = fuzzysort.go(searchTerm, historyItems, {
		key: "title",
	});
	const titleMatches = fuseTitle
		.filter((result) => result.obj.title)
		.map((result) => ({
			...result.obj,
			matchType: "title",
			score: result.score,
		}));

	const titleUrls = new Set(titleMatches.map((h) => h.url));

	const fuseUrl = fuzzysort.go(searchTerm, historyItems, {
		key: "url",
	});
	const urlMatches = fuseUrl
		.filter((result) => result.obj.url && !titleUrls.has(result.obj.url))
		.map((result) => ({
			...result.obj,
			matchType: "url",
			score: result.score,
		}));

	const allMatches = [...titleMatches, ...urlMatches].sort(
		(a, b) => b.score - a.score,
	);

	return allMatches.map(
		(historyItem) => new HistoryMatchComponent(historyItem, historyItem.score),
	);
}
