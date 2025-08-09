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

	const titleMatches = flat
		.filter(
			(bookmark) =>
				bookmark.title && bookmark.title.toLowerCase().includes(searchTerm),
		)
		.filter(
			(bookmark) =>
				bookmark.folderTitle !== "Bookmarks Menu" &&
				bookmark.folderTitle !== "Mozilla Firefox",
		)
		.map((bookmark) => ({ ...bookmark, matchType: "title" }));

	const titleIds = new Set(titleMatches.map((b) => b.id));
	const folderTitleMatches = flat
		.filter(
			(bookmark) =>
				bookmark.folderTitle &&
				bookmark.folderTitle.toLowerCase().includes(searchTerm) &&
				bookmark.url &&
				bookmark.title &&
				!titleIds.has(bookmark.id),
		)
		.map((bookmark) => ({ ...bookmark, matchType: "folderTitle" }));

	const allMatches = [...titleMatches, ...folderTitleMatches];
	return allMatches.map((bookmark) => new BookmarkMatchComponent(bookmark));
}
