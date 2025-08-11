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
		distance: 0.4,
		shouldSort: true,
	});
	const titleMatches = fuseTitle
		.search(searchTerm)
		.map((result) => result.item)
		.filter(
			(bookmark) =>
				bookmark.title &&
				bookmark.folderTitle !== "Bookmarks Menu" &&
				bookmark.folderTitle !== "Mozilla Firefox",
		)
		.map((bookmark) => ({ ...bookmark, matchType: "title" }));

	const titleIds = new Set(titleMatches.map((b) => b.id));

	const fuseFolderTitle = new Fuse(flat, {
		keys: ["folderTitle"],
		includeScore: true,
		distance: 0.4,
		shouldSort: true,
	});
	const folderTitleMatches = fuseFolderTitle
		.search(searchTerm)
		.map((result) => result.item)
		.filter(
			(bookmark) =>
				bookmark.folderTitle &&
				bookmark.url &&
				bookmark.title &&
				!titleIds.has(bookmark.id),
		)
		.map((bookmark) => ({ ...bookmark, matchType: "folderTitle" }));

	const allMatches = [...titleMatches, ...folderTitleMatches];
	return allMatches.map(
		(bookmark) => new BookmarkMatchComponent(bookmark, bookmark.score),
	);
}
