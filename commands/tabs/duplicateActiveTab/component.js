import { BaseMatch } from "../../baseMatchComponent.js";

export class DuplicateActiveTab extends BaseMatch {
	constructor(tab, searchScore) {
		super(tab, searchScore);
	}

	activate() {
		browser.tabs.duplicate(this.tab.id).then(() => {
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
			<div>&#x276F; Duplicate active tab</div>
		`;
		this.shadowRoot.querySelector("div").addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}
}

customElements.define("duplicate-active-tab", DuplicateActiveTab);
