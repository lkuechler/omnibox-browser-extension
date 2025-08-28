import fuzzysort from "fuzzysort";

import { BookmarkMatchComponent } from "./component.js";

const flattenBookmarks = (nodes, parentTitle = "") =>
	nodes.flatMap((node) => {
		const currentTitle = [parentTitle, node.title].filter(Boolean).join(" / ");
		if (node.children) {
			return flattenBookmarks(node.children, currentTitle);
		} else {
			return [
				{
					...node,
					folderTitle: parentTitle,
				},
			];
		}
	});

export async function searchBookmarksByTitle(query) {
	if (!query || !query.startsWith("@")) return [];
	const searchTerm = query.slice(1).toLowerCase();
	const allBookmarks = await browser.bookmarks.getTree();

	const flat = flattenBookmarks(allBookmarks);

	const fuseTitle = fuzzysort.go(searchTerm, flat, {
		keys: ["title", "folderTitle"],
	});
	const titleMatches = fuseTitle.map((result) => ({
		...result.obj,
		score: result.score,
	}));

	const allMatches = [...titleMatches].sort((a, b) => b.score - a.score);
	return allMatches.map(
		(bookmark) => new BookmarkMatchComponent(bookmark, bookmark.score),
	);
}
