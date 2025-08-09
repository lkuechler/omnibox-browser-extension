import { TabMatch } from "../tabMatchComponent.js";

export async function searchTabsBySound(query) {
	const cleanedQuery = query.toLowerCase().trim();
	const commandString = ":sound";

	if (!commandString.includes(cleanedQuery)) return [];

	const tabs = await browser.tabs.query({ audible: true });
	return tabs.map((tab) => new TabMatch(tab));
}
