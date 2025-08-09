import { runAllCommandsAndCollectMatches } from "./commands.js";

class TabSearchPopup extends HTMLElement {
	selectedMatchComponent = null;

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.render();
	}

	connectedCallback() {
		// Focus input when component is attached to DOM
		const input = this.shadowRoot.getElementById("quickInput");
		if (input) input.focus();
	}

	render() {
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
			input[type="text"] {
				box-sizing: border-box;
				width: 100%;
				padding: 8px;
				font-size: 16px;
				background: Field;
				color: FieldText;
				border: 1px solid ButtonBorder;
				border-radius: 4px;
			}
			.selected {
				background: Highlight;
				color: HighlightText;
				border-radius: 4px;
			}
		</style>
		<input type="text" id="quickInput" placeholder="Type something..." autofocus />
		<div id="results"></div>
	`;

		const input = this.shadowRoot.getElementById("quickInput");
		const resultsDiv = this.shadowRoot.getElementById("results");
		let matchElements = [];
		let selectedIndex = -1;
		// Focus input after rendering
		setTimeout(() => input.focus(), 0);

		const updateSelection = (newIndex) => {
			if (matchElements.length === 0) return;
			if (selectedIndex >= 0 && selectedIndex < matchElements.length) {
				matchElements[selectedIndex].removeAttribute("selected");
			}
			selectedIndex = newIndex;
			if (selectedIndex >= 0 && selectedIndex < matchElements.length) {
				matchElements[selectedIndex].setAttribute("selected", "");
				matchElements[selectedIndex].scrollIntoView({ block: "nearest" });
				this.selectedMatchComponent = matchElements[selectedIndex];
			}
		};

		const searchTabs = async (query) => {
			resultsDiv.innerHTML = "";
			selectedIndex = -1;

			const matches = await runAllCommandsAndCollectMatches(query);
			matchElements = matches;
			if (query.length > 0 && matches.length === 0) {
				resultsDiv.textContent = "No matching tabs found.";
				return;
			}
			matches.forEach((match) => {
				resultsDiv.appendChild(match);
			});
			if (matchElements.length > 0) {
				updateSelection(0);
			}
		};

		input.addEventListener("input", (e) => {
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
