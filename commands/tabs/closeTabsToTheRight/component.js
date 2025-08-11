import { BaseMatch } from "../../baseMatchComponent.js";

export class CloseTabsToTheRight extends BaseMatch {
	constructor(tab, searchScore) {
		super(tab, searchScore);
	}

	async activate() {
		const currentWindow = await browser.windows.getCurrent();
		const tabs = await browser.tabs.query({ windowId: currentWindow.id });
		const tabsToClose = await tabs.filter((tab) => {
			return tab.index > this.tab.index && !tab.hidden;
		});
		tabsToClose.forEach((tab) => {
			browser.tabs.remove(tab.id);
		});
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				.selected {
					background: var(--highlight);
					color: var(--text-highlight);
					font-weight: bold;
					border-radius: 4px;
				}
				:hover {
					background: var(--hover);
				}
				div {
					cursor: pointer;
					padding: 8px;
					color: var(--text);
				}
			</style>
			<div>&#x276F; Close tabs to the right</div>
		`;
		this.shadowRoot.querySelector("div").addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}
}

customElements.define("close-tabs-to-the-right", CloseTabsToTheRight);
