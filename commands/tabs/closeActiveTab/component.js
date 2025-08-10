import { BaseMatch } from "../../baseMatchComponent.js";

export class CloseActiveTab extends BaseMatch {
	constructor(tab) {
		super(tab);
	}

	activate() {
		browser.tabs.remove(this.tab.id).then(() => {
			window.close();
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
			<div>&#x276F; Close active tab</div>
		`;
		this.shadowRoot.querySelector("div").addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}
}

customElements.define("close-active-tab", CloseActiveTab);
