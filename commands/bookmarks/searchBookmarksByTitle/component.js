import { BaseMatch } from "../../baseMatchComponent.js";

export class BookmarkMatchComponent extends BaseMatch {
	constructor(bookmark) {
		super(bookmark);
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
				.bookmark-row {
					display: flex;
					align-items: center;
					padding: 8px;
				}
				.bookmark-title {
					flex: 1;
					cursor: pointer;
					padding: 4px 0;
				}
			</style>
			<div class="bookmark-row">
				<div class="bookmark-title"></div>
			</div>
		`;
		const bookmarkTitle = this.shadowRoot.querySelector(".bookmark-title");
		bookmarkTitle.textContent = this.tab.title;
		bookmarkTitle.addEventListener("click", () => {
			this.activate();
		});
		this.updateSelectedStyle();
	}

	updateSelectedStyle() {
		if (this.hasAttribute("selected")) {
			this.shadowRoot.querySelector(".bookmark-row").classList.add("selected");
		} else {
			this.shadowRoot
				.querySelector(".bookmark-row")
				.classList.remove("selected");
		}
	}
}

customElements.define("bookmark-match", BookmarkMatchComponent);
