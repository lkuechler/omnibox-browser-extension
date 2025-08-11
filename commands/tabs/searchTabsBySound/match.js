import { TabMatch } from "../tabMatchComponent.js";

export async function searchTabsBySound(query) {
	if (!query || !query.startsWith(":")) return [];

	const cleanedQuery = query.toLowerCase().trim();
	const commandStrings = [":sound", ":audio"];

	const fuse = new Fuse(commandStrings, {
		includeScore: true,
		distance: 0.4,
		shouldSort: true,
	});
	const results = fuse.search(cleanedQuery);

	if (results.length === 0) return [];

	const tabs = await browser.tabs.query({ audible: true });
	return tabs.map((tab) => new TabMatch(tab, results[0].score));
}
