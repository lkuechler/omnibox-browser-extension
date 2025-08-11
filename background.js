if (typeof browser === "undefined") {
	// Chrome does not support the browser namespace yet.
	globalThis.browser = chrome;
}

browser.commands.onCommand.addListener((command) => {
	if (command === "open-input") {
		browser.action.openPopup();
	}
	if (command === "open-input-prefill") {
		browser.action.openPopup();

		// Send a message to the popup to prefill the input with '> '
		setTimeout(() => {
			browser.runtime.sendMessage("prefill-input");
		}, 100);
	}
});
