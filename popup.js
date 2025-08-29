import { runAllCommandsAndCollectMatches } from "./commands.js";

class TabSearchPopup extends HTMLElement {
	selectedMatchComponent = null;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	async render() {
		const currentWindow = await browser.windows.getCurrent();
		const currentWindowHeight = currentWindow.height;
		const currentWindowWidth = currentWindow.width;

		const computedWidth = Math.min(currentWindowWidth / 2, 600);
		const computedHeight = Math.min(currentWindowHeight / 2, 550);

		this.shadowRoot.innerHTML = `
			<style>
				#results {
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
				#results :first-child {
					margin-top: 16px;
				}

				#wrapper {
					display: block;
					overflow-y: auto;
					width: ${computedWidth}px;
					max-width: 600px;
					max-height: ${computedHeight}px;
				}
			</style>

			<div id="wrapper">
				<input-component id="input"></input-component>
				<div id="results"></div>
				<intro-component id="intro"></intro-component>
			</div>
		`;

		const input = this.shadowRoot.getElementById("input");
		const resultsDiv = this.shadowRoot.getElementById("results");
		const intro = this.shadowRoot.getElementById("intro");
		let matchElements = [];
		let selectedIndex = -1;

		// Listen for message from background to prefill input
		browser.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
			if (message === "prefill-input") {
				input.value = "> ";
				input.dispatchEvent(new Event("input"));
			}
		});

		const updateSelection = (newIndex) => {
			if (matchElements.length === 0) return;
			if (selectedIndex >= 0 && selectedIndex < matchElements.length) {
				matchElements[selectedIndex].removeAttribute("selected");
			}
			selectedIndex = newIndex;
			if (selectedIndex >= 0 && selectedIndex < matchElements.length) {
				matchElements[selectedIndex].setAttribute("selected", "");
				matchElements[selectedIndex].scrollIntoView({
					block: "center",
					behavior: "smooth",
				});
				this.selectedMatchComponent = matchElements[selectedIndex];
			}
		};

		const searchTabs = async (query) => {
			selectedIndex = -1;
			// Hide intro if anything is typed, show if empty
			if (intro) {
				intro.style.display = query.length > 0 ? "none" : "block";
			}

			const matches = await runAllCommandsAndCollectMatches(query);
			matchElements = matches;
			let newResults = [];

			if (query.length > 0 && matches.length === 0) {
				const noMatchDiv = document.createElement("div");
				noMatchDiv.textContent = "No matches found.";
				newResults.push(noMatchDiv);
			} else {
				newResults = matches;
			}

			resultsDiv.replaceChildren(...newResults);

			if (matchElements.length > 0) {
				updateSelection(0);
			}
		};

		input.addEventListener("input", () => {
			searchTabs(input.value);
		});

		input.addEventListener("keydown", (e) => {
			if (e.key === "ArrowDown") {
				if (matchElements.length > 0) {
					let next = selectedIndex + 1;
					if (next >= matchElements.length) next = 0;
					updateSelection(next);
				}
				e.preventDefault();
			} else if (e.key === "ArrowUp") {
				if (matchElements.length > 0) {
					let prev = selectedIndex - 1;
					if (prev < 0) prev = matchElements.length - 1;
					updateSelection(prev);
				}
				e.preventDefault();
			} else if (e.key === "Enter") {
				if (this.selectedMatchComponent) {
					this.selectedMatchComponent.activate();
				}
			}
		});
	}
}

customElements.define("tab-search-popup", TabSearchPopup);
