import { TabMatch } from "../tabMatchComponent.js";

export async function searchTabsByTitle(query) {
	if (!query || query.startsWith(">") || query.startsWith(":")) return [];
	const tabs = await browser.tabs.query({});
	return tabs
		.filter(
			(tab) =>
				tab.title && tab.title.toLowerCase().includes(query.toLowerCase()),
		)
		.map((tab) => new TabMatch(tab));
}
