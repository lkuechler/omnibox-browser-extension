import { BaseMatch } from "../baseMatchComponent.js";

export class TabMatch extends BaseMatch {
	constructor(tab) {
		super(tab);
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				.tab-row {
					display: flex;
					align-items: center;
					gap: 16px;
					padding: 8px;
					border-radius: 4px;
				}
				.tab-row.selected {
					background: var(--highlight);
					color: var(--text-highlight);
					font-weight: bold;
				}
				.tab-row:hover {
					background: var(--hover);
				}
				.icons {
					display: flex;
					gap: 8px;
					align-items: center;
				}
				.tab-title {
					flex: 1;
					cursor: pointer;
					padding: 4px 0;
				}
				.mute-btn {
					margin: 0;
					padding: 0;
					background: transparent;
					border: none;
					cursor: pointer;
				}
			</style>
			<div class="tab-row">
				<div class="tab-title"></div>
				<div class="icons">
					${this.tab.hidden ? `<icon-hidden></icon-hidden>` : ""}
					${this.tab.audible ? `<button class="mute-btn" title="Mute tab">${this.tab.mutedInfo && this.tab.mutedInfo.muted ? "<icon-unmute></icon-unmute>" : "<icon-mute></icon-mute>"}</button>` : ""}
				</div>
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
