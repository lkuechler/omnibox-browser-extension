import { BaseMatch } from "../../baseMatchComponent.js";

export class BookmarkMatchComponent extends BaseMatch {
	constructor(bookmark, searchScore) {
		super(bookmark, searchScore);
	}

	activate() {
		browser.tabs.create({ url: this.tab.url });
		window.close();
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				.bookmark-row {
					display: flex;
					flex-direction: column;
					padding: 4px;
					border-radius: 4px;
					cursor: pointer;
				}
				.bookmark-row:hover {
					background: var(--hover);
				}
				.bookmark-row.selected {
					background: var(--highlight);
					color: var(--text-highlight);
					font-weight: bold;
				}
				.bookmark-title {
					flex: 1;
					padding: 4px 0;
				}
				.bookmark-folder {
					font-size: .5em;
				}
			</style>
			<div class="bookmark-row">
				<div class="bookmark-folder"></div>
				<div class="bookmark-title"></div>
			</div>
		`;

		const bookmarkRow = this.shadowRoot.querySelector(".bookmark-row");
		bookmarkRow.addEventListener("click", () => {
			this.activate();
		});
		const bookmarkTitle = this.shadowRoot.querySelector(".bookmark-title");
		bookmarkTitle.textContent = this.tab.title;
		const bookmarkFolder = this.shadowRoot.querySelector(".bookmark-folder");
		bookmarkFolder.textContent = this.tab.folderTitle;
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
