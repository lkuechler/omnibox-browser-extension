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
	const fuse = new Fuse(tabs, {
		keys: ["title"],
		includeScore: true,
		distance: 0.4,
		shouldSort: true,
	});
	const results = fuse.search(query);
	return results.map((result) => new TabMatch(result.item, result.score));
}
