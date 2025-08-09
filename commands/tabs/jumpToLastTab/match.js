import { JumpToLastTab } from "./component.js";

const normalize = (str) => str.toLowerCase().replace(/\s/g, "").trim();

export async function jumpToLastTab(query) {
	const cleanedQuery = normalize(query);
	const commandString = normalize("> jump to last tab");

	if (!commandString.includes(cleanedQuery)) return [];

	const currentWindow = await browser.windows.getCurrent();
	const tabs = await browser.tabs.query({ windowId: currentWindow.id });

	return [new JumpToLastTab(tabs[tabs.length - 1])];
}
