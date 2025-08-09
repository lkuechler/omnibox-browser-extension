export class BaseMatch extends HTMLElement {
	activate() {
		browser.windows.update(this.tab.windowId, { focused: true }).then(() => {
			browser.tabs.update(this.tab.id, { active: true }).then(() => {
				window.close();
			});
		});
	}
	constructor(tab) {
		super();
		this.tab = tab;
		this.tabIndex = -1;
		this.attachShadow({ mode: "open" });
		this.render();
	}

	static get observedAttributes() {
		return ["selected"];
	}

	attributeChangedCallback(name) {
		if (name === "selected") {
			this.updateSelectedStyle();
		}
	}

	updateSelectedStyle() {
		if (this.hasAttribute("selected")) {
			this.shadowRoot.querySelector("div").classList.add("selected");
		} else {
			this.shadowRoot.querySelector("div").classList.remove("selected");
		}
	}
}
