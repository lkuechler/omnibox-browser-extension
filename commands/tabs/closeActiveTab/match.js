import { CloseActiveTab } from "./component.js";

const normalize = (str) => str.toLowerCase().replace(/\s/g, "").trim();

export async function closeActiveTab(query) {
	const cleanedQuery = normalize(query);
	const commandString = normalize("> close active tab");

	if (!commandString.includes(cleanedQuery)) return [];

	const activeTabs = await browser.tabs.query({
		active: true,
		currentWindow: true,
	});

	return [new CloseActiveTab(activeTabs[0])];
}
