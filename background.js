browser.commands.onCommand.addListener((command) => {
	if (command === "open-input") {
		browser.action.openPopup();
	}
});
