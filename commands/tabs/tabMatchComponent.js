import { BaseMatch } from "../baseMatchComponent.js";

export class TabMatch extends BaseMatch {
	constructor(tab) {
		super(tab);
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
				.tab-row {
					display: flex;
					align-items: center;
					padding: 8px;
				}
				.tab-title {
					flex: 1;
					cursor: pointer;
					padding: 4px 0;
				}
				.mute-btn {
					margin-left: 8px;
					background: transparent;
					border: none;
					border-radius: 3px;
					cursor: pointer;
					padding: 2px 8px;
				}
			</style>
			<div class="tab-row">
				<div class="tab-title"></div>
				${this.tab.audible ? `<button class="mute-btn" title="Mute tab">${this.tab.mutedInfo && this.tab.mutedInfo.muted ? "🔇" : "🔊"}</button>` : ""}
			</div>
		`;
		const tabTitle = this.shadowRoot.querySelector(".tab-title");
		tabTitle.textContent = this.tab.title;
		tabTitle.addEventListener("click", () => {
			this.activate();
		});
		const muteBtn = this.shadowRoot.querySelector(".mute-btn");
		if (muteBtn) {
			muteBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				browser.tabs
					.update(this.tab.id, { muted: !this.tab.mutedInfo?.muted })
					.then(() => {
						browser.tabs.get(this.tab.id).then((updatedTab) => {
							this.tab.mutedInfo = updatedTab.mutedInfo;
							this.render();
						});
					});
			});
		}
		this.updateSelectedStyle();
	}
}

customElements.define("tab-match", TabMatch);
