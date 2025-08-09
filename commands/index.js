import { searchTabsByTitle } from "./tabs/searchTabsByTitle/match.js";
import { jumpToLastTab } from "./tabs/jumpToLastTab/match.js";
import { jumpToFirstTab } from "./tabs/jumpToFirstTab/match.js";
import { searchTabsBySound } from "./tabs/searchTabsBySound/match.js";

export const commands = [
	searchTabsByTitle,
	jumpToLastTab,
	jumpToFirstTab,
	searchTabsBySound,
];
