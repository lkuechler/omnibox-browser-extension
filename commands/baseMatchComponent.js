export class BaseMatch extends HTMLElement {
	async activate() {
		// This order is important for chromium based browser
		// They do not switch focus correctly if the window is set active first
		await browser.tabs.update(this.tab.id, { active: true });
		await browser.windows.update(this.tab.windowId, { focused: true });
		window.close();
	}

	constructor(tab, searchScore) {
		super();
		this.tab = tab;
		this.searchScore = searchScore;
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
