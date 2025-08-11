import { BaseMatch } from "../../baseMatchComponent.js";

export class JumpToLastTab extends BaseMatch {
	constructor(tab, searchScore) {
		super(tab, searchScore);
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
			<div>&#x276F; Jump to last tab</div>
		`;
		this.shadowRoot.querySelector("div").addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}
}

customElements.define("jump-to-last-tab", JumpToLastTab);
