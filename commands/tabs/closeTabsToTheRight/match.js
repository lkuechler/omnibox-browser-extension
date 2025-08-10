import { CloseTabsToTheRight } from "./component.js";

const normalize = (str) => str.toLowerCase().replace(/\s/g, "").trim();

export async function closeTabsToTheRight(query) {
	const cleanedQuery = normalize(query);
	const commandString = normalize("> close tabs to the right");

	if (!commandString.includes(cleanedQuery)) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new CloseTabsToTheRight(activeTabs[0])];
}
