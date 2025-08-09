import { BaseMatch } from "../../baseMatchComponent.js";

export class JumpToFirstTab extends BaseMatch {
	constructor(tab) {
		super(tab);
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
			<div>Jump to first tab</div>
		`;
		this.shadowRoot.querySelector("div").addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}
}

customElements.define("jump-to-first-tab", JumpToFirstTab);
