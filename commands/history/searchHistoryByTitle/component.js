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
					flex-direction: column;
					padding: 4px;
					border-radius: 4px;
					cursor: pointer;
				}
				.history-title {
					flex: 1;
					cursor: pointer;
					padding: 4px 0;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.history-url {
					font-size: .5em;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			</style>
			<div class="history-row">
				<div class="history-url"></div>
				<div class="history-title"></div>
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
