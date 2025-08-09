import { DuplicateActiveTab } from "./component.js";

const normalize = (str) => str.toLowerCase().replace(/\s/g, "").trim();

export async function duplicateActiveTab(query) {
	const cleanedQuery = normalize(query);
	const commandString = normalize("> duplicate active tab");

	if (!commandString.includes(cleanedQuery)) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new DuplicateActiveTab(activeTabs[0])];
}
