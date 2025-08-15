import fuzzysort from "fuzzysort";

import { BookmarkMatchComponent } from "./component.js";

export async function searchBookmarksByTitle(query) {
	if (!query || !query.startsWith("@")) return [];
	const searchTerm = query.slice(1).toLowerCase();
	const allBookmarks = await browser.bookmarks.getTree();
	const flattenBookmarks = (nodes, parentTitle = "") =>
		nodes.flatMap((node) => {
			const currentTitle = node.title || parentTitle;
			if (node.children) {
				return flattenBookmarks(node.children, currentTitle);
			} else {
				return [{ ...node, folderTitle: parentTitle }];
			}
		});

	const flat = flattenBookmarks(allBookmarks);

	const fuseTitle = fuzzysort.go(searchTerm, flat, {
		key: ["title"],
	});
	const titleMatches = fuseTitle
		.filter(
			(result) =>
				result.obj.title &&
				result.obj.folderTitle !== "Bookmarks Menu" &&
				result.obj.folderTitle !== "Mozilla Firefox",
		)
		.map((result) => ({
			...result.obj,
			matchType: "title",
			score: result.score,
		}));

	const titleIds = new Set(titleMatches.map((b) => b.id));

	const fuseFolderTitle = fuzzysort.go(searchTerm, flat, {
		key: ["folderTitle"],
	});
	const folderTitleMatches = fuseFolderTitle
		.filter(
			(result) =>
				result.obj.folderTitle &&
				result.obj.url &&
				result.obj.title &&
				!titleIds.has(result.obj.id),
		)
		.map((result) => ({
			...result.obj,
			matchType: "folderTitle",
			score: result.score,
		}));

	const allMatches = [...titleMatches, ...folderTitleMatches].sort(
		(a, b) => b.score - a.score,
	);
	return allMatches.map(
		(bookmark) => new BookmarkMatchComponent(bookmark, bookmark.score),
	);
}
