import { JumpToFirstTab } from "./component.js";

const normalize = (str) => str.toLowerCase().replace(/\s/g, "").trim();

export async function jumpToFirstTab(query) {
	const cleanedQuery = normalize(query);
	const commandString = normalize("> jump to first tab");

	// Check if commandString includes cleanedQuery, ignoring whitespace differences
	if (!commandString.includes(cleanedQuery)) return [];

	const currentWindow = await browser.windows.getCurrent();
	const tabs = await browser.tabs.query({ windowId: currentWindow.id });

	const firstNonHiddenTab = tabs.find((tab) => !tab.hidden);

	return [new JumpToFirstTab(firstNonHiddenTab)];
}
