import Fuse from "fuse.js";

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

	const fuseTitle = new Fuse(flat, {
		keys: ["title"],
		includeScore: true,
		shouldSort: true,
		minMatchCharLength: 2,
	});
	const titleMatches = fuseTitle
		.search(searchTerm)
		.filter(
			(result) =>
				result.item.title &&
				result.item.folderTitle !== "Bookmarks Menu" &&
				result.item.folderTitle !== "Mozilla Firefox",
		)
		.map((result) => ({
			...result.item,
			matchType: "title",
			score: result.score,
		}));

	const titleIds = new Set(titleMatches.map((b) => b.id));

	const fuseFolderTitle = new Fuse(flat, {
		keys: ["folderTitle"],
		includeScore: true,
		shouldSort: true,
		minMatchCharLength: 2,
	});
	const folderTitleMatches = fuseFolderTitle
		.search(searchTerm)
		.filter(
			(result) =>
				result.item.folderTitle &&
				result.item.url &&
				result.item.title &&
				!titleIds.has(result.item.id),
		)
		.map((result) => ({
			...result.item,
			matchType: "folderTitle",
			score: result.score,
		}));

	const allMatches = [...titleMatches, ...folderTitleMatches].sort(
		(a, b) => a.score - b.score,
	);
	return allMatches.map(
		(bookmark) => new BookmarkMatchComponent(bookmark, bookmark.score),
	);
}
