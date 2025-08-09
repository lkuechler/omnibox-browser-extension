import { BaseMatch } from "../../baseMatchComponent.js";

export class DuplicateActiveTab extends BaseMatch {
	constructor(tab) {
		super(tab);
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
					background: #ffe7e0;
					border-radius: 4px;
				}
				div {
					cursor: pointer;
					padding: 4px 0;
					font-weight: bold;
					color: #d97706;
				}
			</style>
			<div>Duplicate active tab</div>
		`;
		this.shadowRoot.querySelector("div").addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}
}

customElements.define("duplicate-active-tab", DuplicateActiveTab);
