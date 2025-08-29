import fuzzysort from "fuzzysort";

import { escapeHTMLTags } from "../../utils/escapeHTMLTags.js";
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

	const flat = flattenBookmarks(allBookmarks)
		.filter((bookmark) => bookmark.title)
		.map((bookmark) => ({
			...bookmark,
			title: escapeHTMLTags(bookmark.title),
			folderTitle: escapeHTMLTags(bookmark.folderTitle),
		}));

	const fuseTitle = fuzzysort.go(searchTerm, flat, {
		keys: ["title", "folderTitle"],
	});

	const titleMatches = fuseTitle.map((result) => ({
		...result.obj,
		score: result.score,
		titleHighlighted: result[0]?.highlight() ?? result.obj.title,
		folderHighlighted: result[1]?.highlight() ?? result.obj.folderTitle,
	}));

	const allMatches = [...titleMatches].sort((a, b) => b.score - a.score);
	return allMatches.map(
		(bookmark) => new BookmarkMatchComponent(bookmark, bookmark.score),
	);
}
