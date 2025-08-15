import { BaseMatch } from "../../baseMatchComponent.js";

export class HistoryMatchComponent extends BaseMatch {
	constructor(historyItem, searchScore) {
		super(historyItem, searchScore);
	}

	activate() {
		browser.tabs.create({ url: this.tab.url });
		window.close();
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
				.history-row {
					display: flex;
					align-items: center;
					padding: 8px;
				}
				.history-title {
					flex: 1;
					cursor: pointer;
					padding: 4px 0;
				}
				.history-url {
					flex: 2;
					color: var(--text-secondary);
					font-size: 0.9em;
					padding-left: 8px;
				}
			</style>
			<div class="history-row">
				<div class="history-title"></div>
				<div class="history-url"></div>
			</div>
		`;
		const historyTitle = this.shadowRoot.querySelector(".history-title");
		const historyUrl = this.shadowRoot.querySelector(".history-url");
		historyTitle.textContent = this.tab.title || this.tab.url;
		historyUrl.textContent = this.tab.url;
		historyTitle.addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}

	updateSelectedStyle() {
		if (this.hasAttribute("selected")) {
			this.shadowRoot.querySelector(".history-row").classList.add("selected");
		} else {
			this.shadowRoot
				.querySelector(".history-row")
				.classList.remove("selected");
		}
	}
}

customElements.define("history-match", HistoryMatchComponent);
