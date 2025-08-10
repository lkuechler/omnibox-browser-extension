import { searchTabsByTitle } from "./tabs/searchTabsByTitle/match.js";
import { searchTabsBySound } from "./tabs/searchTabsBySound/match.js";
import { jumpToLastTab } from "./tabs/jumpToLastTab/match.js";
import { jumpToFirstTab } from "./tabs/jumpToFirstTab/match.js";
import { duplicateActiveTab } from "./tabs/duplicateActiveTab/match.js";
import { searchBookmarksByTitle } from "./bookmarks/searchBookmarksByTitle/match.js";
import { closeActiveTab } from "./tabs/closeActiveTab/match.js";

export const commands = [
	searchTabsByTitle,
	jumpToLastTab,
	jumpToFirstTab,
	searchTabsBySound,
	duplicateActiveTab,
	searchBookmarksByTitle,
	closeActiveTab,
];
