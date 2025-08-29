export const escapeHTMLTags = (str) => {
	var tagsToReplace = {
		"<": "&lt;",
		">": "&gt;",
	};

	str = str.replace(/[<>]/g, function (tag) {
		return tagsToReplace[tag] || tag;
	});

	return str;
};
